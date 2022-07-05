import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "https://backend-cafe-rn.herokuapp.com/api"

const casfeApi = axios.create({baseURL});


// cualquier peticion que gaha va a verificar mi storage y si tengo token se lo coloca
casfeApi.interceptors.request.use(

    async (config) =>{
        const token =  await AsyncStorage.getItem('Token');
        if (token){
            config.headers!['x-token'] = token;
        }
        return config;
    }
)


// Lo exporto aca y no arriba por que le voy a aplicar un middleware al cafeapi
export default casfeApi;