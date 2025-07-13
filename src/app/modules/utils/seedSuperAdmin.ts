import { envVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model"
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
   const isSuperAdminExist = await User.findOne({email : envVars.SUPER_ADMIN_EMAIL});
   if(isSuperAdminExist){
     return;
   }

    const hashPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));
    const authProvider : IAuthProvider = {
        provider : "credential",
        providerId : envVars.SUPER_ADMIN_EMAIL
    }
    const payload : IUser = {
        name : "Super Admin",
        role : Role.SUPER_ADMIN,
        email : envVars.SUPER_ADMIN_EMAIL,
        password : hashPassword,
        isVerified : true,
        auth : [authProvider]
    }
    
   const superAdmin = await User.create(payload);
   console.log(superAdmin);

}