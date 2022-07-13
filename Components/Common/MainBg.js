import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'

import { defaultStyles as ds } from '../../styles/defaultStyles';
import Heading from './Heading';

const MainBg = (props) => {

    let imagePath = require('../../assets/images/background-normal.jpg');
    if (props.background == "main") {
        imagePath = require('../../assets/images/background.jpg');
    }

    return (
        <View style={ds.container} >
            <ImageBackground style={styles.backgroundImage} source={imagePath} >
                <View style={{ ...ds.center, flex: 1 }} >
                    <View style={ds.appContainer} >
                        {props.heading && <Heading heading={props.heading} />}
                        {props.children}
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

export default MainBg

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%"
    },
})
