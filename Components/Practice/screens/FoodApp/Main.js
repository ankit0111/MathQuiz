import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage'


import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton  from '../../../General/CustomHeaderButton'

const Main = (props) => {
    return (
        <View>
            <Text style={styles.container}>Welcome to APP</Text>
            <Icon name="ios-home" size={25} color="white"/>
            <Button title="Enter App" onPress={() => props.navigation.navigate("CategoriesScreen")} />
        </View>
    )
}

Main.navigationOptions = (navData) => {
    return {
        headerTitle: "Main Screen",
    headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
        <Item iconName="ios-menu" iconSize={25} onPress={() => {
            console.log(navData);
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>)
    }
    
}

export default Main

const styles = StyleSheet.create({

    container: {
        fontFamily: "roboto-bold"
    }

})
