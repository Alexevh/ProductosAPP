import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect} from 'react';
import {useReducer} from 'react';
import casfeApi from '../api/CafeAPi';
import {LoginData, LoginResponse, RegisterData, Usuario} from '../interfaces/app-interfaces';
import {authReducer, AuthState} from './AuthReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (obj: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

// Staate inicial del authreducer
const AuthInitialState: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

//Creo el context de tipo authcontextprops
export const AuthContext = createContext({} as AuthContextProps);

//Creo el provider
export const AuthProvider = ({children}: any) => {

  //obtengo el reducer
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  // cuando cargo el contexto por primera vez checkeo el token
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('Token');
    if (!token) return dispatch({type: 'notAuthenticated'});
    //verifico el token contra e;l backend

    const resp = await casfeApi.get('/auth');

    // si nla respuesta no es 200 lo saco
    if (resp.status !=200){
      return  dispatch({type: 'notAuthenticated'});
    }
    // si llego aca esta pronto
    dispatch({
      type: 'signUp',
      payload: {token: resp.data.token, user: resp.data.usuario},
    });
  //guardo el token en el storage
  await AsyncStorage.setItem('Token', resp.data.token);


  };


  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await casfeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });

      //guardo el token en el storage
      await AsyncStorage.setItem('Token', resp.data.token);
    } catch (error) {
      console.log('me dio error',error);
      dispatch({type: 'addError', payload: error.response.data.msg || 'Wrong data'});
    }
  };

  const signUp = async ({nombre, correo, password} : RegisterData) => {

    try {
      const resp = await casfeApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });

      //guardo el token en el storage
      await AsyncStorage.setItem('Token', resp.data.token);
    } catch (error) {
      console.log('me dio error',error);
      dispatch({type: 'addError', payload: error.response.data.errors[0].msg || 'Wrong data'});
    }

  };

  const logOut = async () => {

    await AsyncStorage.removeItem('Token');
    dispatch({type: 'logOut'});

  };



  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  // Retorno el provider y defino en el value lo que retorno
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        logOut,
        removeError,
        ...state,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
