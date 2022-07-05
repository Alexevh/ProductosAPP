import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import { MainNavigator } from './src/navigators/Navigator';



// Creo este high order coponent para meter aca los states, o sea los contexts
const AppState = ({ children }: any ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MainNavigator />
      </AppState>
    </NavigationContainer>
  )
}


export default App;
