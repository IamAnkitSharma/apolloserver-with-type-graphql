import { IUser, User } from "../models/user.model";
import bcrypt from 'bcrypt';

export class UserService {
    static async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
    static async createUser(username: string, password: string): Promise<IUser> {
        const hash = await bcrypt.hash(password, 10);
        return User.create({ username, password: hash });
    }
    static async verifyUserNameAndPassword(username: string, password: string): Promise<IUser | null> {
        const user= await User.findOne({ username });
        if (!user) throw new Error('User Not Found')
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return user;
    }
}

