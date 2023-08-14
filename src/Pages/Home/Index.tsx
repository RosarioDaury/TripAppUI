import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { getUser, truncateUserTable } from '../../Data/Users';
import { Styles } from './Styles';
import { GlobalStyles } from '../../GlobalStyls';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { ApiCalls } from '../../Utils/ApiCalls';
import { useIsFocused } from '@react-navigation/native'
const services = new ApiCalls();
const db = SQLite.openDatabase('mydatabase.db');

const Home: React.FC<any> = ({navigation, reloadUser}) => {
    const [User, setUser] = useState<any>([]);
    const [Favorites, setFavorites] = useState<any>([]);
    const [UserID, setUserID] = useState<any>([]);
    const [Recommendations, setRecomendations] = useState<any>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getUser(db, setUser);
        services.GetPlaces()
        .then(res => {
            setRecomendations(res.data.Data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if(User[0]){
            services.GetFavorites(User[0].id)
            .then(res => {
                setUserID(User[0].id);
                services.GetFavoritesPlaces(res.Favorites)
                .then(res => {
                    setFavorites(res.Data)
                })
                .catch(err => {
                    console.log(err)
                    setFavorites([])
                })
            })
            .catch(err => {
                console.log(err);
                setFavorites([]);
            })
        }
    }, [User, isFocused])

    const handleLogout = async () => {
        await truncateUserTable(db);
        navigation.navigate('Login');
    }

    

    return(
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}}>

            <ScrollView style={Styles.Container}>

                <View style={Styles.Header}>

                    <TouchableOpacity 
                        style={Styles.OptionsItem}
                        onPress={() => navigation.navigate('Explore', {UserID: UserID})}
                    >  
                        <Entypo name="location-pin" size={25} color="#0077B6" />
                        <Text>Explore Places</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={Styles.OptionsItem}
                        onPress={() => navigation.navigate('Profile', {User: User})}
                    >  
                        <FontAwesome name="user-circle" size={25} color="#0077B6" />
                        <Text>My Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={Styles.OptionsItem}
                        onPress={() => navigation.navigate('New', {User: User})}
                    >  
                        <FontAwesome name="user-circle" size={25} color="#0077B6" />
                        <Text>Create New Location</Text>
                    </TouchableOpacity>
                </View>

                <View style={Styles.Favorites}>
                    <View style={Styles.SectionTitle}>
                        <Text style={Styles.SectionTitleText}>My Favorites Places</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: "#0077B6"}} />
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Favorites', {Places: Favorites, UserID: UserID})
                            }}
                        >
                            <Text style={{textDecorationLine: 'underline'}}> See All </Text>
                        </Pressable>
                    </View>
                    <View style={{gap: 10, marginTop: 10 }}>
                        {
                            Favorites.length > 0 
                            ?
                                Favorites.map((el: any, index: number)=> {
                                    if(index > 1){
                                        return
                                    }
                                    return (
                                        <ImageBackground  source={{uri: el.Image}} imageStyle={{opacity:0.7}} key={el._id}>
                                            <TouchableOpacity 
                                                style={Styles.CardPlace}
                                                onPress={() => {
                                                    navigation.navigate('Place', {Item: el, User: UserID})
                                                }}
                                            >
                                                <Text  style={Styles.CardText}>{el.Name}</Text>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                })
                            :
                                <Text>Not Favorites</Text>
                        }
                    </View>
                </View>

                <View style={Styles.Favorites}>
                    <View style={Styles.SectionTitle}>
                        <Text style={Styles.SectionTitleText}>Recommendations</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: "#0077B6"}} />
                        <Pressable onPress={() => navigation.navigate('Explore', {UserID: UserID})} ><Text style={{textDecorationLine: 'underline'}}> See All </Text></Pressable>
                    </View>
                        {
                            Recommendations
                            ?
                            <View style={Styles.CardsContainer}>
                                {
                                    Recommendations.slice(0, 2).map((el: any) => {
                                        return(
                                            <ImageBackground  source={{uri: el.Image}} imageStyle={{opacity:0.7}} key={el._id}>
                                                <TouchableOpacity 
                                                    style={Styles.CardPlace}
                                                    onPress={() => {
                                                        navigation.navigate('Place', {Item: el, User: UserID})
                                                    }}
                                                >
                                                    <Text style={Styles.CardText}>{el.Name}</Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        )
                                    })
                                }
                            </View>

                            :
                                null
                        } 

                    {
                        Recommendations
                        ?
                        <View>

                            {
                                Recommendations.slice(2, 3).map((el: any) => {
                                    return(
                                            <ImageBackground source={{uri: el.Image}} imageStyle={{opacity:0.7}} key={el._id}>
                                                <TouchableOpacity 
                                                    style={Styles.CardPlace}
                                                    onPress={() => {
                                                        navigation.navigate('Place', {Item: el, User: UserID})
                                                    }}
                                                >
                                                    <Text style={Styles.CardText}>{el.Name}</Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                    )
                                })
                            }
                        </View>
                        
                            
                        :
                            null
                    }
                </View>

                <View style={Styles.Footer}>
                    <TouchableOpacity style={Styles.LogOut}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out" size={28} color='white' />
                        <Text style={GlobalStyles.WhiteLetter}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </ ImageBackground>
    )
}

export default Home;