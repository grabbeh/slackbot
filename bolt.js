const dotenv = require('dotenv')
dotenv.config()
const { App } = require('@slack/bolt')
const echo = require('./echo')
const cheerio = require('cheerio')
const axios = require('axios')

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.command('/echo', echo)

app.command('/cca', async ({ ack, body, context, respond }) => {
  ack()

  let clause = Math.floor(Math.random() * 193) + 1
  let response = await axios(
    `https://www.legislation.gov.uk/ukpga/1974/39/section/${clause}`
  )

  let { data } = response
  const $ = cheerio.load(data)
  //const section = $('#viewLegSnippet').text()
  const title = $('#viewLegSnippet .LegP1GroupTitleFirst').text()
  const content = $('.LegSnippet  p').text()

  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${clause} ${title}*`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${content}`
      }
    }
  ]
  await respond({
    blocks,
    response_type: 'in_channel',
    mrkdwn: true
  })
})

app.command('/ticket', async ({ ack, body, context }) => {
  console.log('Ticket!')
  // Acknowledge the command request
  await ack()

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Welcome to a modal with _blocks_'
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click me!'
              },
              action_id: 'button_abc'
            }
          },
          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?'
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})

// Unix timestamp for tomorrow morning at 9AM
let tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(9, 0, 0)

// When "/schedule", schedule a message for tomorrow morning
// Tip: use the shortcut() method to listen to shortcut events
app.command('/schedule', async ({ command, ack, client, context }) => {
  // Acknowledge incoming command event
  ack()

  try {
    // Call the chat.scheduleMessage method using the built-in WebClient
    const result = await client.chat.scheduleMessage({
      // The token you used to initalize the app
      token: context.botToken,
      channel: command.channel_id,
      text: command.text,
      // Time to post message, in Unix Epoch timestamp format
      post_at: tomorrow.getTime() / 1000
    })

    // Print result
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me'
          },
          action_id: 'button_click'
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  })
})

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack()
  await say(`<@${body.user.id}> clicked the button`)
})

app.shortcut('open_modal', async ({ shortcut, ack, context, client }) => {
  try {
    // Acknowledge shortcut request
    await ack()

    // Call the views.open method using one of the built-in WebClients
    const result = await client.views.open({
      // The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      trigger_id: shortcut.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'My App'
        },
        close: {
          type: 'plain_text',
          text: 'Close'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                'About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>.'
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text:
                  'Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>'
              }
            ]
          }
        ]
      }
    })

    console.log(result)
  } catch (error) {
    console.error(error)
  }
})
;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
