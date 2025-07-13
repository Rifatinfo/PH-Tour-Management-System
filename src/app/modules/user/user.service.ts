import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { envVars } from "../config/env";

const createUser = async (payLoad: Partial<IUser>) => {
    const { email, password , ...rest} = payLoad;
   
    const isUserExist = await User.findOne({email})
    if(isUserExist){
      throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist", "");
    }
    const hashPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
    
    const authProvider: IAuthProvider = {provider : "credential", providerId : email as string}
   
    const user = await User.create({
        email,
        password : hashPassword,
        auth : [authProvider],
        ...rest
    })
    return user
}

const getAllUsers = async () => {
    const users = await User.find({});
    const totalUser = await User.countDocuments();

    return {
        data : users,
        meta : {
            total : totalUser
        }
    };
}

export const UserService = {
    createUser,
    getAllUsers
}