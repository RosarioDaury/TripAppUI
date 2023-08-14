import React, {useEffect, useState} from 'react';
import {View, ScrollView, ImageBackground, TouchableOpacity, Text} from 'react-native';
import { ApiCalls } from '../../Utils/ApiCalls';
import { Styles } from './Styles';
import { GlobalStyles } from '../../GlobalStyls';

const apiCalls = new ApiCalls();

const Explore: React.FC<any> = ({navigation, route}) => {
    const [Data, setData] = useState<any>([]);
    useEffect(() => {
        apiCalls.GetPlaces()
        .then(res => {
            setData(res.data.Data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return(
        <ImageBackground  source={{uri: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}} imageStyle={{opacity:0.7}}>
            <View style={{height: '100%'}}>
                <ScrollView>
                    {
                        Data 
                        ?
                            Data.map((el: any) => {
                                return(
                                    <ImageBackground  source={{uri: el.Image}} imageStyle={{opacity:0.7}} key={el._id} style={{width: 'auto'}}>
                                        <TouchableOpacity  
                                            style={Styles.CardPlace}
                                            onPress={() => {
                                                navigation.navigate('Place', {Item: el, User: route.params.UserID})
                                            }}
                                        >
                                            <Text  style={Styles.CardText}>{el.Name}</Text>
                                            <Text  style={Styles.CardText}>{`${el.Rate}/10`}</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )
                            })
                        :
                        null
                        
                    }
                </ScrollView>  
            </View>
             
        </ImageBackground>
                 
    )
}

export default Explore;