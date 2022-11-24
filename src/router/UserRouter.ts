import { Router } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { AccountDatabase } from "../database/AccountDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userRouter = Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new AccountDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator(), 
    

  )
)

userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.loginUser)
