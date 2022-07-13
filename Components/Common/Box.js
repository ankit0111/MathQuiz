import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Gradient from './Gradient'
import { defaultStyles as ds } from '../../styles/defaultStyles';
 
const Box = (props) => {


    return (
        <View style={props.style} >
            <Gradient style={ds.box}>
                {props.children}
            </Gradient>
        </View>

    )
}

export default Box

const styles = StyleSheet.create({
    
})
