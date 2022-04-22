import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    toJSON: {
        transform: (_doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export interface IUser extends mongoose.Schema { 
    id: string;
    username: string;
    password: string;
}

export const User = mongoose.model<IUser>("User", userSchema);
