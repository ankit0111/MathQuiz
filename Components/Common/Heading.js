import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { defaultStyles as ds } from '../../styles/defaultStyles'

const Heading = (props) => {
    return (
        <View style={styles.heading}>
            <View style={ds.center}>
                <Text style={ds.headingText}>{props.heading}</Text>
            </View>
        </View>

    )
}

export default Heading

const styles = StyleSheet.create({
    heading: {
       marginTop: 50
    }

})

