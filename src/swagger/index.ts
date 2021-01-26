import {server} from "../server";

server.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {name: 'user', description: 'User related end-points'},
            {name: 'code', description: 'Code related end-points'}
        ],
        definitions: {
            User: {
                type: 'object',
                required: ['id', 'email'],
                properties: {
                    id: {type: 'string', format: 'uuid'},
                    firstName: {type: 'string'},
                    lastName: {type: 'string'},
                    email: {type: 'string', format: 'email'}
                }
            }
        },
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
            }
        }
    },
    exposeRoute: true
})


server.ready(err => {
    if (err) throw err
    // @ts-ignore
    server.swagger()
})