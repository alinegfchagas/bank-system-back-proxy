import { Account, IAccountDB } from "../models/Account";
import { BaseDatabase } from "./BaseDatabase";

export class AccountDatabase extends BaseDatabase {
  public static TABLE_ACCOUNT = "Ng_Accounts";

  public modelAccount = (account: Account): IAccountDB => {
    const accountDB: IAccountDB = {
      id: account.getId(),
      balance: account.getBalance(),
    };
    return accountDB;
  };

  public createAccount = async (accountId: string): Promise<void> => {
    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNT).insert({
      id: accountId,
      balance: 100,
    });
  };

  public getAccount = async (id: string)=> {
    const result = await BaseDatabase.connection(
      AccountDatabase.TABLE_ACCOUNT)
      .where({id});

    return result[0];
  };

  public updateCashOut = async(calculateCashOut:number,id:string): Promise<void> =>{
    await BaseDatabase.connection.raw(` UPDATE ${AccountDatabase.TABLE_ACCOUNT} SET balance = ${calculateCashOut} WHERE id = "${id}" `)
  }
  public updateCashIn = async(calculateCashIn:number,id:string): Promise<void> =>{
    await BaseDatabase.connection.raw(` UPDATE ${AccountDatabase.TABLE_ACCOUNT} SET balance = ${calculateCashIn} WHERE id = "${id}" `)
  }
}
