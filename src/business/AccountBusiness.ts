import { AccountDatabase } from "../database/AccountDatabase";
import { IAccountDB, IAccountInputDTO } from "../models/Account";
import { Authenticator } from "../services/Authenticator";

export class AccountBusiness {
    constructor(
        private accountDataBase: AccountDatabase,
      private authenticator: Authenticator
    ) {}

    public getAccount =async (input:IAccountInputDTO) => {
        const{token}=input 
         if(!token){
            throw new Error ("Credenciais faltando")
         }
        const userTokenData = this.authenticator.getTokenPayload(token)

        const userNameId = userTokenData?.username!
        if(!userNameId){
            throw new Error("Credenciais invalidas")
        }
        const response:IAccountDB = await this.accountDataBase.getAccount(userNameId)
        console.log(response);

        return response
        
    }


}
