const fs = require('fs')
const ip = require('ip')

const { Kafka, logLevel } = require('kafkajs')
const PrettyConsoleLogger = require('./prettyConsoleLogger')

const host = process.env.HOST_IP || ip.address()
export const kafka = new Kafka({
    logLevel: logLevel.INFO,
    logCreator: PrettyConsoleLogger,
    brokers: [`${host}:9094`, `${host}:9097`, `${host}:9100`],
    clientId: 'example-consumer',
    // ssl: {
    //     servername: 'localhost',
    //     rejectUnauthorized: false,
    //     ca: [fs.readFileSync('./testHelpers/certs/cert-signed', 'utf-8')],
    // },
    // sasl: {
    //     mechanism: 'plain',
    //     username: 'test',
    //     password: 'testtest',
    // },

})