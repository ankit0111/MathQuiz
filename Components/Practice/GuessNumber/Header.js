import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Header = () => {
    return (
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Guess the number</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    header: {        
        alignItems: "center",
        justifyContent: "center",        
        backgroundColor: "red",        
        paddingTop: 40,
        height: 90,
        
    }, 
    headerTitle: {
        fontSize: 18,
        color: "#000"
    }
})


export default Header;