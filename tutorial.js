const { WebClient } = require('@slack/web-api')
const dotenv = require('dotenv')
dotenv.config()
const web = new WebClient(process.env.SLACK_TOKEN)
const currentTime = new Date().toTimeString()

;(async () => {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: '#general',
      text: `The current time is ${currentTime}`
    })
  } catch (error) {
    console.log(error)
  }

  console.log('Message posted!')
})()
