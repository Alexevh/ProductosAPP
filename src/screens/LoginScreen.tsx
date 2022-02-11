import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Text, View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';


import { useForm } from '../hooks/useForm';
import { loginStyles } from '../Theme/LoginTheme';

interface Props extends StackScreenProps<any, any>{}

/* Como este componente esta dentro del stacknaigator tengo en las props el navigator */
export const LoginScreen = ({navigation}: Props)=>{


    const { signIn, errorMessage, removeError } = useContext( AuthContext );

    const {email, password, form, onChange} = useForm({
        email: '',
        password: ''
    });

    const onLogin = ()=>{
        console.log('data', email);
        signIn({correo: email, password})
        Keyboard.dismiss();
       
    }

    return (
        <>
          < Background />

          <KeyboardAvoidingView
           
           style={{flex: 1}}
           behavior={(Platform.OS==='ios') ? 'padding' : 'height'}
          >

          <View style={{...loginStyles.formContainer}}>

          
          <WhiteLogo />
          <Text style={{...loginStyles.title}}>Login</Text>
          <Text style={{...loginStyles.label}}>Email:</Text>
          <TextInput
          onChangeText={(value) => onChange(value, 'email')}
          value={email}
            placeholder='Enter your email'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType='email-address'
            underlineColorAndroid={'white'}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            style={[
                loginStyles.inputField,
                (Platform.OS==='ios') && loginStyles.inputFieldIos 
            ]}
            onSubmitEditing={onLogin}
            
          />


          <Text style={{...loginStyles.label}}>Password:</Text>
          <TextInput
            placeholder='********'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor='white'
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry={true}
            style={[
                loginStyles.inputField,
                (Platform.OS==='ios') && loginStyles.inputFieldIos 
            ]}
            
          />

          <View style={{...loginStyles.buttonContainer}}>
              <TouchableOpacity activeOpacity={0.8}  style={{...loginStyles.button}} onPress={onLogin}>
                  <Text style={{...loginStyles.butonText}}>Login</Text>

              </TouchableOpacity>

          </View>
          <View style={{...loginStyles.newUserContainer}} >
              <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>  navigation.replace('RegisterScreen')}
              
              >
                  <Text style={{...loginStyles.butonText}}>Crear cuenta</Text>
                  </TouchableOpacity>
          </View>
          </View>
          </KeyboardAvoidingView>
        </>
       
    )
}