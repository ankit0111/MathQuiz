import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native'

const TouchableComponent = (props) => {

    let TouchableButton = TouchableOpacity;

    if (Platform.OS == "android") {
        TouchableButton = TouchableNativeFeedback;
    }

    return (
        <TouchableButton {...props}>
           {props.children}     
        </TouchableButton>    
    )
}

export default TouchableComponent

const styles = StyleSheet.create({ });
