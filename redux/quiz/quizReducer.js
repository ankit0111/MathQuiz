import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addQuestion: 0,
    subtractionQuestion: 0,
    multiplyQuestion: 0,
    divideQuestion: 0,
    quizStart: false,
    quizType: {
        add: false,
        subtract: false,
        multiply: false,
        divide: false
    },
    correctAnswers: {
        add: 0,
        subtract: 0,
        multiply: 0,
        divide: 0
    },
    totalCorrectAnswers: 0,
}

const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        addQuestion(state) {
            state.addQuestion++;
        },
        subtractionQuestion(state){
            state.subtractionQuestion++;
        },
        multiplyQuestion(state) {
            state.multiplyQuestion++;
        }, 
        divideQuestion(state) {
            state.divideQuestion++;
        },
        quizStart(state) {
            state.quizStart = true;
        },
        quizStop(state) {
            state.quizStart = false;
        },
        resetQuiz(state) {
            state.addQuestion = 0;            
            state.subtractionQuestion = 0;            
            state.multiplyQuestion = 0;
            state.divideQuestion = 0;
            state.quizStart = false;
            state.quizType = {
                add: false,
                subtract: false,
                multiply: false,
                divide: false
            };
            state.correctAnswers = {
                add: 0,
                subtract: 0,
                multiply: 0,
                divide: 0
            };
            state.totalCorrectAnswers = 0;
        },
        setQuizType(state, data) {
            state.quizType[data.payload] = !state.quizType[data.payload];            
        },
        setCorrectAnswers(state, data) {
            state.totalCorrectAnswers = state.totalCorrectAnswers + 1;
            state.correctAnswers[data.payload] = state.correctAnswers[data.payload] + 1;            
        }
        
    }
});

export const quizActions = quizSlice.actions;

export default quizSlice.reducer;

