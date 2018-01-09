# AWS ElasticSearch S3 Snapshot

Register a S3 bucket as a snapshot repository for an AWS Elasticsearch instance setup inside a VPC.

## Getting Started

Before running this package, you will need to setup a new ARN to allow ElasticSearch to use S3 as a snapshot repository.

### AWS Setup

Follow the [AWS Elasticsearch S3 Snapshot](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains-snapshots.html) instructions for creating an IAM Role and Policy. Ignore the rest starting at "Registering a Manual Snapshot Directory".

### Installing

```
yarn
```

or

```
npm i
```

## Registering the snapshot

You will first need to create a SSH tunnel to your Elasticsearch instance using a bastion (or jumpbox) server. For example:

`ssh -N -L localhost:9200:vpc-xxxx.us-west-2.es.amazonaws.com:443 myuser@jumpbox.mydomain.com`

To run this script and register the snapshot repository, you will need to add some environmental variables. Since this will only need to be run once, it might be easier to pass them inline.

`ES_REGION=xxx S3_REGION=xxx BUCKET_NAME=xxx ROLE_ARN=arn:xxx ACCESS_KEY=xxx SECRET_KEY=xxx SNAPSHOT_NAME=xxx LOCAL_ES_PORT=9200 node index.js`

Or if you have exported the environment variables you can simply run this with:

`node index.js`

## Environment Variables

All are required.

| ES_REGION | Elasticsearch region |
| S3_REGION | S3 Bucket region |
| BUCKET_NAME | S3 Bucket name |
| BUCKET_PATH | Path to backup location, no leading slash (optional) |
| ROLE_ARN | The ARN from the created IAM role |
| ACCESS_KEY | Your AWS access key |
| SECRET_KEY | Your AWS secret key |
| SNAPSHOT_NAME | The snapshot name |
| LOCAL_ES_PORT | The local port your tunneled ES instance |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
