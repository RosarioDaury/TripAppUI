import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, TextInput, TouchableOpacity, Pressable, ImageBackground, ScrollView, Alert } from 'react-native';
import { Styles } from './Styles';
import { Entypo } from '@expo/vector-icons';
import { GlobalStyles } from '../../GlobalStyls'; 
import { ApiCalls } from '../../Utils/ApiCalls';
import { ICredentials, IUser } from '../../Utils/Interfaces';
import { createUserTable, saveUser, getUser } from '../../Data/Users';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native'

const apiCalls = new ApiCalls();
const db = SQLite.openDatabase('mydatabase.db');

const Login: React.FC<any> = ({navigation}) => {
    const [Credentials, setCredentials] = useState<ICredentials>({Username: '', Password: ''})
    const [User, setUser] = useState([])
    const isFocused = useIsFocused()

    const UserExist = useCallback(async () => {
        await getUser(db, setUser);
    }, []);

    useEffect(() => {
        setCredentials({Username: '', Password: ''})
        if(isFocused){
            UserExist();
        }
    }, [isFocused]);

    useEffect(() => {
        console.log(User)
        if(User.length > 0){
            console.log(User);
            navigation.navigate("Home")
        }
    }, [User])

    
    const onLogin = async () => {
        
        const {Username, Password} = Credentials;
        apiCalls.AuthUser(Credentials)
        .then(async (res) => {
            const {Auth, Message, User} = res;
            if(Auth){
                const {FirstName, LastName , Password, Username, _id, FavoritePlaces} = User;
                const UserAdd: IUser = {
                    Id: _id,
                    FirstName: FirstName,
                    LastName: LastName,
                    Username: Username,
                    Password: Password,
                    Email: "",
                    FavoritePlaces: FavoritePlaces
                }
                await saveUser(db, UserAdd);
                await UserExist();
                // navigation.navigate("Home")
            } else {
                Alert.alert(Message)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleTextChange = (e: string, name: string) => {
        setCredentials({...Credentials, [name]: e})
    }

    return(
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}}>
            <ScrollView style={{height: '100%'}}>
                <View style={GlobalStyles.Container}>
                    <View style={Styles.Header}>
                        <Entypo name="basecamp" size={100} color='#0077B6' />
                        <Text style={Styles.Header.Welcome}>Just a Trip</Text>
                        <Text>Login to your account</Text>
                    </View>

                    <View style={Styles.Inputs}>
                        <View style={GlobalStyles.ContainerInput}>
                            <TextInput
                                style={GlobalStyles.Input}
                                placeholder='Username'
                                onChangeText={(e) => handleTextChange(e, 'Username')}
                                value={Credentials.Username}
                            />
                        </View>
                        
                        <View style={GlobalStyles.ContainerInput}>
                            <TextInput
                                style={GlobalStyles.Input}
                                secureTextEntry={true}
                                placeholder='Password'
                                onChangeText={(e) => handleTextChange(e, 'Password')}
                                value={Credentials.Password}
                            />
                        </View>
                        
                    </View>

                    <View style={Styles.ButtonsContainer}>
                        <TouchableOpacity
                            style={Styles.LoginButton}
                            onPress={onLogin}
                            disabled={!Credentials.Username || !Credentials.Password}
                        >
                            <Text style={GlobalStyles.TextButton}> Log In </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.ForgotButton}
                            onPress={() => {
                                navigation.navigate("Register")
                            }}
                        >
                            <Text style={GlobalStyles.TextButton}> Sign Up </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.Header}>
                        <Text>Are you Lost?</Text>
                        <Pressable>
                            <Text style={Styles.CreateText}> Forgot Password </Text>
                        </Pressable>
                    </View>
                </View>
                

            </ScrollView>
        </ImageBackground>
        
    )
}

export default Login