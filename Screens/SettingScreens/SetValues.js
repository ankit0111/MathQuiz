import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MainBg from '../../Components/Common/MainBg'
import Footer2 from '../../Components/Common/Footer2'
import DefaultButtons from '../../Components/Common/DefaultButtons'
import Gradient from '../../Components/Common/Gradient'
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from '../../redux/settings/settingReducer'
import * as SQLite from "expo-sqlite";


function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
}
const db = openDatabase();

const SetValues = (props) => {

    const dispatch = useDispatch();
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

    const updateRef = useRef({});

    const updateValues = () => {
        updateRef.current = {
            minAddNumber: addMin,
            maxAddNumber: addMax,
            minSubtractNumber: subMin,
            maxSubtractNumber: subMax,
            minMultiplyNumber: multyMin,
            maxMultiplyNumber: multyMax,
            minDivideNumber: divideMin,
            maxDivideNumber: divideMax
        };
        let updatesVal = updateRef.current;
        dispatch(settingsActions.settingData(updateRef.current));
        const upValKeys = Object.keys(updatesVal);
        const upValValues = Object.values(updatesVal);
        db.transaction((tx) => {
            //  console.log("update", upValKeys);
            for (let p = 0; p < upValKeys.length; p++) {
                // console.log('keyval', upValKeys[p]+ '  - '+upValValues[p] )
                tx.executeSql('UPDATE settings set value=? WHERE name=?',
                    [upValValues[p], upValKeys[p]], (_, { rows }) => {
                        //1 console.log("update",rows._array);
                    })
            }
        });
        props.navigation.goBack()
    }

    return (
        <MainBg heading='SET VALUES'>
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
                                value={addMin}
                                editable
                                onChangeText={newText => setAddMin(newText)}
                            />
                            <TextInput
                                style={styles.input}
                                // placeholder="?"
                                placeholderTextColor="#fff"
                                keyboardType="numeric"
                                maxLength={2}
                                value={addMax}
                                editable
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
                                value={subMin}
                                editable
                                onChangeText={newText => setSubMin(newText)}
                            />
                            <TextInput
                                style={styles.input}
                                // placeholder="?"
                                placeholderTextColor="#fff"
                                keyboardType="numeric"
                                maxLength={2}
                                value={subMax}
                                editable
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
                                value={multyMin}
                                editable
                                onChangeText={newText => setMultyMin(newText)}
                            />
                            <TextInput
                                style={styles.input}
                                // placeholder="?"
                                placeholderTextColor="#fff"
                                keyboardType="numeric"
                                maxLength={2}
                                value={multyMax}
                                editable
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
                                value={divideMin}
                                editable
                                onChangeText={newText => setDivideMin(newText)}
                            />
                            <TextInput
                                style={styles.input}
                                // placeholder="?"
                                placeholderTextColor="#fff"
                                keyboardType="numeric"
                                maxLength={2}
                                value={divideMax}
                                editable
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
                                onPress={updateValues}
                                buttonTitle="save"
                            />
                        </View>
                        <View style={styles.saveButton} >
                            <DefaultButtons
                                style={styles.button}
                                buttonTitle="reset" />
                        </View>
                    </View>
                </View>

            </View>
            <Footer2 navigation={props.navigation} />
        </MainBg>
    )
}

export default SetValues

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
        // flex: 1,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    saveButton: {
        width: "60%",
        margin: 10
    },

})
