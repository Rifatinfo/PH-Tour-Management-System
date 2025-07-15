import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import AppError from "../errorHelpers/AppError";
import { setAuthCookie } from "../utils/setCookie";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialLogin(req.body);
    res.cookie("refreshToken", loginInfo.refreshToken, {
        httpOnly : true,
        secure : false
    })
    res.cookie("accessToken", loginInfo.accessToken, {
        httpOnly : true,
        secure : false
    })

    // setAuthCookie(res, loginInfo);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No refresh token received from cookies", "")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)

    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})


export const AuthController = {
    credentialLogin,
    getNewAccessToken
}