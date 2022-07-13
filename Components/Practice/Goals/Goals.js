import React, {useState} from 'react'
import { View, Text, TextInput, Button, ScrollView, FlatList, Modal, StyleSheet } from 'react-native'
import GoalForm from './GoalForm';
import GoalItem from './GoalItem';

const Goals = () => {

    console.log("hello");

    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const goalTextHandler = (val) => {
        setGoalText(val);
    }

    const goalAddHandler = () => {
        console.log(goals);
        setGoals( prev => {
            return [...prev, { id: Math.random().toString(), data: goalText}]        
        });
        setModalOpen(false);
        setGoalText("");
    }

    const deleteItem = (goalId) =>{
        setGoals( prev => {
            return prev.filter((val) => goalId !== val.id);       
        });
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (        
        <View style={styles.wrapper}>        

            <Button title="Add Goals" onPress={openModal} />    
            <GoalForm goalAddHandler={goalAddHandler} goalTextHandler={goalTextHandler} visible={modalOpen} closeModal={closeModal} goalText={goalText}/>

            <FlatList
                //keyExtractor={(item, index) => { return index}}
                data={goals}
                renderItem={(itemData, index) => {
                    return <GoalItem itemData={itemData.item} onDelete={deleteItem} />
                }}
            />
            
            
        </View>    
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 50,        
    }
})

export default Goals
