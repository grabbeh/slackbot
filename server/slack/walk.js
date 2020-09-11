const { getUser, sendMessageToEachUser, getUserId } = require('./utils.js')
const {
  addInteraction,
  addWalkingUser,
  getWalkingUsers
} = require('../dynamodb/dynamodb.js')
const _ = require('lodash')

const walk = async ({ ack, say, client, command }) => {
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
}

module.exports = walk
