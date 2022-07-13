import { configureStore } from '@reduxjs/toolkit';

import quizReducer from './quiz/quizReducer';
import settingsReducer from './settings/settingReducer';

const store = configureStore({
    reducer: {
        quizReducer: quizReducer,
        settingsReducer: settingsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;


