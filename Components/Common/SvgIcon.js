import React from 'react'
import { View, Platform } from 'react-native'

const SvgIcon = (props) => {    

    return (
        <View style={props.style}>
            { (Platform.OS !== "web") && props.children }
        </View>        
    )
}

export default SvgIcon

