import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import MainBg from '../../Components/Common/MainBg'
import { defaultStyles as ds } from '../../styles/defaultStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Gradient from '../../Components/Common/Gradient';
import { RadioButton } from 'react-native-paper';
import Footer2 from '../../Components/Common/Footer2';
import DefaultButtons from '../../Components/Common/DefaultButtons';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import { settingsActions } from "../../redux/settings/settingReducer";
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

const Timer = (props) => {
  const dispatch = useDispatch();
  const defaultTimer = useSelector(state => state.settingsReducer.timers);
  const [value, setValue] = useState(defaultTimer.questionTimer);
  console.log("value", value)

  const timerHandler = () => {
    db.transaction((tx) => {

      if (value === 0) {
        dispatch(settingsActions.showTimer(false));
        dispatch(settingsActions.updateTime(value));
        tx.executeSql('UPDATE settings set value= "false" WHERE name= "showQuestionTimer"')
        tx.executeSql('UPDATE settings set value=? WHERE name= "questionTimer"',
          [value], (_, { rows }) => {
            // console.log(rows,"555555")
          })
      } else {
        dispatch(settingsActions.showTimer(true));
        dispatch(settingsActions.updateTime(value));
        tx.executeSql('UPDATE settings set value= "false" WHERE name= "showQuestionTimer"')
        tx.executeSql('UPDATE settings set value=? WHERE name= "questionTimer"',
          [value], (_, { rows }) => {
            // console.log(rows,"666666")
          })
      }
    });
    props.navigation.goBack()
  }
  return (
    <MainBg heading="timer" >
      <View >
        <Text style={styles.subHeadingText} >select a suitable timer setting for your Question</Text>
      </View>

      <ScrollView >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}  >
          <View style={ds.container} >

            <View style={ds.padding20V} >
              <View style={ds.center} >
                <View style={styles.questionWrapper} >
                  <Gradient style={styles.box}>

                    <View  >
                      <Text style={styles.subHeadingText} >select a Timer</Text>
                    </View>

                    <View style={styles.question} >
                      <RadioButton.Group onValueChange={newValue => setValue(newValue)} checked value={value}>
                        <View>
                          <RadioButton style={styles.radioXX} value={0} />
                          <Text style={styles.radioText} >No Timmer</Text>
                        </View>
                        <View>
                          <RadioButton value={10} />
                          <Text style={styles.radioText}>10 Second</Text>
                        </View>
                        <View>
                          <RadioButton value={20} />
                          <Text style={styles.radioText}>20 Second</Text>
                        </View>
                        <View>
                          <RadioButton value={30} />
                          <Text style={styles.radioText}>30 Second</Text>
                        </View>
                      </RadioButton.Group>
                    </View>

                  </Gradient>
                </View>
              </View>
            </View>

            <View style={styles.ButtonWrapper} >
              <View style={styles.saveButton} >
                <DefaultButtons
                  style={styles.button}
                  onPress={timerHandler}
                  buttonTitle="save"
                />
              </View>
            </View>
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
      <Footer2 navigation={props.navigation} />
    </MainBg >
  )
}


export default Timer

const styles = StyleSheet.create({

  box: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center"
  },
  subHeadingText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "cherry"
  },
  questionWrapper: {
    // flex: 1,
    width: Dimensions.get("window").width > 800 ? 700 : "80%"
  },
  question: {
    paddingVertical: 20,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    justifyContent: 'center'
  },
  ButtonWrapper: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  saveButton: {
    width: "60%",
  },
  radioText: {
    position: "relative",
    top: -35,
    left: 40,
    fontSize: 33,
    textAlign: "center",
    color: "#fff",
    fontFamily: "cherry",
  },

})
