import { Request, Response } from "express";
import { TransactionBusiness } from "../business/TransactionBusiness";
import { ITransactionInputDTO, IViewTransactionInputDTO } from "../models/Transaction";

export class TransactionController {
  constructor(private transactionBusiness: TransactionBusiness) {}
  
  public transferAccount = async (req: Request, res: Response) => {
    try {
      const input: ITransactionInputDTO = {
        token: req.headers.authorization as string,
        userNameAccount: req.body.userNameAccount,
        value: req.body.value
      };
      const response = await this.transactionBusiness.transferAccount(input);
      res.status(200).send(response);
    } catch (error: any) {
    
      res.status(500).send(error.message || error.sqlMessage);
    }
  };

  public viewCashOut = async (req: Request, res: Response) => {
    try {
      const input:IViewTransactionInputDTO = {
        token: req.headers.authorization as string
      };
      const response = await this.transactionBusiness.transactionsById(input);
      res.status(200).send(response);
    } catch (error: any) {
     
      res.status(500).send(error.message || error.sqlMessage);
    }
  }


  
}
