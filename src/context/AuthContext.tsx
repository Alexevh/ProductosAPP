import React ,{ createContext } from "react";
import { useReducer } from "react";
import casfeApi from "../api/CafeAPi";
import { LoginData, LoginResponse, Usuario } from "../interfaces/app-interfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ()=> void;
    signIn: (loginData: LoginData)=> void;
    logOut: ()=> void;
    removeError: ()=> void;

}

const AuthInitialState:  AuthState ={
    errorMessage: '',
  token: null,
  user: null,
  status: 'checking'
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) =>{

    const [state, dispatch] = useReducer(authReducer, AuthInitialState)

    const signIn = async ({correo, password}: LoginData)=> {

        try {

            const resp = await casfeApi.post<LoginResponse>('/auth/login', {correo, password});
            dispatch({type: 'signUp', payload: {token: resp.data.token, user: resp.data.usuario}});
            
        } catch (error) {
            console.log(error)
        }
    };


    const signUp = ()=> {};
    
    const logOut = ()=> {};
    const removeError = ()=> {};

    return(
        <AuthContext.Provider
        
        value={{
            signIn,
            signUp,
            logOut,
            removeError,
            ...state
        }}
        
        >
            {children}
        </AuthContext.Provider>
    )
}