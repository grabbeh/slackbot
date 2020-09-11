const { getUserId } = require('./utils.js')
const {
  findInteraction,
  updateInteraction
} = require('../dynamodb/dynamodb.js')

const positive = async ({ client, body, ack, say }) => {
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
}

module.exports = positive
