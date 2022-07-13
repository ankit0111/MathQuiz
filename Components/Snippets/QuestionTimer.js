import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { defaultStyles as ds } from '../../styles/defaultStyles';
import SvgIcon from '../Common/SvgIcon';
import TimerIcon from '../../assets/images/icons/timer.svg'

const QuestionTimer = (props) => {
    return (
        <View style={styles.timer} >
            <View style={ds.flexRow} >
                <SvgIcon style={styles.timerIcon} >
                    <TimerIcon height={25} width={25} />
                </SvgIcon>
                <Text style={styles.timerText} >{props.questionTimerCount}s</Text>
            </View>
        </View>
    )
}

export default QuestionTimer

const styles = StyleSheet.create({
    timer: {
        alignItems: "flex-end",
        paddingRight: 30,
        paddingVertical: 40
    },
    timerIcon: {
        paddingRight: 10
    },
    timerText: {
        color: "#fff",
        fontFamily: "cherry"
    },
})
