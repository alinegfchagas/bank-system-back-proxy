export interface ITransactionDB {
    id:string,
    value:number,
    debitedAccountId :string,
    creditedAccountId:string
    
}

export interface ITransactionInputDTO{
    token:string,
    userNameAccount:string,
    value:number
}
export interface IViewTransactionInputDTO{
    token:string
}

export class Transaction {
    constructor(
      private  id:string,
      private value:number,
      private  debitedAccountId :string,
      private  creditedAccountId:string,
      private createdAt?:Date
    ) {}

public getId =()=>{
    return this.id
}
public setId = (newId: string) => {
    this.id = newId
}

public getValue =()=>{
    return this.value
}

public setValue = (newValue: number) => {
    this.value = newValue
}

public getDebitedAccountId =()=>{
    return this.debitedAccountId
}
public setDebitedAccountId = (newDebitedAccountId: string) => {
    this.debitedAccountId = newDebitedAccountId
}

public getCreditedAccountId =()=>{
    return this.creditedAccountId
}
public setCreditedAccountId = (newCreditedAccountId: string) => {
    this.creditedAccountId = newCreditedAccountId
}

public getCreateAt() {
    return this.createdAt
}


}