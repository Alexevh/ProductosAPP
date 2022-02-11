import React from 'react';
import { Text, View } from 'react-native';

/* this is the main background of the register and login screen */
export const Background = ()=>{

    return (
        <View
            style={{
              
                position: 'absolute',
                top: -400,
                backgroundColor: '#a40606',
                width: 1000,
                height: 1200,
            
                
                transform: [
                    {rotate: '-70deg'}
                ],
               
            }}
        
        />
            
       
    )
}