import React, {useState, useEffect} from 'react';
import { GlobalStyles } from '../../GlobalStyls';
import { View, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Styles } from './Styles';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { ApiCalls } from '../../Utils/ApiCalls';
import { savePlace, GetPlaceById, RemovePlaceById } from '../../Data/Places';
import { IPlace } from '../../Utils/Interfaces';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const services = new ApiCalls();

const Place: React.FC<any> = (props) => {
    const [data, setData] = useState<any>({});
    const [IsFavorite, setIsFavorite] = useState<boolean>(false);
    const [isInMyList, setIsInMyList] = useState<boolean>(false);
    const [Favorites, setFavorites] = useState<any>([]);
    const [MyList, setMyList] = useState<any>([])

    useEffect(() => {
        const {User, Item} = props.route.params;
        setData(Item);
        GetUserFavorites();
        hadleIsInMyList();
    }, [])

    useEffect(() => {
        const {Item} = props.route.params;
        Favorites.includes(Item._id) ? setIsFavorite(true) : setIsFavorite(false)
    }, [Favorites]);

    useEffect(() => {
        MyList.length > 0 ? setIsInMyList(true) : setIsInMyList(false) 
    }, [MyList]);

    const hadleIsInMyList = async () => {
        const {Item} = props.route.params;
        await GetPlaceById(db, setMyList, Item._id);
    }


    const GetUserFavorites = () => {
        const {User} = props.route.params;
        services.GetFavorites(User)
        .then(res => {
            console.log(res);
            setFavorites(res.Favorites)
        })
        .catch(err => {
            console.log(err);
            setFavorites([])
        })
    }

    const AddToFavorites = () => {
        const {User, Item} = props.route.params;
        let Payload = {
            UserID: User,
            PlaceID: Item._id
        }

        console.log(Payload)
        if(IsFavorite){
            services.RemoveFromFavorites(Payload)
            .then(res => {
                console.log("REMOVED")
                GetUserFavorites();
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            services.AddToFavorites(Payload)
            .then(res => {
                GetUserFavorites();
            })
            .catch(err => {
                console.log(err);
            })
        } 
    }

    const AddToMyList = async () => {
        const {User, Item} = props.route.params;
        const {Description, Image, Name, _id, Location, Rate} = data;
        const {Longitude, Latitude, Country, City} = Location;

        if(isInMyList){
            RemovePlaceById(db, _id);
        } else {
            let ToAdd: IPlace = {
                id: _id,
                userid: User,
                name: Name,
                image: Image,
                description: Description,
                rate: Rate,
                longitude: Longitude,
                latitude: Latitude,
                country: Country,
                city: City
            }
    
            await savePlace(db, ToAdd);
        }

        
        hadleIsInMyList();
    }

    return(
        <ImageBackground  source={{uri: data.Image}} imageStyle={{opacity:0.7}}>
                <View style={Styles.ButtonsContainer}>
                    <TouchableOpacity
                        style={Styles.Button}
                        onPress={AddToFavorites}
                    >
                        {
                            IsFavorite
                            ?
                                <FontAwesome name="remove" size={24} color="black" />
                            :
                                <MaterialIcons name="favorite" size={24} color="black" />
                        }
                        <Text style={{fontWeight: 'bold'}}>{IsFavorite ?'Remove from Favorites' :'Add To Favorites'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles.Button}
                        onPress={AddToMyList}
                    >
                        {
                            isInMyList
                            ?
                                <FontAwesome name="remove" size={24} color="black" />
                            :
                                <Entypo name="add-to-list" size={24} color="black" />
                        }
                        <Text style={{fontWeight: 'bold'}}>{isInMyList ?'Remove from My List' :'Add To My List'}</Text>
                    </TouchableOpacity>
                </View>

            <ScrollView style={GlobalStyles.Container}>
                <View style={Styles.InfoContainer}>
                    <View style={Styles.InfoTitle}>
                        <Text style={{color: 'white', fontSize: 20}}> {data && data.Name} </Text>
                    </View>

                    <Text style={{color: 'white', fontSize: 15}}>
                        {data && data.Description}
                    </Text>

                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: 'white', fontSize: 15}}>
                            {data && data.Location ? data.Location.Country : ''}, {data && data.Location ? data.Location.City :''}
                        </Text>
                        <Text style={{color: 'white', fontSize: 15}}>
                            { data && data.Rate}/10
                        </Text>
                    </View>
  
                </View>

                <View style={{marginTop: 20}}>
                    {
                        data && data.Location
                        ?
                            <MapView 
                                style={Styles.Map} 
                            >
                                <Marker coordinate={{latitude: data.Location.Latitude, longitude: data.Location.Longitude}} />
                            </MapView>
                        :
                            null
                    }
                </View>

                
            </ScrollView>

        </ImageBackground>

    )
}

export default Place;