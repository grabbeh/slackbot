import dotenv from 'dotenv'
import AWS from 'aws-sdk'
dotenv.config({ path: '../../.env' })

AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// Create the DynamoDB service object
var client = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
//var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S'
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'WATERCOOLERv1'
}

// Call DynamoDB to create the table
client.createTable(params, (err, data) => {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Table Created', data)
  }
})
