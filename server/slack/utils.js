const _ = require('lodash')

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

module.exports = {
  sendMessageToEachUser,
  getUser,
  getUserId,
  getTwoUsers
}
