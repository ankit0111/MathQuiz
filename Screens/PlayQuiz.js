import React, { useState, useEffect, useRef } from 'react'
import { Alert, StyleSheet, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

import { useSelector, useDispatch } from 'react-redux';
import { quizActions } from '../redux/quiz/quizReducer';

import DefaultButtons from '../Components/Common/DefaultButtons'
import MainBg from '../Components/Common/MainBg'
import { defaultStyles as ds } from '../styles/defaultStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Gradient from '../Components/Common/Gradient';
import TouchableComponent from '../Components/Common/TouchableComponent';
import QuestionTimer from '../Components/Snippets/QuestionTimer';

import SvgIcon from '../Components/Common/SvgIcon';
import CorrectAnswerIcon from '../assets/images/icons/correct-answer.svg';
import WrongAnswerIcon from '../assets/images/icons/wrong-answer.svg';



const PlayQuiz = (props) => {
    const quizReducer = useSelector(state => state.quizReducer);
    const settingReducer = useSelector(state => state.settingsReducer);

    const dispatch = useDispatch();

    const [operator, setOperator] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [answer, setAnswer] = useState(0);

    const [questionCounter, setQuestionCounter] = useState(0);
    const [enteredAnswer, setEnterAnswer] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    const [timerCounter, setTimerCounter] = useState(0);
    const [questionTimerCount, setQuestionTimerCount] = useState();

    const [cOverlay, setcOverlay] = useState(false);
    const [wOverlay, setwOverlay] = useState(false);

    const answerRef = useRef();
    const timer = useRef();
    const nextQuestion = useRef();
    const operatorRef = useRef();
    const quizTypes = useRef([]);
    const showNext = useRef('false');
    const quizType = useRef(); // This will be used to store current operator per question
    const submitAnswer = useRef(); // To ensure Answer can be submitted
    const questionTimer = useRef();

    const quizStart = quizReducer.quizStart;
    const quizQuestions = settingReducer.quiz.quizQuestions;
    // console.log("0000", settingReducer.quiz.quizQuestions)


    const ADDITION = "add";
    const SUBTRACTION = "subtract";
    const MULTIPLY = "multiply";
    const DIVIDE = "divide";



    // Run below useEffect only once when app loads without any dependencies 
    useEffect(() => {

        // console.log(quizReducer.quizType);
        // ----------------------- Fetching Quiz type Selected ----------------- //           
        for (let item in quizReducer.quizType) {
            //console.log(item);     
            if (quizReducer.quizType[item]) {
                quizTypes.current.push(item);
            }
        }
        // console.log(quizTypes);

        questionGenerator();
        dispatch(quizActions.quizStart());

        // return () => {
        //     resetQuestion();
        // }
    }, []);


    /* ---------------------------- MAIN FUNCTIONS ---------------------------------*/

    const finishQuiz = () => {
        props.navigation.navigate({ routeName: "ReportScreen", params: { totalQuestions: questionCounter } });
    }

    const resetQuestion = () => {
        // Clear previous answer from Text Field
        if (answerRef.current != '') {
            answerRef.current = '';
            setEnterAnswer("");
        }

        // Reset All State variables for new question        
        showNext.current = false;
        setTimerCounter(0);
        setShowTimer(false);
        setwOverlay(false);
        setcOverlay(false);
        setQuestionTimerCount(settingReducer.timers.questionTimer);
        // console.log("9999999",settingReducer.timers.questionTimer)

        // Clear all timers 
        if (timer.current) {
            clearInterval(timer.current);
            //console.log("timer cleared"); 
        }
        if (nextQuestion.current) {
            clearTimeout(nextQuestion.current);
        }
        if (questionTimer.current) {
            clearInterval(questionTimer.current);
        }
    }

    const answerHandler = (val) => {
        answerRef.current = val;
        setEnterAnswer(val);
    }

    // Question Generation - Main function to generate question and start Quiz process 
    const questionGenerator = () => {
        //console.log("show next is " + showNext.current);
        // console.log("quiz start is " + quizStart);
        // console.log(quizReducer);

        // If Shownext is true and quizStart is true only then Question will generate
        if (!showNext.current && quizStart) {
            return;
        }


        // Reset all Question and States related variables to default
        resetQuestion();

        // Generate Quiz Type operator
        quizType.current = generateQuestionType();

        // Increment Question Counter 
        setQuestionCounter((prevState) => {
            return (prevState = prevState + 1);
        });

        // Check if Question timer needs to be displayed and set Timer 
        if (settingReducer.quiz.showQuestionTimer === true) {
            questionTimer.current = setInterval(() => {
                setQuestionTimerCount(prev => {
                    if (prev <= 1) {
                        showNext.current = true;
                        clearInterval(questionTimer.current);
                        Alert.alert("Time Ups", "You ran out of time, Better luck next time", [{ style: "default", text: "Next Question", onPress: renderQuestion }]);
                    }
                    return prev - 1;
                });
            }, 1000)  
        }

        submitAnswer.current = true;

        // Generate 2 Random numbers based on their settings from settingReducer
        let v1 = generateNumber(quizType.current);
        let v2 = generateNumber(quizType.current);

        // Assign generated values to States - NOTE these values will change based on Multiply         
        setValue1(v1);
        setValue2(v2);



        if (quizType.current == ADDITION) {

            setOperator("+");
            operatorRef.current = "+";
            setAnswer(parseInt(v1) + parseInt(v2));
            dispatch(quizActions.addQuestion());

        } else if (quizType.current == SUBTRACTION) {

            setOperator("-");
            operatorRef.current = "-";

            let sv = swapValues(v1, v2);
            setValue1(sv.v1);
            setValue2(sv.v2);
            setAnswer(sv.v1 - sv.v2);
            dispatch(quizActions.subtractionQuestion());

        } else if (quizType.current == MULTIPLY) {

            setOperator("X");
            operatorRef.current = "X";

            setAnswer(v1 * v2);
            dispatch(quizActions.multiplyQuestion());

        } else if (quizType.current == DIVIDE) {

            let divideValues = generateDivideValues();
            setValue1(divideValues.value1);
            setValue2(divideValues.value2);
            setAnswer(divideValues.value1 / divideValues.value2);
            setOperator("/");
            operatorRef.current = "/";
            dispatch(quizActions.divideQuestion());
        } else {
            setAnswer(parseInt(v1) + parseInt(v2));
            setOperator("+");
            operatorRef.current = "+";
            dispatch(quizActions.addQuestion());
            quizType.current = ADDITION;
        }


    }


    // Function used to randomly generate Question Type 
    const generateQuestionType = () => {

        let min = 1;
        let max = quizTypes.current.length;
        let random = Math.random();
        let type = Math.floor(random * (max - min + 1) + min);
        // console.log(random);
        // console.log(type);
        return quizTypes.current[type - 1];
        // switch (type) {
        //     case 1: 
        //         return ADDITION;                
        //     case 2: 
        //         return SUBTRACTION;
        //     case 3: 
        //         return MULTIPLY;
        //     case 4: 
        //         return DIVIDE;
        //     default: 
        //         return ADDITION;
        // }
    }



    // Function used to Check Submitted Answer and handle next operations 
    const checkAnswer = () => {

        if (answerRef.current == '') {
            Alert.alert("Please enter your Answer", "You can't leave Answer field empty", [{ style: "default", text: "Okay" }]);
            return;
        }

        if (submitAnswer.current) {

            clearInterval(questionTimer.current);

            submitAnswer.current = false; // set this to false so user can't submit multiple times

            showNext.current = true;

            if (answerRef.current == answer) {
                setcOverlay(true);

                displayTimer(settingReducer.timers.correctNextQuestion);
                dispatch(quizActions.setCorrectAnswers(quizType.current));

                nextQuestion.current = setTimeout(() => {
                    renderQuestion();
                }, (settingReducer.timers.correctNextQuestion * 1000));
            } else {
                setwOverlay(true);
                displayTimer(settingReducer.timers.wrongNextQuestion);
                //console.log(showNext.current);
                nextQuestion.current = setTimeout(() => {
                    renderQuestion();
                }, (settingReducer.timers.wrongNextQuestion * 1000));
            }
        }


    }

    // Funtion used to Display Timer on the screen
    const displayTimer = (t) => {
        setShowTimer(true);
        setTimerCounter(t);
        timer.current = setInterval(() => {
            if (t > 1) {
                setTimerCounter((prevState) => {
                    return (prevState = prevState - 1);
                });
            }
            t--;
            if (t == 0) {
                // clearInterval(timer);
            }
            // console.log(t);

            if (timerCounter == 1) {
                clearInterval(timer.current);
            }

        }, 1000);
    }


    // Function used to Render Next Question 
    const renderQuestion = () => {
        // console.log(showNext.current);

        if (questionCounter == quizQuestions) {
            resetQuestion();
            finishQuiz();
        }
        else if (showNext.current) {
            questionGenerator();
        }
    }

    /* --------------------------------- Helper functions ----------------------------- */


    // Helper function to Generate 2 values which can be divided properly
    const generateDivideValues = () => {

        let v1;
        let v2;
        let sv;

        do {
            v1 = generateNumber(quizType.current);
            v2 = generateNumber(quizType.current);
            sv = swapValues(v1, v2);
        }
        while (sv.v1 % sv.v2 != 0);

        return { "value1": sv.v1, "value2": sv.v2 };
    }


    // Fuction used to SWAP values by detecting greater value and assigning it in value1
    const swapValues = (v1, v2) => {
        let v3;
        if (v2 > v1) {
            v3 = v1;
            v1 = v2;
            v2 = v3;
        }

        return { "v1": v1, "v2": v2 };
    }

    // Function to generate Random number 
    const generateNumber = (quizType) => {

        let min = 10;
        let max = 10;

        switch (quizType) {
            case ADDITION:
                min = settingReducer.numbers.minAddNumber;
                max = settingReducer.numbers.maxAddNumber;
            case SUBTRACTION:
                min = settingReducer.numbers.minAddNumber;
                max = settingReducer.numbers.maxAddNumber;
            case MULTIPLY:
                min = settingReducer.numbers.minAddNumber;
                max = settingReducer.numbers.maxAddNumber;
            case DIVIDE:
                min = settingReducer.numbers.minAddNumber;
                max = settingReducer.numbers.maxAddNumber;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const checkStates = () => {
        // console.log(quizTypes.current);
        // console.log(quizReducer);
    }


    return (

        <MainBg heading="Quiz" >
            <ScrollView >
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}  >
                    <View style={ds.container} >
                        {(settingReducer.quiz.showQuestionTimer === true) && <QuestionTimer questionTimerCount={questionTimerCount} />}

                        <View style={ds.alignCenter} >
                            <Text style={ds.headingText}>{quizType.current}</Text>

                            <View style={styles.questionCounterWrapper} >
                                <View style={ds.flexRow} >
                                    <View style={ds.flexEnd}>
                                        <Text style={styles.questionCounter}>Question {questionCounter}</Text>
                                    </View>
                                    <View style={ds.flexEnd}>
                                        <Text style={styles.totalQuestions}>/
                                            {(quizQuestions == 0) ? <Icon name="infinite"
                                                size={25} color="#fff" /> : quizQuestions}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={ds.padding20V} >
                            <View style={ds.center} >
                                <View style={styles.questionWrapper} >
                                    <Gradient style={styles.box}>

                                        <View  >
                                            <Text style={styles.subHeadingText} >Input the answer</Text>
                                        </View>

                                        <View style={styles.question} >
                                            <Text style={styles.questionText}>{value1} {operator} {value2} = </Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={answerHandler.bind(this)}
                                                placeholder="?"
                                                placeholderTextColor="#fff"
                                                keyboardType="numeric"
                                                value={enteredAnswer.toString()}
                                            />
                                        </View>

                                    </Gradient>
                                </View>
                            </View>
                        </View>

                        <View style={styles.buttonWrapper} >
                            <DefaultButtons style={styles.button} onPress={checkAnswer} buttonTitle="Check Answer" />
                        </View>

                        <View style={styles.finishButtonWrapper} >
                            <View style={styles.finishButton} >
                                <DefaultButtons style={styles.button} onPress={finishQuiz} buttonTitle="Finish Quiz" />
                            </View>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>



            {/* <Text> {resultMessage}</Text>
                    <Text> {(operatorRef.current == "+") ? "Add Questions: " + addQuestionCounter : ""}
                        {(operatorRef.current == "-") ? "Subtract Questions: " + subtractQuestionCounter : ""}
                        {(operatorRef.current == "X") ? "Multiply Questions: " + multiplyQuestionCounter : ""}
                        {(operatorRef.current == "/") ? "Divide Questions: " + divideQuestionCounter : ""}</Text> */}

            <Overlay isVisible={cOverlay} overlayStyle={styles.cOverlay} fullScreen="true" onBackdropPress="">
                <View style={{ ...ds.center, flex: 1 }}>
                    <View style={styles.overlayHeadingWrapper} >
                        <Text style={styles.overlayHeading}>Great</Text>
                    </View>

                    <View style={styles.overlayIcon}>
                        <SvgIcon >
                            <CorrectAnswerIcon height={100} width={100} />
                        </SvgIcon>
                    </View>

                    <View style={styles.overlayCorrectAnswer}>
                        <Text style={styles.overlayCorrectAnswerText} >{answer}</Text>
                        <Text style={styles.overlayCorrectAnswerSubText} >is the right answer</Text>
                    </View>

                    <View style={styles.overlayButtonWrapper}>
                        <TouchableComponent activeOpacity={0.9} onPress={renderQuestion} >
                            <View style={styles.overlayButton} >
                                <Text style={styles.overlayButtonText}>{(questionCounter == quizQuestions) ? "See Report" : "Next Question"}</Text>
                            </View>
                        </TouchableComponent>
                    </View>

                    <View style={styles.nextQuestionText} >
                        <Text style={ds.normalText} >Next Question will load in {timerCounter} seconds</Text>
                    </View>

                </View>

            </Overlay>

            <Overlay isVisible={wOverlay} overlayStyle={styles.wOverlayWrapper} fullScreen="true" onBackdropPress="">
                <ImageBackground source={require("../assets/images/overlay-background.png")} style={styles.overlayBackground} >
                    <View style={styles.wOverlay} >


                        <View style={{ ...ds.center, flex: 1 }}>
                            <View style={styles.overlayHeadingWrapper} >
                                <Text style={styles.overlayHeading}>OPPS</Text>
                            </View>

                            <View style={styles.overlayIcon}>
                                <SvgIcon >
                                    <WrongAnswerIcon height={100} width={100} />
                                </SvgIcon>
                            </View>

                            <View style={styles.overlayCorrectAnswer}>
                                <Text style={styles.overlayCorrectAnswerText} >{answer}</Text>
                                <Text style={styles.overlayCorrectAnswerSubText} >is the right answer</Text>
                            </View>

                            <View style={styles.overlayButtonWrapper}>
                                <TouchableComponent activeOpacity={0.9} onPress={renderQuestion} >
                                    <View style={styles.overlayButton} >
                                        <Text style={styles.overlayButtonText}>{(questionCounter == quizQuestions) ? "See Report" : "Next Question"}</Text>
                                    </View>
                                </TouchableComponent>
                            </View>

                            <View style={styles.nextQuestionText} >
                                <Text style={ds.normalText} >Next Question will load in {timerCounter} seconds</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </Overlay>

        </MainBg >

    )
}


export default PlayQuiz

const styles = StyleSheet.create({

    questionCounterWrapper: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20
    },
    questionCounter: {
        fontSize: 30,
        color: "#fff",
        fontFamily: "cherry"
    },
    totalQuestions: {
        fontSize: 30,
        color: "#3A0138",
        fontFamily: "cherry"
    },
    box: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionText: {
        fontSize: 30,
        fontFamily: 'cherry',
        color: "#fff"
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
        textAlign: "center"
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    finishButtonWrapper: {
        flex: 1,
        // justifyContent: "flex-end",
        alignItems: 'center',
        marginTop: 80,
        // marginBottom: 40
    },
    finishButton: {
        width: "80%"
    },
    cOverlay: {
        // opacity: 0.8,
        backgroundColor: "rgba(119, 255, 116, 0.8)",
        flex: 1
    },
    wOverlayWrapper: {
        backgroundColor: "rgba(255, 35, 35, 0.8)",
    },
    wOverlay: {
        // opacity: 1,        
        flex: 1,
    },
    overlayBackground: {
        width: "100%",
        height: "100%"
    },
    overlayHeadingWrapper: {
        marginVertical: 20
    },
    overlayHeading: {
        fontSize: 80,
        fontFamily: "cherry",
        color: "#fff",
        textAlign: "center"
    },
    overlayIcon: {
        marginVertical: 20
    },
    overlayCorrectAnswer: {
        marginVertical: 20
    },
    overlayCorrectAnswerText: {
        fontFamily: "cherry",
        fontSize: 50,
        color: "#fff",
        textAlign: "center"
    },
    overlayCorrectAnswerSubText: {
        fontFamily: "cherry",
        fontSize: 25,
        color: "#fff",
        textAlign: "center"
    },
    overlayButtonWrapper: {
        marginVertical: 40
    },
    overlayButton: {
        padding: 20,
        backgroundColor: "#f2f2f2",
        borderRadius: 10
    },
    overlayButtonText: {
        textTransform: "uppercase",
        fontFamily: "cherry",
        fontSize: 18,
        color: "#550051",
    },
    nextQuestionText: {
        paddingVertical: 20,
        alignItems: "center"
    },


})



/*

// Between any two numbers
    Math.floor(Math.random() * (max - min + 1)) + min;

    // Between 0 and max
    Math.floor(Math.random() * (max + 1));

    // Between 1 and max
    Math.floor(Math.random() * max) + 1;
*/
