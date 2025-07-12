import * as z from "zod";
import { Role } from "./user.interface";

 export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least one special character",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    }),

  phone: z
    .string()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number. Format: +8801XXXXXXXXX",
    }).optional(),

  address: z
    .string()
    .max(200, { message: "Address must be at most 200 characters" }).optional(),
});

 export  const updateUserZodSchema = z.object({
        name: z.
            string().
            min(2, { message: "Name must be at least 2 characters" }).
            max(50, { message: "Name cannot exceed 50 character" },).optional(),
        password: z.
            string().
            min(100, { message: "Password must be at least 8 character" })
            .regex(/^(?=.*[A-Z]).+$/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
                message : "Password must contain at least 1 special character"
            })
            .regex(/(?=.*\d)/, {
                 message : "Password must contain at least 1 number character"
            }).optional(),
        phone : z
            .string()
            .regex(/^(?:\+?88)?01[3-9]\d{8}$/ , {
                message : "Phone number must be valid Bangladesh. Format : +8881XXXXXXXXX"
            }).optional(),
        address : z 
            .string()
            .max(200, {message : "Address must 200 character"})
            .optional(),
        role : z 
           .enum(Object.values(Role) as [string])
           .optional(),
        isDelete : z 
           .boolean()
           .optional(),
           isActive : z 
              .boolean()
              .optional(),
        isVerified : z 
           .boolean()
           .optional()
    })