import AppError from "../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { envVars } from "../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exit", "");
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password as string);

    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Password", "");
    }
     const jwtPayLoad = {
        userId : isUserExist._id,
        email : isUserExist.email,
        role : isUserExist.role
    } 
    // const accessToken = jwt.sign(jwtPayLoad, "SECRET_KEY",
    //     { expiresIn: '20h' })
    const accessToken = generateToken(jwtPayLoad, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES )
   
    return {
       accessToken
    }
}

export const AuthService = {
    credentialLogin
}