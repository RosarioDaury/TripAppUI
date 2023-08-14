import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
import {ScrollView, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { Styles } from './Styles';
import { GlobalStyles } from '../../GlobalStyls';
import { ILocation } from '../../Utils/Interfaces';
import * as Location from "expo-location";
import MapView, {Marker} from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { getPlaces } from '../../Data/Places';
import { useIsFocused } from '@react-navigation/native'

const db = SQLite.openDatabase('mydatabase.db');

const Profile: React.FC<any> = (props) => {
    const [User, setUser] = useState<any>({});
    const [Places, setPlaces] = useState<any>([]);
    const [coors, setCoors] = useState<ILocation>();
    const [Saved, setSaved] = useState<any>([])
    const isFocused = useIsFocused();

    useEffect(() => {
        const {User} = props.route.params;
        setUser(User[0]);
        GetCurrentLocation();
    }, []);

    useEffect(() => {
        if(isFocused){
            GetSavedPlaces();
        }
    }, [User, isFocused]);

    const GetSavedPlaces = async () => {
        await getPlaces(db, setPlaces, User.id);
    }

    const GetCurrentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let Loc = await Location.getCurrentPositionAsync({});
        setCoors({latitude: Loc.coords.latitude, longitude: Loc.coords.longitude,})
    }

    return(
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}}>

            <View >
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 40, width: '90%', alignSelf: 'center'}}>
                        <Text style={{fontSize: 18}}>Current Location</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: "#0077B6"}} />
                </View>
                {
                    coors 
                    ?
                        <MapView 
                            style={Styles.Map} 
                        >
                                <Marker coordinate={coors} />
                        </MapView>
                    :
                        <Feather name="loader" size={24} color="black" style={{alignSelf: 'center', marginTop: 20}}/>
                }
                <ScrollView style={GlobalStyles.Container} >
                    <View style={Styles.InfoContainer}>
                        <View style={Styles.InfoTitle}>
                            <Text style={{color: 'white', fontSize: 20}}> {User && `${User.FirstName} ${User.LastName} (${User.Username})`} </Text>
                        </View>
                        <Text style={{color: 'white', fontSize: 15}}>
                            {User && `${User.id}`}
                        </Text>    
                    </View>

                    <View style={Styles.MyPlaces}>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            <Text style={{fontSize: 18}}>My Saved Placed</Text>
                            <View style={{flex: 1, height: 1, backgroundColor: "#0077B6"}} />
                        </View>
                        

                        {
                            Places
                            ?
                                Places.map((el: any) => {
                                    return(
                                        <ImageBackground  source={{uri: String(el.image)}} imageStyle={{opacity:0.7}} key={el._id} style={{width: 'auto'}}>
                                                <TouchableOpacity  
                                                    style={Styles.CardPlace}
                                                    onPress={() => {
                                                    props.navigation.navigate('Place', 
                                                    {
                                                        Item: {
                                                            _id: el.id,
                                                            Name: el.name,
                                                            Description: el.description,
                                                            Image: el.image,
                                                            Rate: el.rate,
                                                            Location: {
                                                                Longitude: el.longitude,
                                                                Latitude: el.latitude,
                                                                Country: el.country,
                                                                City: el.city
                                                            }
                                                        }, 
                                                        User: props.route.params.UserID})
                                                    }}
                                                >
                                                    <Text  style={Styles.CardText}>{el.name}</Text>
                                                    <Text  style={Styles.CardText}>{`${el.rate}/10`}</Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                    )
                                })
                            :
                                null
                        }
                    </View>

                </ScrollView>
            </View>

        </ImageBackground>
    )
}

export default Profile;