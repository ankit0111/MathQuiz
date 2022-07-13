import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import DefaultButtons from '../Components/Common/DefaultButtons'
import Footer2 from '../Components/Common/Footer2'
import MainBg from '../Components/Common/MainBg'


const MainSettings = (props) => {
    return (
        <MainBg heading='SETTING' >
            <View>
                <View style={styles.buttonWrapper} >
                    <View style={styles.saveButton} >
                        <DefaultButtons style={styles.button}
                            onPress={() => props.navigation.navigate({ routeName: "ValuesScreen" })}
                            buttonTitle="Set Values" />
                    </View>
                    <View style={styles.saveButton} >
                        <DefaultButtons style={styles.button}
                            onPress={() => props.navigation.navigate({ routeName: "TimerScreen" })}
                            buttonTitle="Timer" />
                    </View>
                    <View style={styles.saveButton} >
                        <DefaultButtons style={styles.button}
                            onPress={() => props.navigation.navigate({ routeName: "QuestionsScreen" })}
                            buttonTitle="No. of Question" />
                    </View>
                    <View style={styles.saveButton} >
                        <DefaultButtons style={styles.button}
                            onPress={() => props.navigation.navigate({ routeName: "SoundScreen" })}
                            buttonTitle="Sound" />
                    </View>
                </View>
            </View>
            <Footer2 navigation={props.navigation} lastColNavigate="SettingsScreen" />
        </MainBg >

    )
}

export default MainSettings

const styles = StyleSheet.create({
    buttonWrapper: {
        // flex: 1,
        alignItems: 'center',
        marginTop: 150,
        marginBottom: 40,
    },
    saveButton: {
        width: "70%",
        marginBottom: 20,


    },
    textHeading: {
        color: "white",
        fontSize: 30,
        alignContent: 'center',
    }


})

