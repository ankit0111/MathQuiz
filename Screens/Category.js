import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import BoxTouchable from '../Components/Common/BoxTouchable';
import MainBg from '../Components/Common/MainBg'
import { defaultStyles as ds } from '../styles/defaultStyles';
import Footer from '../Components/Common/Footer';

import { useSelector, useDispatch } from 'react-redux';
import { quizActions } from '../redux/quiz/quizReducer';

import SvgIcon from '../Components/Common/SvgIcon';

import AddIcon from '../assets/images/icons/addition.svg'
import SubtractIcon from '../assets/images/icons/subtract.svg'
import MultiplyIcon from '../assets/images/icons/multiply.svg'
import DivideIcon from '../assets/images/icons/divide.svg'

const Categories = (props) => {

    const dispatch = useDispatch();

    const quizState = useSelector(state => state.quizReducer);
    
    const [addActive, setAddActive] = useState(false);
    const [subtractActive, setSubtractActive] = useState(false);
    const [multiplyActive, setMultiplyActive] = useState(false);
    const [divideActive, setDivideActive] = useState(false);

    useEffect(() => {
        dispatch(quizActions.resetQuiz());
    }, [])


    const toggleQuizType = (event, type) => {

        // console.log(type);

        dispatch(quizActions.setQuizType(type));

        switch (type) {
            case "add":
                setAddActive(!addActive);
                break;
            case "subtract":
                setSubtractActive(!subtractActive);
                break;
            case "multiply":
                setMultiplyActive(!multiplyActive);
                break;
            case "divide":
                setDivideActive(!divideActive);
                break;
        }


    }

    const startQuiz = () => {
        // console.log(quizState);
        if (addActive || subtractActive || multiplyActive || divideActive) {
            props.navigation.navigate("PlayQuizScreen");
        } else {
            Alert.alert('Choose Quiz Type', 'Please choose one or more types to start quiz', [{text: "Okay", style: "destructive"}])
        }
    }

    return (
        <MainBg heading="Categories" >

            <View style={ds.container} >

                <View style={styles.subHeading} >
                    <View style={styles.subHeadingWrapper} >
                        <Text style={ds.subHeadingText} >Select a category for practice</Text>
                    </View>

                </View>


                <View style={styles.gridWrapper} >
                    <View style={styles.boxItem} >
                        <BoxTouchable onPress={(e) => toggleQuizType(e, 'add')} style={styles.box} >
                            <View style={styles.icon} >
                                <SvgIcon style={ds.padding10V} >
                                    <AddIcon height={25} width={25} />
                                </SvgIcon>
                            </View>

                            <View style={styles.textWrapper}>
                                <Text style={(addActive) ? ds.normalTextActive : ds.normalText}>Addition</Text>
                            </View>
                        </BoxTouchable>
                    </View>

                    <View style={styles.boxItem} >
                        <BoxTouchable onPress={(e) => toggleQuizType(e, 'subtract')} style={styles.box} >
                            <View style={styles.icon} >
                                <SvgIcon style={ds.padding10V} >
                                    <SubtractIcon height={25} width={25} />
                                </SvgIcon>
                            </View>

                            <View style={styles.textWrapper}>
                                <Text style={(subtractActive) ? ds.normalTextActive : ds.normalText}>Subtraction</Text>
                            </View>
                        </BoxTouchable>
                    </View>
                </View>

                <View style={styles.gridWrapper} >
                    <View style={styles.boxItem} >
                        <BoxTouchable onPress={(e) => toggleQuizType(e, 'multiply')} style={styles.box} >
                            <View style={styles.icon} >
                                <SvgIcon style={ds.padding10V} >
                                    <MultiplyIcon height={25} width={25} />
                                </SvgIcon>
                            </View>

                            <View style={styles.textWrapper}>
                                <Text style={(multiplyActive) ? ds.normalTextActive : ds.normalText}>Multiply</Text>
                            </View>
                        </BoxTouchable>
                    </View>

                    <View style={styles.boxItem} >
                        <BoxTouchable onPress={(e) => toggleQuizType(e, 'divide')} style={styles.box} >
                            <View style={styles.icon} >
                                <SvgIcon style={ds.padding10V} >
                                    <DivideIcon height={25} width={25} />
                                </SvgIcon>
                            </View>

                            <View style={styles.textWrapper}>
                                <Text style={(divideActive) ? ds.normalTextActive : ds.normalText}>Divide</Text>
                            </View>
                        </BoxTouchable>
                    </View>

                </View>

            </View>
            <Footer navigation={props.navigation} mainButtonNavigate={startQuiz} lastColNavigate="SettingsScreen" />

        </MainBg>
    )
}

export default Categories

const styles = StyleSheet.create({

    subHeading: {
        alignItems: "center",
        justifyContent: "center",
    },
    subHeadingWrapper: {
        marginBottom: 30,
        width: "50%"
    },
    icon: {
        alignItems: "center",
        justifyContent: "center"
    },
    gridWrapper: {
        flexDirection: 'row',
        alignItems: "center"
    },
    boxItem: {
        flex: 2,
        justifyContent: "space-around",
        marginVertical: 20,
        marginHorizontal: 10,        
    }, 
    textWrapper: {
        paddingBottom: 20
    }

})

