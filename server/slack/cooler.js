import dotenv from 'dotenv'
import _ from 'lodash'
import pkg from '@slack/bolt'
import scopes from './scopes.js'
import {
  addInteraction,
  findInteraction,
  updateInteraction,
  addWalkingUser,
  getWalkingUsers,
  storeInstall,
  fetchInstall
} from '../dynamodb/dynamodb.js'
const { App } = pkg
dotenv.config({ path: '../../.env' })

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: '342jf3423423429908',
  scopes,
  installationStore: {
    storeInstallation: async installation => {
      return storeInstall(installation.team.id, installation)
    },
    fetchInstallation: async InstallQuery => {
      return fetchInstall(InstallQuery.teamId)
    }
  }
})

app.command('/cooler', async ({ ack, client, command }) => {
  await ack()
  try {
    let users = await getTwoUsers(client, command.channel_id)
    let channelIdOne = await sendMessageToEachUser(users[0], users[1], client)
    let channelIdTwo = await sendMessageToEachUser(users[1], users[0], client)
    await addInteraction(channelIdOne, channelIdTwo, users[0].id, users[1].id)
  } catch (error) {
    console.error(error)
  }
})

app.command('/walk', async ({ ack, say, client, command }) => {
  await ack()
  let requestingUser = command
  let { channel_id, user_id } = requestingUser
  let fullUser = await getUser(user_id, client)
  let walkingUsers = await getWalkingUsers(channel_id)
  await addWalkingUser(channel_id, user_id, requestingUser)
  let parsed = JSON.parse(walkingUsers.body)
  let removedRequestingUser = parsed.Items.filter(u => {
    return u.user_id !== user_id
  })
  if (removedRequestingUser.length > 0) {
    let randomUser = _.sample(removedRequestingUser)
    let id = getUserId(randomUser.SK)
    let fullRandomUser = await getUser(id, client)
    let users = [fullUser.user, fullRandomUser.user]
    let channelIdOne = await sendMessageToEachUser(users[0], users[1], client)
    let channelIdTwo = await sendMessageToEachUser(users[1], users[0], client)
    await addInteraction(channelIdOne, channelIdTwo, users[0].id, users[1].id)
  } else {
    say('Looks like the corridors are quiet!')
  }
})

app.action('positive_click', async ({ client, body, ack, say }) => {
  await ack()
  let interaction = await findInteraction(body.channel.id, body.user.id)
  let parsed = JSON.parse(interaction.body)
  let item = parsed.Items[0]
  let update = {
    ...item,
    response: 'AVAILABLE_TO_CHAT'
  }
  await updateInteraction(body.channel.id, body.user.id, update)
  let linked = await findInteraction(
    item.linkedUser.channel,
    item.linkedUser.user
  )

  let p = JSON.parse(linked.body)
  let other = p.Items[0]
  if (other.response === 'AVAILABLE_TO_CHAT') {
    let mainUserId = getUserId(item.SK)
    let channelDetails = await client.conversations.open({
      users: `${item.linkedUser.user}, ${mainUserId}`,
      return_im: true
    })
    let directMessageId = channelDetails.channel.id
    await client.chat.postMessage({
      channel: directMessageId,
      text: 'You both seem to want to chat! What a time to be alive!'
    })
  }
  await say(`Thanks for your choice!`)
})
;(async () => {
  // Start your app
  await app.start(process.env.PORT || 6000)
  console.log('⚡️ Bolt app is running!')
})()

const sendMessageToEachUser = async (recipient, other, client) => {
  const result = await client.conversations.open({
    users: recipient.id,
    return_im: true
  })
  let directMessageId = result.channel.id
  await client.chat.postMessage({
    channel: directMessageId,
    blocks: JSON.stringify([
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${recipient.real_name}>! ${other.real_name} walks past you in the corridor`
        }
      },
      { type: 'divider' },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Say hi!'
            },
            action_id: 'positive_click'
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Nod and smile'
            },
            action_id: 'neutral_click'
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Walk on by - busy busy'
            },
            action_id: 'negative_click'
          }
        ]
      }
    ])
  })
  return directMessageId
}

const getUserId = sk => {
  let hashIndex = sk.indexOf('#') + 1
  return sk.slice(hashIndex)
}

const getTwoUsers = async (client, channel) => {
  const info = await client.conversations.members({
    channel,
    include_num_members: true
  })

  let memberPromises = info.members.map(async id => {
    return client.users.info({
      user: id
    })
  })
  let allUsers = await Promise.all(
    memberPromises.map(p =>
      p.catch(e => {
        return e
      })
    )
  )

  let nonBots = allUsers.filter(u => {
    return !u.user.is_bot
  })

  return _.sampleSize(nonBots, 2).map(i => i.user)
}

const getUser = async (user, client) => {
  return client.users.info({
    user
  })
}

const dummyUsers = [
  {
    id: 'U018EM72S64',
    team_id: 'T017QRWK2LS',
    name: 'mbg',
    deleted: false,
    color: '9f69e7',
    real_name: 'mbg',
    tz: 'Europe/London',
    tz_label: 'British Summer Time',
    tz_offset: 3600,
    profile: [Object],
    is_admin: true,
    is_owner: true,
    is_primary_owner: true,
    is_restricted: false,
    is_ultra_restricted: false,
    is_bot: false,
    is_app_user: false,
    updated: 1595700382
  },
  {
    id: 'U01AAG3A06P',
    team_id: 'T017QRWK2LS',
    name: 'michael.goulbourn',
    deleted: false,
    color: 'e7392d',
    real_name: 'Michael',
    tz: 'Europe/London',
    tz_label: 'British Summer Time',
    tz_offset: 3600,
    profile: [Object],
    is_admin: false,
    is_owner: false,
    is_primary_owner: false,
    is_restricted: false,
    is_ultra_restricted: false,
    is_bot: false,
    is_app_user: false,
    updated: 1599592938
  }
]
