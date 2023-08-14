import React, {useEffect, useState} from 'react';
import { View, ImageBackground, TouchableOpacity, Text, ScrollView} from 'react-native'
import { Styles } from '../Explore/Styles';

const FavoritesList: React.FC<any> = (props) => {
    const [Data, setData] = useState<any>([])

    useEffect(() => {
        const {Places} = props.route.params;
        setData(Places);
    }, []);
    
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
                                                props.navigation.navigate('Place', {Item: el, User: props.route.params.UserID})
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

export default FavoritesList;