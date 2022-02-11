import {StyleSheet} from 'react-native';


export const loginStyles = StyleSheet.create({

    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'

    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',

    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
    inputFieldIos:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {

        alignItems: 'center',
        marginTop: 50

    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    butonText:{
        color: 'white',
        fontSize: 18
    },
    newUserContainer:{
        alignItems: 'flex-end',
        marginTop: 50
    },
    formContainer:{
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50

    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20
    }

})