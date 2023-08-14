import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    Container: {
        height: '100%',
        gap: 10
    },
    Header: {
        width: '90%',
        marginTop: 25,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 20
    },
    HeaderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    OptionsItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        gap: 5,
        shadowColor: "#0077B6",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    Favorites: {
        width: '90%',
        marginTop: 25,
        alignSelf: 'center',
    },
    SectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    SectionTitleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0077B6'
    },
    CardPlace: {
        justifyContent: 'flex-end',
        width: '100%',
        minHeight: 100,
        padding: 5
    },
    CardText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    CardsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginTop: 15
    },
    Footer: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 50,
    },
    LogOut: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#c1121f',
        borderRadius: 10,  
    }
})
