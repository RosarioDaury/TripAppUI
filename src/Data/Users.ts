import * as SQLite from 'expo-sqlite';
import { IUser } from '../Utils/Interfaces';
const TableName: String = 'users';

const dropUserTable = async (db: any) => {
    //  DROP TABLE
    try{
        const query = `DROP TABLE ${TableName}`;
        await db.transaction((tx: SQLite.SQLTransaction) => {
            tx.executeSql(query);
        },
        (error: any) => {
            console.log('ERROR AT DROPPING USERS TABLE', error)
        },
        () => {
            console.log('USERS TABLE DROPPED')
        }
        )
    }catch(error) {
        console.log(error , "ERROR");
        throw Error('[ERROR] AT DROPPING USERS TABLE');
    }
};

const createUserTable = async (db: any) => {
    // CREATE TABLE IF DOES NOT EXIST
    try{
        const query = `CREATE TABLE IF NOT EXISTS ${TableName}(
            id TEXT NOT NULL,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            Username TEXT NOT NULL,
            Password TEXT NOT NULL,
            Email TEXT NOT NULL
        );`;
  
        await db.transaction((tx: SQLite.SQLTransaction) => {
            tx.executeSql(query);
        },
        (error: any) => {
            console.log('ERROR AT CREATING USERS TABLE', error)
        },
        () => {
            console.log('USERS TABLE CREATED')
        }
        )
    }catch(error) {
        console.log(error , "ERROR");
        throw Error('[ERROR] AT CREATING USERS TABLE');
    }
};

const saveUser = async (db: SQLite.Database, todoItem: IUser) => {
    const insertQuery =
      `INSERT INTO ${TableName} (id, FirstName, LastName, Username, Password, Email) values 
        (
            "${todoItem.Id}", 
            "${todoItem.FirstName}", 
            "${todoItem.LastName}", 
            "${todoItem.Username}", 
            "${todoItem.Password}",
            "${todoItem.Email}"
        )`    
    return db.transaction(tx => {
        tx.executeSql(insertQuery,
            [],
            (_, result) => console.log(result),
            (_, error) => {
                console.log(error)
                return false
            });
    })
};

const getUser = async (db: SQLite.Database, setData: Function) => {
    try{
        await db.transaction(tx =>{
            tx.executeSql(
                `SELECT * FROM ${TableName}`,
                [],
                (_, result) => setData(result.rows._array),
                (_, error) => {
                    console.log(error)
                    return false
                }
            )
        })
    } catch(error) {
        console.log(error, "error");
        return [];
    }
}

const truncateUserTable = async (db: SQLite.Database) => {
    try {
        await db.transaction(tx =>{
            tx.executeSql(
                `DELETE FROM ${TableName}`,
                [],
                (_, result) => console.log('USER TABLE TRUNCATED'),
                (_, error) => {
                    console.log(error)
                    return false
                }
            )
        })
    } catch (error) {
        console.log(error, "error");
        return [];
    }
}


export {
    createUserTable,
    dropUserTable,
    saveUser,
    getUser,
    truncateUserTable
}

