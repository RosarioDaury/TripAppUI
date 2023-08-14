import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    Header: {
        alignItems: 'center',
        gap: 10,
        Text: {
            fontSize: 20,
        }
    },
    Inputs: {
        gap: 20,
        alignItems: 'center',
        width: '100%',
    },
    ButtonsContainer: {
        gap: 15,
        alignItems: 'center',
        width: '100%',
    },
    SignUpButton: {
        padding: 10,
        backgroundColor: '#0077B6',
        width: '65%',
        borderRadius: 10,
        shadowColor: "#0077B6",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 90
    },
})