// import {server} from '../server';

const crypto = require('crypto')

const group = crypto.randomBytes(20).toString('hex')
export const kafkaConfig={
    producer: {
        'metadata.broker.list': '127.0.0.1:9092',
        'group.id': group,
        'fetch.wait.max.ms': 10,
        'fetch.error.backoff.ms': 50,
        'dr_cb': true
    },
    consumer: {
        'metadata.broker.list': '127.0.0.1:9092',
        'group.id': group,
        'fetch.wait.max.ms': 10,
        'fetch.error.backoff.ms': 50,
        'auto.offset.reset': 'earliest'
    }
}
