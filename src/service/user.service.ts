import {DatabaseConnection} from "../config/databaseConfig";
import {User} from "../entity/User.Entity";
import {IUser} from "../models/IUser";
import {Connection} from "typeorm";

export class UserService {
    private databaseConnection;
    constructor() {
        this.databaseConnection = new DatabaseConnection()
    }
    createUser(user: IUser) {
        this.databaseConnection.getConnection().then(async (connection: Connection) => {
            try {
                const repository = connection.getRepository(User);
                const user = new User();
                user.firstName = "Timber";
                user.lastName = "Saw";
                user.age = 25;
                await repository.save(user);
            } catch (e) {

            }
        }).catch(e => {

        })
    }
}