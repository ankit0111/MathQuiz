import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'


import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton  from '../../Components/General/CustomHeaderButton'

const Favorites = (props) => {

    const data = useRef();
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);

    const updateData = useCallback(() => {
       data.current = {
            option1: option1,
            option2: option2
        };

        console.log(data.current);
    }, [option1, option2]);

    useEffect(() => {
       props.navigation.setParams({updateData: updateData})     
    }, [updateData])
 
    return (
        <View>
            <Text>Favorate Screen</Text>
            <Switch value={option1} onValueChange={() => setOption1(!option1)} />
            <Switch value={option2} onValueChange={() => setOption2(!option2)} />
        </View>
    )
}

Favorites.navigationOptions = (navData) => {
    return {
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item iconName="ios-menu" iconSize={25} onPress={() => {
                console.log(navData);
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item iconName="ios-save" iconSize={25} onPress={() => {
                console.log(navData);
                navData.navigation.getParam("updateData")();
            }} />
        </HeaderButtons>),
    } 
}

export default Favorites

const styles = StyleSheet.create({})
