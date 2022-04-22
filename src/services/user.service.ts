import { IUser, User } from "../models/user.model";

export class UserService {
    static async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
    static createUser(name: string): Promise<IUser> {
        return User.create({ name });
    }
}

