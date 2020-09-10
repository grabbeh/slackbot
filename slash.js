require('dotenv').config()

const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const qs = require('querystring')
const debug = require('debug')('slash-command-template:index')
const cheerio = require('cheerio')

const app = express()

/*
 * Parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(
    '<h2>The Slash Command and Dialog app is running</h2> <p>Follow the' +
      ' instructions in the README to configure the Slack App and your environment variables.</p>'
  )
})

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/commands', (req, res) => {
  // extract the verification token, slash command text,
  // and trigger ID from payload
  const { token, text, trigger_id } = req.body

  // check that the verification token matches expected value
  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    // create the dialog payload - includes the dialog structure, Slack API token,
    // and trigger ID
    const dialog = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id,
      dialog: JSON.stringify({
        title: 'Submit a helpdesk ticket',
        callback_id: 'submit-ticket',
        submit_label: 'Submit',
        elements: [
          {
            label: 'Title',
            type: 'text',
            name: 'title',
            value: text,
            hint: '30 second summary of the problem'
          },
          {
            label: 'Description',
            type: 'textarea',
            name: 'description',
            optional: true
          },
          {
            label: 'Urgency',
            type: 'select',
            name: 'urgency',
            options: [
              { label: 'Low', value: 'Low' },
              { label: 'Medium', value: 'Medium' },
              { label: 'High', value: 'High' }
            ]
          }
        ]
      })
    }

    // open the dialog by calling dialogs.open method and sending the payload
    axios
      .post('https://slack.com/api/dialog.open', qs.stringify(dialog))
      .then(result => {
        debug('dialog.open: %o', result.data)
        res.send('')
      })
      .catch(err => {
        debug('dialog.open call failed: %o', err)
        res.sendStatus(500)
      })
  } else {
    debug('Verification token mismatch')
    res.sendStatus(500)
  }
})

app.post('/ccabot', async (req, res) => {
  const body = req.body
  console.log(body)
  let { response_url } = body

  if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
    debug(`Submission received: ${body.trigger_id}`)
    let clause = Math.floor(Math.random() * 193) + 1
    let response = await axios(
      `https://www.legislation.gov.uk/ukpga/1974/39/section/${clause}`
    )

    let { data } = response
    const $ = cheerio.load(data)
    //const section = $('#viewLegSnippet').text()
    const title = $('#viewLegSnippet .LegP1GroupTitleFirst').text()
    const content = $('.LegSnippet  p').text()

    console.log(content)
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

    axios
      .post(
        response_url,
        JSON.stringify({
          response_type: 'in_channel',
          blocks,
          mrkdwn: true
        })
      )
      .then(result => {
        res.send('')
      })
      .catch(err => {
        debug('call failed: %o', err)
        res.sendStatus(500)
      })
  } else {
    debug('Token mismatch')
    res.sendStatus(500)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`)
})
