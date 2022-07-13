import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, } from 'react-native'
import { defaultStyles as ds } from '../../styles/defaultStyles';
import { ScrollView } from 'react-native-gesture-handler';
import MainBg from '../../Components/Common/MainBg'
import Footer2 from '../../Components/Common/Footer2'
import Gradient from '../../Components/Common/Gradient';
import SwitchToggle from "react-native-switch-toggle";
import { useSelector, useDispatch } from 'react-redux';
import { settingsActions } from "../../redux/settings/settingReducer";


const SoundSetting = (props) => {
  const dispatch = useDispatch()
  const musicSetting = useSelector(state => state.settingsReducer.general);
  const playMusic = useSelector(state => state.settingsReducer.playSound);

  const stopSound = () => {
    playMusic.pauseAsync();
  }
  const startSound = () => {
    playMusic.replayAsync();
  }

  const toggleSound = () => {
    if (!musicSetting.music) {
      // console.log("toggleIF")
      startSound();
    } else {
      // console.log("toggleELSE")
      stopSound();
    }
    dispatch(settingsActions.toggleSound(!musicSetting.music));
  }


  return (
    <MainBg heading="SOUND" >
      <View >
        <Text style={styles.subHeadingText} >ADJUST THE SETTINGS AS PER YOUR REQUIERMENT</Text>
      </View>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}  >
          <View style={ds.container} >
            <View style={ds.padding20V} >
              <View style={ds.center} >
                <View style={styles.questionWrapper} >
                  <Gradient style={styles.box}>
                    <View>
                      <Text style={styles.subHeadingText} >SELECT A OPTION</Text>

                      <View style={styles.toggleTextWrap}>
                        <View>
                          <Text style={styles.toggleText} >SOUND</Text>
                          <View style={styles.switchToggle1}>

                            {musicSetting.music ? <Text style={styles.textWhite} >on/</Text> : <Text style={styles.textBlack}>on/</Text>}
                            {!musicSetting.music ? <Text style={styles.textWhite} >off</Text> : <Text style={styles.textBlack}>off</Text>}

                            <SwitchToggle
                              switchOn={musicSetting.music}
                              onPress={toggleSound}
                              circleStyle={{
                                width: 25,
                                height: 25,
                                borderRadius: 20,
                              }}
                              containerStyle={{
                                width: 60,
                                height: 35,
                                borderRadius: 25,
                                padding: 5,
                              }}
                            />
                          </View>
                        </View>

                        {/* <View>
                          <Text style={styles.toggleText} >MUSIC</Text>
                          <View style={styles.switchToggle1}>
                            {on2 ? <Text style={styles.textWhite} >on/</Text> : <Text style={styles.textBlack}>on/</Text>}
                            {!on2 ? <Text style={styles.textWhite} >off</Text> : <Text style={styles.textBlack}>off</Text>}
                            <SwitchToggle
                              switchOn={on2}
                              onPress={() => off2(!on2)}
                              circleStyle={{
                                width: 25,
                                height: 25,
                                borderRadius: 20,
                              }}
                              containerStyle={{
                                width: 60,
                                height: 35,
                                borderRadius: 25,
                                padding: 5,
                              }}

                            />
                          </View>
                        </View> */}

                      </View>
                    </View>
                  </Gradient>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Footer2 navigation={props.navigation} />
    </MainBg >
  )
}

export default SoundSetting

const styles = StyleSheet.create({
  box: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 5,
    width: "100%",
  },
  subHeadingText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "cherry",
    margin: 50
  },
  questionWrapper: {
    width: Dimensions.get("window").width > 800 ? 700 : "80%"
  },
  toggleText: {
    fontSize: 40,
    textAlign: "center",
    color: "#fff",
    fontFamily: "cherry",
  },
  toggleTextWrap: {
    alignItems: 'flex-start',
    marginBottom: 80
  },
  switchToggle1: {
    position: 'relative',
    top: -45,
    left: 150,

    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#490047'
  },
  textWhite: {
    color: "white",
    fontSize: 27,
    fontFamily: "cherry"
  },
  textBlack: {
    color: "#6A186E",
    fontSize: 27,
    fontFamily: "cherry"
  }

})

