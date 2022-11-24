import { ITransactionDB, Transaction } from "../models/Transaction";
import { BaseDatabase } from "./BaseDatabase";

export class TransactionDatabase extends BaseDatabase {
    public static TABLE_ACCOUNT = "Ng_Accounts";
    public static TABLE_TRANSACTION = "Ng_Transactions";

    public toModelTransfer =(transaction:Transaction)=>{
            const TransactionDB: ITransactionDB = {
                id:transaction.getId(),
                value:transaction.getValue(),
                debitedAccountId :transaction.getDebitedAccountId(),
                creditedAccountId:transaction.getCreditedAccountId()
            }
        
            return TransactionDB
        } 

    
    public bankTransfer= async (transfer:Transaction): Promise<void> => {
        const exchange = this.toModelTransfer(transfer)
        await BaseDatabase.connection(TransactionDatabase.TABLE_TRANSACTION).insert(exchange)
    }

    public getTransactionsById =async (debitedAccountId:string,creditedAccountId:string) => {
        const response = await BaseDatabase.connection(TransactionDatabase.TABLE_TRANSACTION).where({debitedAccountId}).orWhere({creditedAccountId})

        const transactionModelById = response.map((exchange)=>{
            return new Transaction (
                exchange.id,
                exchange.value,
                exchange.debitedAccountId,
                exchange.creditedAccountId,
                exchange.createdAt
            )
        })

        return transactionModelById
      }

    
}