import React, {useEffect, useState, useRef} from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Button, Image, TouchableOpacityBase} from 'react-native';
import { GlobalStyles } from '../../GlobalStyls';
import { Styles } from './Styles';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Location from "expo-location";
import { ApiCalls } from '../../Utils/ApiCalls';
const servicios = new ApiCalls();
const CreateForm: React.FC<any> = () => {
    const [showCamera, setShowCamera] = useState<boolean>(false)
    const [Payload, setPayload] = useState<any>({Name: '', Description: '', Rate: '', Img: ''});
    const [Saving, setSaving] = useState<boolean>(false);
    const cameraRef = useRef<any>();

    const handleTextChange = (e: any, name: string) => {
        setPayload({...Payload, [name]: e})
    }

    const takePic = async () => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };
    
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        handleTextChange(newPhoto.uri, 'Img');
    };

    const handleCreate = async () => {
        setSaving(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let Loc = await Location.getCurrentPositionAsync({});
        let regionName = await Location.reverseGeocodeAsync({
            latitude: Loc.coords.latitude, longitude: Loc.coords.longitude
        });
        console.log(regionName);

        let payload = {
            "Name": Payload.Name, 
            "Description": Payload.Description, 
            "Image": Payload.Img, 
            "Rate": Payload.Rate, 
            "Longitude": Loc.coords.longitude, 
            "Latitude": Loc.coords.latitude, 
            "Country": regionName[0].country, 
            "City": regionName[0].city
        }
        servicios.AddPlace(payload)
        .then(res => {
            console.log(res);
            setSaving(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(showCamera){
        return (<Camera style={Styles.camera} ref={cameraRef}>
            {Payload.Img
                ? 
                    <View style={{...Styles.buttonContainer, flexDirection: 'column'}}>
                        <Image source={{uri:String(Payload.Img), width: 100,height: 150 }} style={Styles.buttonContainer}/>
                    </View>

                : null
            }

            <View style={Styles.buttonContainer}>
                <View style={Styles.buttonContainer}>
                    <Button title="Back" onPress={() => setShowCamera(false)} />
                </View>

                <TouchableOpacity
                    style={Styles.buttonContainer}
                    onPress={takePic}
                >
                    <MaterialIcons name="camera" size={50} color="white" />
                </TouchableOpacity>
            </View>
    
        </Camera>)
    }

    return(
        <ScrollView>
            <View style={GlobalStyles.Container}>
                <View style={Styles.Header}>
                    <Entypo name="basecamp" size={100} color='#0077B6' />
                    <Text style={Styles.Header.Text}>Save a new Location</Text>
                </View>

                <View style={Styles.Inputs}>
                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Name'
                            onChangeText={(e) => 
                                {
                                    handleTextChange(e, 'Name')
                                }}
                        />
                    </View>
                    
                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Description'
                            onChangeText={(e) => 
                                {
                                    handleTextChange(e, 'Description')
                                }}
                        />
                    </View>

                    <View style={GlobalStyles.ContainerInput}>
                        <TextInput
                            style={GlobalStyles.Input}
                            placeholder='Rate'
                            keyboardType='numeric'
                            onChangeText={(e) => 
                                {
                                    handleTextChange(e, 'Rate')
                                }}
                        />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, width: '80%'}}>
                        <Text>Image</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: "#0077B6"}} />
                    </View>

                    <TouchableOpacity
                        style={{padding: 10, backgroundColor: 'white', borderRadius: 10}}
                        onPress={async () => {
                            await Camera.requestCameraPermissionsAsync();
                            setShowCamera(true);
                        }}
                    >  
                        <Text>{Payload.Img ? 'Retake Picture' : ' Take Picture'}</Text>
                    </TouchableOpacity>

                </View>

                <View style={Styles.ButtonsContainer}>
                    <TouchableOpacity
                        style={Styles.SignUpButton}
                        onPress={handleCreate}
                    >
                        <Text style={GlobalStyles.TextButton}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
    )
}

export default CreateForm