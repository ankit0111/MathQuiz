import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

// import * as catData from '../../Components/FoodApp/Data/data.json'

let catData = require('../../Components/FoodApp/Data/data.json');

const Categories = (props) => {

    // console.log(catData);

    const categoryList = (itemData) => {
        console.log(itemData.item.id)
    }

    return (
        <FlatList numColumns="2" data={catData} renderItem={(itemData) => {
            return (
                <TouchableOpacity style={styles.grid} onPress={() => props.navigation.navigate({routeName: "CategoryDetailScreen", params: {data: itemData.item}}) }>
                    <Text style={styles.catTitle}>{itemData.item.name}</Text>
                </TouchableOpacity>
            )
        }}/>
    )
}

// Categories.navigationOptions = {
//     headerTitle: "Categories List"
// }

const styles = StyleSheet.create({
    grid: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        backgroundColor: "red",
        margin: 30
    },
    catTitle: {
        color: "#fff",
        fontWeight: "700",
        // fontFamily: 'roboto-bold'        
    }
})

export default Categories


