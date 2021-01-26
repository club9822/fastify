import {Connection, createConnection} from "typeorm";
import {User} from "../entity/User.Entity";

export class DatabaseConnection {
    private connection: Connection | null = null

    constructor() {
        console.log(process.env.DB_HOST)
        this.connect();
    }

    connect(): Promise<Connection | Error> {
        return new Promise((resolve, reject) => {
            createConnection({
                type: "postgres",
                host: "rajje.db.elephantsql.com",
                port: 5432,
                username: "izrwnolc",
                password: "WHfKfZmrwpEfO-b6PQdINzz0SR0zLXA-",
                database: "izrwnolc",
                entities: [
                    User
                ],
                synchronize: true,
                logging: false
            }).then(connection => {
                this.connection = connection;
                resolve(connection)
            }).catch(error => {
                console.log(error)
                reject(error)
            });
        })

    }

    async getConnection(): Promise<Connection> {
        return new Promise(async (resolve, reject) => {
            if (this.connection) {
                resolve(this.connection)
            }
            try {
                const connection = await this.connect() as Connection;
                resolve(connection)
            } catch (e) {
                reject(e)
            }
        })

    }

    closeConnection(): Promise<boolean | Error> {
        if (this.connection) {
            return this.connection.close().then(res => {
                return true
            }).catch(e => {
                return e
            })
        }
        return Promise.reject('no connection is established')
    }
}