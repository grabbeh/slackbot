const { getTwoUsers, sendMessageToEachUser } = require('./utils.js')
const { addInteraction } = require('../dynamodb/dynamodb.js')

const random = async ({ ack, client, command }) => {
  await ack()
  try {
    let users = await getTwoUsers(client, command.channel_id)
    let channelIdOne = await sendMessageToEachUser(users[0], users[1], client)
    let channelIdTwo = await sendMessageToEachUser(users[1], users[0], client)
    await addInteraction(channelIdOne, channelIdTwo, users[0].id, users[1].id)
  } catch (error) {
    console.error(error)
  }
}

module.exports = random
