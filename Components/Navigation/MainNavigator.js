// import React from 'react';
// import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Main from '../../Screens/Main';
import Category from '../../Screens/Category';
import PlayQuiz from '../../Screens/PlayQuiz';
import Report from '../../Screens/Report';
import MainSettings from '../../Screens/MainSettings';
import SetValues from '../../Screens/SettingScreens/SetValues'
import QuestionNo from '../../Screens/SettingScreens/QuestionNo';
import Timer from '../../Screens/SettingScreens/Timer';
import SoundSetting from '../../Screens/SettingScreens/SoundSetting';

const homeNavigator = createStackNavigator({
    Home: {
        screen: Main,
        screenOptions: { headerShown: false }
    }
}, {
    headerMode: 'none'
})

const mainStackNavigator = createStackNavigator({
    Home: {
        screen: Main,
        navigationOptions: { headerShown: false }

    },
    CategoryScreen: Category,
    SettingsScreen: MainSettings,
    ValuesScreen: SetValues,
    QuestionsScreen: QuestionNo,
    TimerScreen: Timer,
    SoundScreen: SoundSetting,

    PlayQuizScreen: {
        screen: PlayQuiz,
        navigationOptions: { headerShown: false }

    },
    ReportScreen: Report
}, {
    defaultNavigationOptions: { headerShown: false }
});


export default createAppContainer(mainStackNavigator);