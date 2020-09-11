const dotenv = require('dotenv')
const { App, ExpressReceiver } = require('@slack/bolt')
const scopes = require('./server/slack/scopes.js')
const walk = require('./server/slack/walk.js')
const random = require('./server/slack/random.js')
const positive = require('./server/slack/positive')
const { storeInstall, fetchInstall } = require('./server/dynamodb/dynamodb.js')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
dotenv.config({ path: '../../.env' })

// Create a Bolt Receiver
const receiver = new ExpressReceiver({
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

// Create the Bolt App, using the receiver
const app = new App({
  receiver,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

nextApp.prepare().then(() => {
  app.command('/random', random)
  app.command('/walk', walk)
  app.action('positive_click', positive)
  app.event('url_verification', async ({ event, client }) => {
    console.log(event)
  })
  app.event('app_home_opened', async ({ event, client }) => {
    console.log(event)
  })

  receiver.router.get('/install', async (req, res) => {
    let url = await receiver.installer.generateInstallUrl({ scopes })
    res.status(200).json(url)
  })

  receiver.router.get('/slack/oauth_redirect', (req, res) => {
    receiver.installer.handleCallback(callbackOptions)
  })

  receiver.router.get('/', async (req, res) => {
    let data = await receiver.installer.generateInstallUrl({ scopes })
    return nextApp.render(req, res, '/', data)
  })

  receiver.router.get('*', (req, res) => {
    return handle(req, res)
  })
  ;(async () => {
    // Start your app
    await app.start(process.env.PORT || 6000)
    console.log('⚡️ Bolt app is running!')
  })()
})

const callbackOptions = {
  success: (installation, installOptions, req, res) => {
    // Do custom success logic here
    res.send('successful!')
  },
  failure: (error, installOptions, req, res) => {
    // Do custom failure logic here
    res.send('failure')
  }
}
