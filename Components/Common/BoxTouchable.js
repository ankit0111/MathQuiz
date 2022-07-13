import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Gradient from './Gradient'
import TouchableComponent from './TouchableComponent'
import { defaultStyles as ds } from '../../styles/defaultStyles';


const BoxTouchable = (props) => {


    return (
        <View style={props.style} >
            <TouchableComponent onPress={props.onPress} style={{ overflow: "hidden" }}>
                <View >
                    <Gradient style={ds.box}>
                        {props.children}
                    </Gradient>
                </View>
            </TouchableComponent>
        </View>

    )
}

export default BoxTouchable

const styles = StyleSheet.create({
  
})
