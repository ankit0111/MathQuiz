import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DefaultButtons from './DefaultButtons'

const Footer2 = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.footer} >
                <View style={styles.firstCol} >
                    <DefaultButtons onPress={() => props.navigation.goBack()} showIcon="true" iconSize={25} iconColor="#fff" iconName="arrow-back-sharp" hideText="true" buttonTitle="Back" />
                </View>

                {/* <View style={styles.mainButton} >
                    <DefaultButtons onPress={props.mainButtonNavigate} buttonTitle="Start Quiz" />
                </View> */}

                <View style={styles.lastCol} >
                    <DefaultButtons onPress={() => props.navigation.navigate("CategoryScreen")} showIcon="true" iconSize={25} iconColor="#fff" iconName="caret-forward" hideText="true" buttonTitle="play" />
                </View>
            </View>
        </View>
    )
}

export default Footer2

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 50
    },
    firstCol: {
        // flex: 1,
        width: "20%",
        marginLeft: 30

    },
    mainButton: {
        marginHorizontal: 20,
        flex: 3,
    },
    lastCol: {
        // flex: 1,
        width: "20%",
        marginRight: 30,
        
    }
})