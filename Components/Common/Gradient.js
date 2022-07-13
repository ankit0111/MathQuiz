import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = (props) => {
    return (        
        <LinearGradient colors={['#FFC2FC', '#D84AD2', '#53004F']} style={props.style}>
            {props.children}
        </LinearGradient>
    )
}

export default Gradient

const styles = StyleSheet.create({})
