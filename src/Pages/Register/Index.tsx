import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { GlobalStyles } from '../../GlobalStyls';
import { Styles } from './Styles';
import { IRegister } from '../../Utils/Interfaces';
import { ApiCalls } from '../../Utils/ApiCalls';

const apiCalls = new ApiCalls();

const RegisterForm: React.FC<any> = ({navigation}) => {
    const [Payload, setPayload] = useState<IRegister>({
        FirstName: '',
        LastName: '',
        Username: '',
        Password: '',
        ConfirmPassword: '',
        Email: ''
    });

    const handleTextChange = (e: string, name: string) => {
        setPayload({...Payload, [name]: e})
    }

    const handleSignUp = () => {
        const {Password, ConfirmPassword} = Payload;
        if(Password != ConfirmPassword){
            Alert.alert('Passwords do not match!!')
            return;
        }
        
        apiCalls.CreateUser(Payload)
        .then(res => {
            Alert.alert('New User Created', '', [
                {text: 'Continue', onPress: () => navigation.navigate("Login")},
            ])
        })
        .catch(err => {
            console.log(err);
        })
    }

    const FormIsFilled = () => {
        const {FirstName, LastName, Username, Password, ConfirmPassword, Email} = Payload;
        if(!FirstName || !LastName || !Username || !Password || !ConfirmPassword || !Email){
            return false
        }
        return true
    }

    return(
        <ScrollView>
            <View style={GlobalStyles.Container}>
                <View style={Styles.Header}>
                    <Entypo name="basecamp" size={100} color='#0077B6' />
                    <Text style={Styles.Header.Text}>Create Your Account</Text>
                </View>

                <View style={Styles.Inputs}>
                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='First Name'
                            onChangeText={(e) => {
                                handleTextChange(e, 'FirstName')
                            }}
                        />
                    </View>
                    
                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Last Name'
                            onChangeText={(e) => {
                                handleTextChange(e, 'LastName')
                            }}
                        />
                    </View>

                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={(e) => {
                                handleTextChange(e, 'Email')
                            }}
                        />
                    </View>

                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Username'
                            onChangeText={(e) => {
                                handleTextChange(e, 'Username')
                            }}
                        />
                    </View>

                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(e) => {
                                handleTextChange(e, 'Password')
                            }}
                        />
                    </View>

                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            onChangeText={(e) => {
                                handleTextChange(e, 'ConfirmPassword')
                            }}
                        />
                    </View>
                </View>

                <View style={Styles.ButtonsContainer}>
                    <TouchableOpacity
                        style={Styles.SignUpButton}
                        disabled = {!FormIsFilled()}
                        onPress={handleSignUp}
                    >
                        <Text style={GlobalStyles.TextButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
    )
}


export default RegisterForm;