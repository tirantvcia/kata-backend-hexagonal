import express, {Express, Request, Response} from "express";
import { UserRegistrationController } from "./UserRegistrationController";
import { Routes } from "./Routes";

export function createServer(userRegistrationController: UserRegistrationController): Express {
    

    const server = express();
    server.use(express.json());
    server.get(Routes.status, (req:Request, res: Response)=> res.status(200).json({ status:'OK' }));
    server.post(Routes.register, userRegistrationController.register);
    return server;
}

