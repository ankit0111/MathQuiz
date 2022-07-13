import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native'

import BoxTouchable from '../Components/Common/BoxTouchable';
import MainBg from '../Components/Common/MainBg'
import { defaultStyles as ds } from '../styles/defaultStyles';


import { useSelector, useDispatch } from 'react-redux';
import { quizActions } from '../redux/quiz/quizReducer';
import Gradient from '../Components/Common/Gradient';
import DefaultButtons from '../Components/Common/DefaultButtons';

import LottieView from 'lottie-react-native';



const Report = (props) => {

    const [animationSpeed, setAnimationSpeed] = useState(1);

    const animation = useRef();

   
    const quizReducer = useSelector(state => state.quizReducer);

    const totalQuestions = props.navigation.getParam("totalQuestions");

    let correctAnswers = quizReducer.totalCorrectAnswers;
    let wrongAnswers = totalQuestions - correctAnswers;

    let percentage = Math.round((correctAnswers / totalQuestions) * 100, 2)

    let stars = Math.round(percentage / 20);       

    let starAnimationEndDuration = 0;
    
    switch (stars) {
        case 1: 
        starAnimationEndDuration = 13.75;
        break;
        case 2: 
        starAnimationEndDuration = 29;
        break;
        case 3: 
        starAnimationEndDuration = 47;
        break;
        case 4: 
        starAnimationEndDuration = 62;
        break;
        case 5: 
        starAnimationEndDuration = 90;
        break;
    }
    
    console.log(stars);

    useEffect(() => {        
        animation.current.play(0, starAnimationEndDuration );
    }, [])

    return (
        <MainBg heading="Report Card" >
            <View style={ds.container} >
              

                <View style={styles.reportWrapper} >
                    <View style={{ height: 80, width: "100%" }}>
                        <LottieView 
                            ref={animation}
                            source={require("../assets/images/lottie/5-star-rating.json")}
                            //speed={animationSpeed}
                            loop={false}
                            // autoPlay
                        />
                    </View>

                    <Gradient style={styles.box}>
                        <View style={styles.reportContainer}>


                            <View style={ds.padding10V}>
                                <Text style={ds.normalText}>Total Question: {totalQuestions}</Text>
                            </View>

                            <View style={ds.padding10V}>
                                <Text style={ds.normalText}>Correct Answers: {correctAnswers}</Text>
                            </View>

                            <View style={ds.padding10V}>
                                <Text style={ds.normalText}>Wrong Answers: {wrongAnswers}</Text>
                            </View>

                            <View style={ds.padding10V}>
                                <Text style={styles.percentageText}>Percentage: {percentage}%</Text>
                            </View>

                        </View>
                    </Gradient>

                    <View style={styles.overlap} >
                        <Text style={styles.overlapText}>Rank - Keep it up</Text>
                    </View>

                    <View style={styles.buttonWrapper} >
                        <DefaultButtons onPress={() => props.navigation.navigate("Home")} buttonTitle="Start New Quiz" style={ds.padding20V} />
                    </View>
                </View>
            </View>
        </MainBg>
    )
}

export default Report

const styles = StyleSheet.create({

    reportWrapper: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    box: {
        padding: 10,
        borderRadius: 5,
        width: Dimensions.get("window").width > 800 ? 600 : "80%"
    },
    reportContainer: {
        paddingVertical: 25,
        backgroundColor: "#270026",
        borderRadius: 5,
        alignItems: "center"
    },
    percentageText: {
        fontFamily: "cherry",
        fontSize: 28,
        color: "#fff"
    },
    overlap: {
        marginTop: -30,
        backgroundColor: "#6A186E",
        paddingVertical: 18,
        paddingHorizontal: 25,
        width: Dimensions.get("window").width > 800 ? 600 : "90%",
        color: "#fff",
        borderRadius: 10,
        shadowColor: "black",
        shadowRadius: 2,
        elevation: 2,
        borderColor: "#40003D",
    },
    overlapText: {
        color: "#fff",
        fontFamily: "cherry",
        fontSize: 25,
        textAlign: "center",
        textTransform: 'uppercase'
    },
    buttonWrapper: {
        marginTop: 30
    }

})
