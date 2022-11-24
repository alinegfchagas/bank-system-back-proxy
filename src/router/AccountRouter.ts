import { Router } from "express"
import { AccountBusiness } from "../business/AccountBusiness";
import { AccountController } from "../controller/AccountController";
import { AccountDatabase } from "../database/AccountDatabase";
import { Authenticator } from "../services/Authenticator";

export const accountRouter = Router();
const accountController = new AccountController(
    
    new AccountBusiness(
        new AccountDatabase,
        new Authenticator
    )
)
accountRouter.get("",accountController.Account)

