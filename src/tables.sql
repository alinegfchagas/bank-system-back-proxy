-- Active: 1662659335013@@35.226.146.116@3306@freire-aline-chagas
DROP TABLE IF EXISTS Ng_Users;
        DROP TABLE IF EXISTS Ng_Transactions;
        DROP TABLE IF EXISTS Ng_Accounts;
      
        CREATE TABLE IF NOT EXISTS Ng_Accounts(
            id VARCHAR(255) PRIMARY KEY,
            balance DECIMAL(15,2) DEFAULT 100
        );

        CREATE TABLE IF NOT EXISTS Ng_Users(
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            accountId VARCHAR(255) ,
            FOREIGN KEY (accountId) REFERENCES Ng_Accounts(id)
        );
        
        
        CREATE TABLE IF NOT EXISTS Ng_Transactions(
            id VARCHAR(255) PRIMARY KEY,
            value DECIMAL(15,2),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            debitedAccountId VARCHAR(255),
            creditedAccountId VARCHAR(255),
            FOREIGN KEY (debitedAccountId ) REFERENCES Ng_Accounts (id),
            FOREIGN KEY (creditedAccountId) REFERENCES Ng_Accounts (id)
        ); 