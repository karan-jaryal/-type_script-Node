import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../_interfaces/user";



export var UserSchema: Schema = new Schema({
 createdAt: Date,
 userName: String,
 password: String
});
UserSchema.pre("create", next => {
 let now = new Date();
 if (!this.createdAt) {
 this.createdAt = now;
 }
 next();
});

export  const User: Model<IUser> = model<IUser>("Users", UserSchema);
//export default User;