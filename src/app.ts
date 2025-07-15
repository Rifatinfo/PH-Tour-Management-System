import express, { Request, Response } from "express"
import cors from 'cors';
import { router } from "./app/modules/routes";
import { globalErrorHandler } from "./app/modules/middlwares/globalErrorHandler";
import { notFound } from "./app/modules/middlwares/notFound";
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
   res.status(200).json({
    message: "Welcome to Tour Management System Backend"
   })
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;