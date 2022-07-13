import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton  from '../../Components/General/CustomHeaderButton'

const About = () => {
    return (
        <View>
            <Text>About us page will come here</Text>
        </View>
    )
}

export default About

About.navigationOptions = (navData) => {
    return {
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item iconName="ios-menu" iconSize={25} onPress={() => {
                console.log(navData);
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>)
    } 
}

const styles = StyleSheet.create({})
