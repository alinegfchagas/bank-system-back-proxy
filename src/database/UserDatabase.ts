import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Ng_Users";
 
  public toUserDBModel = (user: User): IUserDB => {
    const userDB: IUserDB = {
        id: user.getId(),
        username: user.getUserName(),
        password: user.getPassword(),
        accountId: user.getAccountId()
    }

    return userDB
}


  public findUserName = async (
    username: string
  ): Promise<IUserDB | undefined> => {
    const result: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ username });

    return result[0];
  };


  public createUser = async (user: User): Promise<void> => {

    await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .insert({
      id: user.getId(),
      username: user.getUserName(),
      password: user.getPassword(),
      accountId: user.getAccountId()
    });
  };

  }
    