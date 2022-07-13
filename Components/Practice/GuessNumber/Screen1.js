import React from 'react'
import { RecyclerViewBackedScrollViewBase, StyleSheet, Text, TextInput, View } from 'react-native'

const Screen1 = () => {
    return (
        <View>
            <View style={styles.headingWrapper} >
                <Text style={styles.heading}>Start a new Game</Text>
            </View>

            <View style={styles.alignColumn}>
                <View style={styles.normalTextWrapper}>
                    <Text style={styles.normalText}>Enter the Number</Text>
                </View>
                <View style={styles.inputWrapper} >
                    <TextInput placeholder="Enter number" style={styles.input} />        
                </View>
                
            </View>    
            
        </View>
    )
}

export default Screen1

const styles = StyleSheet.create({
    headingWrapper: {
        alignItems: "center",
        paddingTop: 10
    },
    heading: {
        fontSize: 18,
        color: "#000",        
    },
    normalText: {
        fontSize: 12
    },
    input: {
        padding: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }, 
    alignColumn: {
        flexDirection: "row",
        justifyContent: "center",        
    },
    normalTextWrapper: {

    }

})
