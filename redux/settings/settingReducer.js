import { createSlice } from '@reduxjs/toolkit';

// const initialData = require('../../settings.json');
// console.log("first",initialData);


const initialState = {
    numbers: {
        minAddNumber: 10,
        maxAddNumber: 20,
        minSubtractNumber: 1,
        maxSubtractNumber: 10,
        minMultiplyNumber: 1,
        maxMultiplyNumber: 10,
        minDivideNumber: 1,
        maxDivideNumber: 10
    },
    timers: {
        correctNextQuestion: 2,
        wrongNextQuestion: 4,
        questionTimer: 10
    },
    quiz: {
        quizQuestions: 10,
        showQuestionTimer: true
    },
    general: {
        music: true
    },
    playSound: '',

}

const settingSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        setQuizNumbers(state, action) {
            // console.log("actions5555", action.payload);
            state.numbers = {
                minAddNumber: parseInt(action.payload[0].value),
                maxAddNumber: parseInt(action.payload[1].value),
                minSubtractNumber: parseInt(action.payload[2].value),
                maxSubtractNumber: parseInt(action.payload[3].value),
                minMultiplyNumber: parseInt(action.payload[4].value),
                maxMultiplyNumber: parseInt(action.payload[5].value),
                minDivideNumber: parseInt(action.payload[6].value),
                maxDivideNumber: parseInt(action.payload[7].value)
            }
        },
        setQuizTimers(state, action) {
            // console.log("actions2", action.payload);
            state.timers = {
                correctNextQuestion: parseInt(action.payload[0].value),
                wrongNextQuestion: parseInt(action.payload[1].value),
                questionTimer: parseInt(action.payload[2].value)
            }
        },
        updateTime(state, action) {
            // console.log('updatetime', action.payload)
            state.timers = { questionTimer: parseInt(action.payload) }
        },
        setQuizCondition(state, action) {
            // console.log(action, "actions3");
            state.quiz = {
                quizQuestions: parseInt(action.payload[0].value),
                showQuestionTimer: action.payload[1].value,
            }
        },
        noOfQuestions(state, action) {
            // console.log("update QusNo...", action.payload)
            state.quiz = { 
                quizQuestions: parseInt(action.payload) ,
                showQuestionTimer: state.quiz.showQuestionTimer
            }
        },
        showTimer(state, action) {
            // console.log(action.payload, "actionstimer");
            state.quiz = {
                showQuestionTimer: action.payload,
                quizQuestions: state.quiz.quizQuestions
                // quizQuestions: 
            }
        },
        settingData(state, action) {
            //  console.log("actions77777", action.payload);
            state.numbers = {
                minAddNumber: parseInt(action.payload.minAddNumber),
                maxAddNumber: parseInt(action.payload.maxAddNumber),
                minSubtractNumber: parseInt(action.payload.minSubtractNumber),
                maxSubtractNumber: parseInt(action.payload.maxSubtractNumber),
                minMultiplyNumber: parseInt(action.payload.minMultiplyNumber),
                maxMultiplyNumber: parseInt(action.payload.maxMultiplyNumber),
                minDivideNumber: parseInt(action.payload.minDivideNumber),
                maxDivideNumber: parseInt(action.payload.maxDivideNumber)
            }
        },
        saveSound(state, action) {
            // console.log("action", action.payload); 
            state.playSound =   action.payload
        },
        toggleSound(state, action) {
            // console.log('toggle', state.general)
            state.general = {
                music: action.payload
            }
        }
    }
});

export const settingsActions = settingSlice.actions;

export default settingSlice.reducer;

