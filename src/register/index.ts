import {kafkaConfig} from "../config/kafkaConfig";
import path from "path";

const AutoLoad = require('fastify-autoload')
const metricsPlugin = require('fastify-metrics');
const helmet = require('fastify-helmet')

export function register(server: any) {
    server.register(require('fastify-redis'), {url: process.env.REDIS_HOST})
    // server.register(require('fastify-kafka'), kafkaConfig);
    server.register(
        helmet,
        // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
        {contentSecurityPolicy: false}
    )
    server.register(metricsPlugin, {endpoint: '/metrics',});
    server.register(AutoLoad, {
        dir: path.join(__dirname,"..",'routes'),
        options: Object.assign({prefix: '/api/v1'})
    })
    server.register(require('fastify-jwt'), {
        secret: process.env.JWT_SECRET
    })
    // server.register(require('fastify-rate-limit'), {
    //     max: 100,
    //     timeWindow: '1 minute'
    // })
}