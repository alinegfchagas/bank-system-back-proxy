import { AccountBusiness } from "../business/AccountBusiness";
import { Request, Response } from "express";


export class AccountController{
    constructor(private accounBusiness:AccountBusiness ){}

    public Account =async (req:Request,res:Response) => {
        try {
            const input = {token: req.headers.authorization as string}

            const response = await this.accounBusiness.getAccount(input)
            res.status(200).send(response);
        } catch (error:any) {
            res.status(500).send(error.message || error.sqlMessage);
        }
        
        




    }

}
