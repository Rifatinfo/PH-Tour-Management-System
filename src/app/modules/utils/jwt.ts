import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const generateToken = (payLoad : JwtPayload, SECRET_KEY : string, expiresIn : string) => {
     const token = jwt.sign(payLoad, SECRET_KEY, {
        expiresIn
     } as SignOptions)
     return token
}

export const verifyToken = (token : string, SECRET_KEY : string) => {
     const verifyToken = jwt.verify(token, SECRET_KEY);
     return verifyToken;
}