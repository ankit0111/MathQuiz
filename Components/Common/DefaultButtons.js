import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Platform, TouchableOpacity, TouchableNativeFeedback, DevSettings } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


import TouchableComponent from './TouchableComponent';
import { defaultStyles as ds } from '../../styles/defaultStyles';
import Gradient from './Gradient';


const DefaultButtons = (props) => {

    return (
        <View style={props.style}>
            <TouchableComponent activeOpacity={0.9} onPress={props.onPress} >
                <View style={styles.button}>
                    <Gradient style={styles.box}>
                        <View style={ds.center} >
                            {props.showIcon && <Icon style={{ width: props.iconSize }} size={props.iconSize} color={props.iconColor} name={props.iconName} />}
                            {!props.hideText && <Text style={ds.buttonText}>{props.buttonTitle}</Text>}
                        </View>
                    </Gradient>
                </View>
            </TouchableComponent>
        </View>

    )
}

export default DefaultButtons

const styles = StyleSheet.create({
    button: {
        shadowColor: "purple",
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 2},
        elevation: 5
    },
    box: {
        width: '100%',
        minHeight: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20        
    },
    // buttonImage: {        
    //     resizeMode: 'cover',
    //     width: '100%',
    //     paddingVertical: 10,        
    // },
    
})


//<ImageBackground style={styles.buttonImage} source={require('../../assets/images/buttonBackground.png')} >