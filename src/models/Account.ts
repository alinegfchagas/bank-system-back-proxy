export interface IAccountDB {
    id:string
    balance:number
}

export interface IAccountInputDTO{ 
    token:string
}

export class Account {
    constructor(
        private id: string,
        private balance: number,
       
    ) {}

    public getId = () => {                                                                            
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getBalance = () => {
        return this.balance
    }
    public setBalance = (newBalance: number) => {
        this.balance = newBalance
    }
   
}
