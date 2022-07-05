import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../Theme/LoginTheme';
import {AuthContext} from '../context/AuthContext'
interface Props extends StackScreenProps<any, any>{}


export const RegisterScreen = ({navigation}: Props)=>{


  const { signUp, errorMessage, removeError} = useContext(AuthContext);
  

/* Como este componente esta dentro del stacknaigator tengo en las props el navigator */


    const {email, password, name,form, onChange} = useForm({
        email: '',
        password: '',
        name: ''
    });

    const onRegister = ()=>{
        console.log('data', email);
        Keyboard.dismiss();
        signUp({
            nombre: name,
            password,
            correo: email
        });
       
    }

    useEffect(() => {
        if (errorMessage.length === 0) return;
    
        //alert(errorMessage);
        //removeError();
        
        
          Alert.alert('Error', errorMessage, [
          {
            text: 'OK',
            onPress:removeError,
          },
        ]);
        
      }, [errorMessage]);

    return (
        <>
          < Background />

          <KeyboardAvoidingView
           
           style={{flex: 1}}
           behavior={(Platform.OS==='ios') ? 'padding' : 'height'}
          >

          <View style={{...loginStyles.formContainer}}>

          
          <WhiteLogo />
          <Text style={{...loginStyles.title}}>Register</Text>
          <Text style={{...loginStyles.label}}>Name:</Text>
          <TextInput
          onChangeText={(value) => onChange(value, 'name')}
          value={name}
            placeholder='Enter your name'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor='white'
            autoCapitalize='words'
            autoCorrect={false}
            style={[
                loginStyles.inputField,
                (Platform.OS==='ios') && loginStyles.inputFieldIos 
            ]}
            onSubmitEditing={onRegister}
            
            
          />
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
            onSubmitEditing={onRegister}
            
          />


          <Text style={{...loginStyles.label}}>Password:</Text>
          <TextInput
            placeholder='********'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor='white'
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            secureTextEntry={true}
            style={[
                loginStyles.inputField,
                (Platform.OS==='ios') && loginStyles.inputFieldIos 
            ]}
            
          />

          <View style={{...loginStyles.buttonContainer}}>
              <TouchableOpacity activeOpacity={0.8}  style={{...loginStyles.button}} onPress={onRegister}>
                  <Text style={{...loginStyles.butonText}}>Register</Text>

              </TouchableOpacity>

          </View>
         
              <TouchableOpacity
              style={{...loginStyles.buttonReturn}}
              activeOpacity={0.8}
              onPress={()=>  navigation.replace('LoginScreen')}
              
              >
                  <Text style={{...loginStyles.butonText}}>Log in</Text>
                  </TouchableOpacity>
         
          </View>
          </KeyboardAvoidingView>
        </>
       
    )
}