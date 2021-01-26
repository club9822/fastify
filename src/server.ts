/**
 * Most type annotations in this file are not strictly necessary but are
 * included for this example.
 *
 * To run this example execute the following commands to install typescript,
 * transpile the code, and start the server:
 *
 * npm i -g typescript
 * tsc examples/typescript-server.ts --target es6 --module commonjs
 * node examples/typescript-server.js
 */
import "reflect-metadata";
import fastify from 'fastify';
import path from 'path';
import {register} from "./register";
require('dotenv').config({path: path.join(__dirname, '..', '.env.development')})
// Create an http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
// const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();
const server = fastify();
// register all necessary
register(server)
// @ts-ignore
server.setErrorHandler(function (error, request, reply) {
    if (reply.statusCode === 429) {
        error.message = 'You hit the rate limit! Slow down please!'
    }
    reply.send(error)
})
// Define interfaces for our request. We can create these automatically
// off our JSON Schema files (See TypeScript.md) but for the purpose of this
// example we manually define them.


// Start your server
server.listen(Number(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    console.log(`Server listening at ${address}`);
});
export {server}