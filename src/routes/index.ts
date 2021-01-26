// Add our routes handler with correct types
// import {userPub} from "../kafka/kafkaProducers";
import {FastifyInstance, FastifyRegisterOptions} from "fastify";
import {sendMessage} from "../kafka/kafkaProducers";
import {kafka} from "../kafka/kafka";
import {run} from "../kafka/kafkaConsumers";

module.exports = function (fastify: FastifyInstance, opts: FastifyRegisterOptions<any>, next: any) {
    run().catch(e => kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack }))

    fastify.get('/ping', (request, reply) => {
        reply.code(200).send({pong: 'it worked!'});
    });
    fastify.get('/user', (req, reply) => {
        // req.user
        console.log('log::::getgetgetget')
        // userPub({message:'sdsd'})
        sendMessage()
        reply.code(200).send({pong: 'user worked!'});
    })
    fastify.post('/signup', (req, reply) => {
        // some code
        // const token = fastify.jwt.sign({ payload })
        reply.send({ token:'' })
    })
    next()

}

