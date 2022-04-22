import { IUser, User } from "../models/user.model";

export class UserService {
    static async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
    static createUser(username: string, password: string): Promise<IUser> {
        return User.create({ username, password });
    }
    static async login(username: string, password: string): Promise<IUser | null> {
        return await User.findOne({ username, password });
    }
}

