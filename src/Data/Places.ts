import * as SQLite from 'expo-sqlite';
import { IPlace } from '../Utils/Interfaces';
const TableName: String = 'places';

const dropPlacesTable = async (db: any) => {
    //  DROP TABLE
    try{
        const query = `DROP TABLE ${TableName}`;
        await db.transaction((tx: SQLite.SQLTransaction) => {
            tx.executeSql(query);
        },
        (error: any) => {
            console.log('ERROR AT DROPPING PALCES TABLE', error)
        },
        () => {
            console.log('PLACES TABLE DROPPED')
        }
        )
    }catch(error) {
        console.log(error , "ERROR");
        throw Error('[ERROR] AT DROPPING PLACES TABLE');
    }
};

const createPlacesTable = async (db: any) => {
    // CREATE TABLE IF DOES NOT EXIST
    try{
        const query = `CREATE TABLE IF NOT EXISTS ${TableName}(
            id TEXT NOT NULL,
            userid TEXT NOT NULL,
            name TEXT NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            rate NUMBERIC NOT NULL,
            longitude DECIMAL NOT NULL,
            latitude DECIMAL NOT NULL,
            country TEXT NOT NULL,
            city TEXT NOT NULL
        );`;
  
        await db.transaction((tx: SQLite.SQLTransaction) => {
            tx.executeSql(query);
        },
        (error: any) => {
            console.log('ERROR AT CREATING PLACES TABLE', error)
        },
        () => {
            console.log('PLACES TABLE CREATED')
        }
        )
    }catch(error) {
        console.log(error , "ERROR");
        throw Error('[ERROR] AT CREATING PLACES TABLE');
    }
};

const savePlace = async (db: SQLite.Database, Item: IPlace) => {
    const insertQuery =
      `INSERT INTO ${TableName} (id, userid, name, image, description, rate, longitude, latitude, country, city) values 
        (
            "${Item.id}", 
            "${Item.userid}", 
            "${Item.name}", 
            "${Item.image}", 
            "${Item.description}", 
            "${Item.rate}",
            "${Item.longitude}",
            "${Item.latitude}",
            "${Item.country}",
            "${Item.city}"
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

const getPlaces = async (db: SQLite.Database, setData: Function, UserID: string) => {
    try{
        await db.transaction(tx =>{
            tx.executeSql(
                `SELECT * FROM ${TableName} WHERE USERID='${UserID}'`,
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

const GetPlaceById = async (db: SQLite.Database, setData: Function, id: string) => {
    try{
        await db.transaction(tx =>{
            tx.executeSql(
                `SELECT * FROM ${TableName} WHERE ID='${id}'`,
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


const RemovePlaceById = async (db: SQLite.Database, id: string) => {
    try{
        await db.transaction(tx =>{
            tx.executeSql(
                `DELETE FROM ${TableName} WHERE ID='${id}'`,
                [],
                (_, result) => result.rows._array,
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


const truncatePlacesTable = async (db: SQLite.Database) => {
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
    dropPlacesTable,
    createPlacesTable,
    savePlace,
    getPlaces,
    truncatePlacesTable,
    GetPlaceById,
    RemovePlaceById
}