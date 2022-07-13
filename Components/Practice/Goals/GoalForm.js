import React from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';


const GoalForm = (props) => {

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.modalContainer} >
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Enter Your Goals" onChangeText={props.goalTextHandler.bind(this)} value={props.goalText} />
                    </View>    
                    <View style={styles.buttonContainer} >
                        <Button title="Add Goals"  onPress={props.goalAddHandler} />
                        <Button onPress={props.closeModal} title="Close Modal" />
                    </View>                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: "#eee",
        borderRadius: 10
    },
    closeModal: {
        margin: 20,
    },
    input: {
        padding: 5,
        borderColor: "#ccc",
        borderWidth: 1,          
    }, 
    inputContainer: {        
        width: "90%",
        marginBottom: 20    
    },
    buttonContainer: {        
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: "90%"
    }
})

export default GoalForm
