/* eslint-disable no-console */
import { Server } from "http"

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/modules/config/env";

let server: Server;
const startServer = async () => {
    
    try {
        await mongoose.connect("mongodb+srv://ph-tour-management-system:kxrC6SFgRZa0FrPj@cluster0.i1uhr.mongodb.net/ph-tour-management?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected To DataBase");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is Listening to port ${envVars.PORT}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}
process.on("unhandledRejection", () => {
    console.log("UnHandle Rejection detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("uncaughtException", () => {
    console.log("uncaughtException detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("SIGINT", () => {
    console.log("SIGINT signal received detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
startServer();

