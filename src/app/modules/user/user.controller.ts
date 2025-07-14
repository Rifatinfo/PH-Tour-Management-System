/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { UserService } from './user.service';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
// import { verifyToken } from '../utils/jwt';
// import { envVars } from '../config/env';
// import { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Created Successfully",
        data: user
    })
})
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string , envVars.JWT_ACCESS_SECRET) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserService.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Update Successfully",
        data: user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers()
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Created Successfully",
        data: result.data,
        meta : result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}