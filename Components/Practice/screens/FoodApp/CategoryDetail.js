import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/General/CustomHeaderButton'


const CategoryDetail = (props) => {

    let catData = props.navigation.getParam("data");

    return (
        <View>
            <Text>Category ID: {catData.id}</Text>
            <Text>Category Name : {catData.name}</Text>
            <Text>Category Description : {catData.desc}</Text>
        </View>
    )
}

CategoryDetail.navigationOptions = (props) => {
    let data = props.navigation.getParam("data")
    return {
        headerTitle: data.name + " #" + data.id,
        headerRight: () => { return (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Star" iconName="ios-star" onPress={() => console.log("star clicked")}/>            
        </HeaderButtons>     )}   
    }
} 

    


export default CategoryDetail

const styles = StyleSheet.create({})
