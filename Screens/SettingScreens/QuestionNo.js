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

const QuestionNo = (props) => {
  const dispatch = useDispatch();
  const defaultValues = useSelector(state => state.settingsReducer.quiz);
  const [value, setValue] = useState(defaultValues.quizQuestions);
  // console.log("defaultQUESNO333", defaultValues);

  const questionHandler = () => {

    db.transaction((tx) => {
      dispatch(settingsActions.noOfQuestions(value));
      // console.log("defaultQUESNO");   
      tx.executeSql('UPDATE settings set value=? WHERE name= "quizQuestions"',
        [value], (_, { rows }) => {
          // console.log(rows,"666666")
        })
    });
    props.navigation.goBack()
  }

  return (
    <MainBg heading='NO. OF QUESTION'>
      <View >
        <Text style={styles.subHeadingText} >SELECT THE SUITABLE NUMBERS OF QUESTIONS TO BE ASKED</Text>
      </View>

      <ScrollView >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}  >
          <View style={ds.container} >

            <View style={ds.padding20V} >
              <View style={ds.center} >
                <View style={styles.questionWrapper} >
                  <Gradient style={styles.box}>

                    <View>
                      <Text style={styles.subHeadingText} >SELECT A OPTION</Text>
                    </View>

                    <View style={styles.question} >
                      <RadioButton.Group onValueChange={newValue => setValue(newValue)}
                        value={value}

                      >
                        <View>
                          <RadioButton style={styles.radioXX} value={0} />
                          <Text style={styles.radioText} >NO LIMIT</Text>
                        </View>
                        <View>
                          <RadioButton value={10} />
                          <Text style={styles.radioText}>10 QUESTIONS </Text>
                        </View>
                        <View>
                          <RadioButton value={20} />
                          <Text style={styles.radioText}>20 QUESTIONS</Text>
                        </View>
                        <View>
                          <RadioButton value={30} />
                          <Text style={styles.radioText}>30 QUESTIONS</Text>
                        </View>
                      </RadioButton.Group>
                    </View>


                  </Gradient>
                </View>
              </View>
            </View>

            {/* <View> */}
            <View style={styles.ButtonWrapper} >
              <View style={styles.saveButton} >
                <DefaultButtons
                  style={styles.button}
                  onPress={questionHandler}
                  buttonTitle="save"
                />
              </View>
            </View>
            {/* </View> */}

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Footer2 navigation={props.navigation} />
    </MainBg>
  )
}

export default QuestionNo

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
    // marginBottom: 40
  },
  saveButton: {
    width: "60%",
    // margin: 10
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