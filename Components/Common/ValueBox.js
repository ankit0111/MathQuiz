import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles as ds } from '../../styles/defaultStyles';
import DefaultButtons from './DefaultButtons';
import Gradient from './Gradient';
import { useSelector } from "react-redux";


export default function ValueBox() {
    const dataR = useSelector(state => state.settingsReducer.numbers);
    // console.log("ijijijijij", dataR);

    const [addMin, setAddMin] = useState(JSON.stringify(dataR.minAddNumber));
    const [addMax, setAddMax] = useState(JSON.stringify(dataR.maxAddNumber));

    const [subMin, setSubMin] = useState(JSON.stringify(dataR.minSubtractNumber));
    const [subMax, setSubMax] = useState(JSON.stringify(dataR.maxSubtractNumber));

    const [multyMin, setMultyMin] = useState(JSON.stringify(dataR.minMultiplyNumber));
    const [multyMax, setMultyMax] = useState(JSON.stringify(dataR.maxMultiplyNumber));

    const [divideMin, setDivideMin] = useState(JSON.stringify(dataR.minDivideNumber));
    const [divideMax, setDivideMax] = useState(JSON.stringify(dataR.maxDivideNumber));

    const [updateData, setUpdateData] = useState({});

    const updateHandle = () => {
        // setUpdateData({
        //     minAddNumber: addMin,
        //     maxAddNumber: addMax,
        //     minSubtractNumber: subMin,
        //     maxSubtractNumber: subMax,
        //     minMultiplyNumber: multyMin,
        //     maxMultiplyNumber: multyMax,
        //     minDivideNumber: divideMin,
        //     maxDivideNumber: divideMax
        // })
        // console.log("updatedData", updateData);
        console.log("555555555555555555+");
    }


    return (
        <View >

            <View style={styles.container}>
                <Gradient style={styles.box}>
                    <View style={styles.opration} >
                        <Text style={styles.oprationText}> MIN </Text>
                        <Text style={styles.oprationText}> MAX </Text>
                    </View>
                    <View style={styles.opration} >
                        <Text style={styles.oprationText}> ADD </Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={addMin}
                            onChangeText={newText => setAddMin(newText)}
                        />
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={addMax}
                            onChangeText={newText => setAddMax(newText)}

                        />
                    </View>
                    <View style={styles.opration} >
                        <Text style={styles.oprationText}> SUBTRACT </Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={subMin}
                            onChangeText={newText => setSubMin(newText)}
                        />
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={subMax}
                            onChangeText={newText => setSubMax(newText)}
                        />
                    </View>
                    <View style={styles.opration} >
                        <Text style={styles.oprationText}> Multiply </Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={multyMin}
                            onChangeText={newText => setMultyMin(newText)}
                        />
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={multyMax}
                            onChangeText={newText => setMultyMax(newText)}
                        />
                    </View>
                    <View style={styles.opration} >
                        <Text style={styles.oprationText}> Divide </Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={divideMin}
                            onChangeText={newText => setDivideMin(newText)}
                        />
                        <TextInput
                            style={styles.input}
                            // placeholder="?"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            maxLength={2}
                            defaultValue={divideMax}
                            onChangeText={newText => setDivideMax(newText)}
                        />
                    </View>
                </Gradient>
            </View>

            <View>
                <View style={styles.ButtonWrapper} >
                    
                    <View style={styles.saveButton} >
                        <DefaultButtons
                            style={styles.button}
                            onPress={updateHandle}
                            buttonTitle="save" />
                    </View>
                    <View style={styles.saveButton} >
                        <DefaultButtons style={styles.button} buttonTitle="reset" />
                    </View>
                </View>
            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8b008b",
        borderBottomColor: "black",
        marginLeft: 20,
        borderRadius: 5
    },
    heading: {
        flexDirection: 'column'
    },
    opration: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    oprationText: {
        fontSize: 20,
        fontFamily: 'cherry',
        color: "#fff",
        // justifyContent:'space-evenly'
    },
    input: {
        backgroundColor: "#3A0138",
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: "#fff",
        width: 75,
        borderRadius: 5,
        fontFamily: "cherry",
        fontSize: 25,
        textAlign: "center",
        margin: 5
    },
    ButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    saveButton: {
        width: "80%",
        margin: 30
    },
})