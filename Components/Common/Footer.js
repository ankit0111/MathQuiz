import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DefaultButtons from './DefaultButtons'


const Footer = (props) => {
    return (
        <View style={{flex: 1, justifyContent: "flex-end"}}>
            <View style={styles.footer} >
                <View style={styles.firstCol} >
                    <DefaultButtons onPress={() => props.navigation.goBack()} showIcon="true" iconSize={25} iconColor="#fff" iconName="arrow-back-sharp" hideText="true" buttonTitle="Back" />
                </View>

                <View style={styles.mainButton} >
                    <DefaultButtons onPress={props.mainButtonNavigate} buttonTitle="Start Quiz" />
                </View>

                <View style={styles.lastCol} >
                    <DefaultButtons onPress={() => props.navigation.navigate(props.lastColNavigate.toString())} showIcon="true" iconSize={25} iconColor="#fff" iconName="ios-settings-sharp" hideText="true" buttonTitle="Settings" />
                </View>
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 50
    },
    firstCol: {
        flex: 1,

    },
    mainButton: {
        marginHorizontal: 20,
        flex: 3,
    },
    lastCol: {
        // width: "20%",
        flex: 1,
    }
})
