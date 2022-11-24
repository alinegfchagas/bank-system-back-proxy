import { AccountDatabase } from "../database/AccountDatabase";
import { TransactionDatabase } from "../database/TransactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Account } from "../models/Account";
import { ITransactionInputDTO, IViewTransactionInputDTO, Transaction } from "../models/Transaction";


export class TransactionBusiness {
  constructor(
    private accountDataBase: AccountDatabase,
    private transactionDatabase: TransactionDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public transferAccount = async (input: ITransactionInputDTO) => {
    // Desestruturando 
    const { token, userNameAccount, value } = input;
    // Verificando se campos vieram vazios
    if (!token || !userNameAccount || !value) {
      throw new Error("Parâmetros faltando");
    }
    // Verificação se a conta existe 
    const userDBCashIn = await this.accountDataBase.getAccount(userNameAccount);
    if (!userDBCashIn) {
      throw new Error("Credenciais inválidas");
    }
    // Requisitando conta e armazenando dados
    const creditedAccount = new Account(userDBCashIn.id, userDBCashIn.balance);
    // Requisitando dados via JWT
    const userTokenData = this.authenticator.getTokenPayload(token);     
    const userNameId = userTokenData?.username as string;    
    // Verificação se a conta existe 
    const userDBCashOut = await this.accountDataBase.getAccount(userNameId);
    const debitedAccount = new Account(userDBCashOut.id, userDBCashOut.balance);

    if (userNameAccount === userNameId) {
      throw new Error("Não é possível transferir para sua própria conta");
    }
    // Vericando se o saldo é positivo
    if (debitedAccount.getBalance() < value) {
      throw new Error("Saldo insuficiente");
    }
    // Calculo de retirada de CASH 
    const calculateCashOut = debitedAccount.getBalance() - value;
    // Calculo de adição de CASH 
    const calculateCashIn = creditedAccount.getBalance() + value;
    // Gerando ID
    const id = this.idGenerator.generate();
    // Criando nova transação
    const transferDB = new Transaction (id,value,debitedAccount.getId(),creditedAccount.getId()) 
    // Requição de transferencia
    await this.transactionDatabase.bankTransfer(transferDB)
    // Requisição de alteração no DB debitedAccount
    await this.accountDataBase.updateCashOut(calculateCashOut,debitedAccount.getId())
    // Requisição de alteração creditedAccount
    await this.accountDataBase.updateCashIn(calculateCashIn,creditedAccount.getId())

    const response:any= {
      message: "Transferência realizada com sucesso!",
    };
    return response;
  };
   public transactionsById = async (input:IViewTransactionInputDTO) => {
    // Desestruturando
    const {token} = input

    // Requisitando dados via JWT
    const userTokenData = this.authenticator.getTokenPayload(token);     
    const userNameId = userTokenData?.username as string;    
    // Verificação se a conta existe 
    const debitedAccount= userNameId
    const  creditedAccount =userNameId 
    const response = await this.transactionDatabase.getTransactionsById(debitedAccount,creditedAccount) 
     
    return response
    
   }


}
