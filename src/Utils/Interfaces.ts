interface ICredentials {
    Username: string,
    Password: string
}

interface IUser {
    Id: string,
    FirstName: string,
    LastName: string,
    Username: string,
    Password: string,
    Email: string,
    FavoritePlaces: string[]
}

interface IRegister {
    FirstName: string,
    LastName: string,
    Username: string,
    Password: string,
    ConfirmPassword: string,
    Email: string,
}

interface IPlace {
    id: string,
    userid: string,
    name: string,
    image: string,
    description: string,
    rate: number,
    longitude: number,
    latitude: number,
    country: string,
    city: string
}

interface ILocation {
    latitude: number,
    longitude: number
}

export {
    ICredentials,
    IUser,
    IRegister,
    IPlace,
    ILocation
}