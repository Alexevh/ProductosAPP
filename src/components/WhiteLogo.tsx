import React from 'react';
import { Text, View, Image } from 'react-native';

/* this is the main background of the register and login screen */
export const WhiteLogo = ()=>{

    return (
        <View
            style={{
              
              alignItems: 'center',
               
            }}
        
        >
            <Image
            
                source={require('../assets/react-logo-white.png')}
                style={{
                    width: 110,
                    height: 100
                }}
            />
            </View>
            
       
    )
}