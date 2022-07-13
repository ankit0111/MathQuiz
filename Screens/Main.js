import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
// import Icon  from 'react-native-vector-icons/Ionicons'
// import AsyncStorage from '@react-native-async-storage/async-storage'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../Components/General/CustomHeaderButton'

import DefaultButtons from '../Components/Common/DefaultButtons'
import MainBg from '../Components/Common/MainBg'

const Main = (props) => {

    const buttonPress = () => {
        console.log("button pressed");
    }

    return (
        <MainBg background="main" >
            <View style={styles.logoWrapper} >
                <Image source={require("../assets/images/logo.png")} style={styles.logo} />
            </View>

            <View style={{ alignItems: "center" }} >
                <View style={{ width: "90%" }}>
                    <View style={styles.buttonWrapper} >
                        <DefaultButtons style={styles.button} onPress={() => props.navigation.navigate("CategoryScreen")} buttonTitle="Play" />
                        <DefaultButtons style={styles.button} onPress={() => props.navigation.navigate("SettingsScreen")} buttonTitle="Settings" />
                    </View>
                </View>
            </View>
        </MainBg>
    )
}

// Main.navigationOptions = (navData) => {
//     return {
//         headerTitle: "Main Screen",
//     headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
//         <Item iconName="ios-menu" iconSize={25} onPress={() => {
//             console.log(navData);
//             navData.navigation.toggleDrawer();
//         }} />
//     </HeaderButtons>)
//     }

// }

export default Main

const styles = StyleSheet.create({

    logoWrapper: {
        marginTop: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 300,
        height: 400,
        resizeMode: "contain"

    },
    buttonWrapper: {
        flexDirection: "row"
    },
    button: {
        flex: 1,
        marginHorizontal: 10,

    }


})
