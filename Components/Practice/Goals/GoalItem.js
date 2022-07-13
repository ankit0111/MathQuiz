import React from 'react'
import { TouchableHighlight, View, Text, TouchableOpacity} from 'react-native'

const GoalItem = (props) => {
    return (
        <TouchableOpacity onPress={() => {props.onDelete(props.itemData.id)}} >
            <View><Text>{props.itemData.data}</Text></View> 
        </TouchableOpacity>
        
    )
}

export default GoalItem
