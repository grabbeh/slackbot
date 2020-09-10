module.exports = async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack()
  await say(`${command.text}`)
}
