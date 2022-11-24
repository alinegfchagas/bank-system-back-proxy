
export interface IUserDB {
    id:string,
    username: string,
    password: string,
    accountId:string
}


export interface IInputDTO{
    userName:string,
    password:string
}

export interface IOutputDTO {
    message:string,
    token:string
}




export class User {
    constructor(
        private id: string,
        private userName: string,
        private password: string,
        private accountId: string
    ) {}

    public getId = () => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }
    public getUserName = () => {
        return this.userName
    }

    public setUserName = (newUserName: string) => {
        this.userName = newUserName
    }

    public getPassword = () => {
        return this.password
    }

    public setPassword = (newPassword: string) => {
        this.password = newPassword
    }

    public getAccountId = () => {
        return this.accountId
    }

    public setAccountId= (newId: string) => {
        this.accountId = newId
    }

    
}
