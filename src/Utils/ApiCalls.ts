import axios from 'axios';
import { ICredentials, IRegister, IPlace } from './Interfaces';

export class ApiCalls {
    LocalURL: string = 'http://192.168.0.107:3000';

    AuthUser(Credentials: ICredentials): Promise<any> {
        const {Username, Password} = Credentials
        const url = `${this.LocalURL}/User/Auth`;
        const body: any = {
            Username,
            Password
        }

        return new Promise((resolve, reject) => {
            axios.post(url, body)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
        
        // return new Promise((resolve, reject) => {
        //     fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: body
        //     })
        //     .then(response => response.json())
        //     .then(res => {
        //         resolve(res);
        //     })
        //     .catch(err => {
        //         reject(err);
        //     })
        // })   
    }

    CreateUser(NewUser: IRegister): Promise<any> {
        const { FirstName, LastName, Username, Password, Email} = NewUser;
        const body = {
            FirstName,
            LastName,
            Username, 
            Password,
            Email
        }
        const url = `${this.LocalURL}/User/Create`;

        return new Promise((resolve, reject) => {
            axios.post(url, body)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    GetPlaces(): Promise<any> {
        const url = `${this.LocalURL}/Places/GetAll`;

        return new Promise((resolve, reject) => {
            axios.get(url)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    GetFavorites(UserID: string): Promise<any> {
        const url = `${this.LocalURL}/User/Favorites/${UserID}`;

        return new Promise((resolve, reject) => {
            axios.get(url)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    GetFavoritesPlaces(IDs: string[]): Promise<any> {
        const url = `${this.LocalURL}/Places/GetAll`;
        return new Promise((resolve, reject) => {
            axios.post(url, {Places: IDs})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    AddToFavorites(Payload: any): Promise<any> {
        const url = `${this.LocalURL}/User/Favorites/Added`;

        return new Promise((resolve, reject) => {
            axios.post(url, Payload)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    RemoveFromFavorites(Payload: any): Promise<any> {
        const url = `${this.LocalURL}/User/Favorites/Remove`;
        
        return new Promise((resolve, reject) => {
            axios.post(url, Payload)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    AddPlace(Payload: any): Promise<any> {
        const url = `${this.LocalURL}/Places/Add`;
        
        
        return new Promise((resolve, reject) => {
            axios.post(url, Payload)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}