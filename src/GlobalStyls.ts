import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    Container: {
        height: '100%',
        gap: 50,
        padding: 20,
    },
    ContainerInput: {
        width: '100%',
        alignItems: 'center',
        shadowColor: "#0077B6",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    Input: {
        borderBottomColor: '#0077B6',
        borderBottomWidth: 1,
        padding: 10,
        width: '70%'
    },
    TextButton: {
        color: 'white',
        textAlign: 'center'
    },
    WhiteLetter: {
        color: 'white'
    }
})