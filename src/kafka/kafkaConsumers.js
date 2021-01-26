import {kafka} from './kafka'
import {KafkaTopics} from "./kafkaTopics";

const topic = KafkaTopics.insert_user
const consumer = kafka.consumer({ groupId: 'chat-app-group' })

let msgNumber = 0
export const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        // eachBatch: async ({ batch }) => {
        //   console.log(batch)
        // },
        eachMessage: async ({ topic, partition, message }) => {
            msgNumber++
            console.log('log:::::::::::',msgNumber)
            kafka.logger().info('Message processed', {
                topic,
                partition,
                offset: message.offset,
                timestamp: message.timestamp,
                headers: Object.keys(message.headers).reduce(
                    (headers, key) => ({
                        ...headers,
                        [key]: message.headers[key].toString(),
                    }),
                    {}
                ),
                key: message.key.toString(),
                value: message.value.toString(),
                msgNumber,
            })
        },
    })
}


const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async e => {
        try {
            kafka.logger().info(`process.on ${type}`)
            kafka.logger().error(e.message, { stack: e.stack })
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        console.log('')
        kafka.logger().info('[example/consumer] disconnecting')
        await consumer.disconnect()
    })
})