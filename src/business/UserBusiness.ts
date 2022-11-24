import { UserDatabase } from "../database/UserDatabase";
import { AccountDatabase } from "../database/AccountDatabase";
import { IInputDTO, IOutputDTO, User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private accountDataBase: AccountDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  // Rules SignUp
  public register = async (input: IInputDTO) => {
    const { userName, password } = input;

    if (typeof userName !== "string") {
      throw new Error("Parâmetro 'username' inválido");
    }

    if (typeof password !== "string") {
      throw new Error("Parâmetro 'password' inválido");
    }

    if (userName.length < 3) {
      throw new Error("Parâmetro 'username' inválido: mínimo de 3 caracteres");
    }

    if (password.length < 8) {
      throw new Error("Parâmetro 'password' inválido: mínimo de 8 caracteres");
    }

    if (
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])(?!\1)){8,}$/
      )
    ) {
      throw new Error(
        "Parâmetro 'password' precisa conter ao menos uma letra maiúscula"
      );
    }
  
    const thisUserExists = await this.userDataBase.findUserName(userName);

    if (thisUserExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const id = this.idGenerator.generate();

    const accountId = userName;

    
    const hashedPassword = await this.hashManager.hash(password);
    
    await this.accountDataBase.createAccount(accountId);

    const user = new User(id, userName, hashedPassword, accountId);

    await this.userDataBase.createUser(user);
    const payload: ITokenPayload = {
      id: user.getId(),
      username: user.getUserName()
    };

    const token = this.authenticator.generateToken(payload);

    const response: IOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      token,
    };
    return response;
  };
  // Rules Login
  public doLogin = async (input: IInputDTO) => {
    const { userName, password } = input;

    if (typeof userName !== "string") {
      throw new Error("Parâmetro 'username' inválido");
    }

    if (typeof password !== "string") {
      throw new Error("Parâmetro 'password' inválido");
    }

    if (userName.length < 3) {
      throw new Error("Parâmetro 'username' inválido: mínimo de 3 caracteres");
    }

    if (password.length < 8) {
      throw new Error("Parâmetro 'password' inválido: mínimo de 8 caracteres");
    }
    if (
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])(?!\1)){8,}$/
      )
    ) {
      throw new Error(
        "Parâmetro 'password' precisa conter ao menos uma letra maiúscula"
      );
    }
    const userExists = await this.userDataBase.findUserName(userName);

    if (!userExists) {
      throw new Error("Usuário não cadastrado!");
    }

    const user = new User(
      userExists.id,
      userExists.username,
      userExists.password,
      userExists.accountId
    );

    const passwordIsCorrect = await this.hashManager.compare(
      password,
      user.getPassword()
    );

    if (!passwordIsCorrect) {
      throw new Error("Password Incorreta");
    }

    const payload: ITokenPayload = {
      id: user.getId(),
      username: user.getUserName()
    };

    const token = this.authenticator.generateToken(payload);

    const answer: IOutputDTO = {
      message: "success",
      token,
    };

    return answer;
  };
}
