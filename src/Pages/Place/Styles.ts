import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    InfoContainer: {
        width: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        alignItems: 'center',  
        padding: 15,
        borderRadius: 5,
        gap: 15
    },
    InfoTitle: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    Map: {
        width: '100%',
        height: '100%',
    },
    ButtonsContainer: {
        marginTop: 30,
        marginBottom: 30,
        gap: 10,
        width: '90%',
        alignSelf: 'center'
    },
    Button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 13,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});