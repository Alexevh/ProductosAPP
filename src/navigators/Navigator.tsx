import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export const  MainNavigator = ()=> {


  const { status } = useContext( AuthContext );

  return (
    <Stack.Navigator
    
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
     {
       (status==='authenticated') ? (
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
       ) : (
         <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
         </>
       )
     }
         
          
       
     
    </Stack.Navigator>
  );
}