const fetch = require('node-fetch');
const aws4 = require('aws4');
const https = require('https');

const requestOptions = {
  method: 'PUT',
  headers: {
    "Content-Type": "application/json",
  },
  service: 'es',
  region: process.env.ES_REGION,
  path: `/_snapshot/${process.env.SNAPSHOT_NAME}`,
  agent: new https.Agent({
    rejectUnauthorized: false,
  }),
  body: JSON.stringify({
    type: "s3",
    settings: { 
      bucket: process.env.BUCKET_NAME,
      base_path: process.env.BUCKET_PATH,
      region: process.env.S3_REGION,
      role_arn: process.env.ROLE_ARN
    }
  })
};

const register = (options) => {
  aws4.sign(options, {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

  return fetch(`https://localhost:${process.env.LOCAL_ES_PORT}/_snapshot/${process.env.SNAPSHOT_NAME}`, options)
    .then(result => result.json())
    .then(result => console.log('result', result))
}

register(requestOptions);
