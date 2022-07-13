// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as Fonts from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';

import { Provider, useSelector } from 'react-redux';
import store from './redux/index';
// import { Audio } from 'expo-av';

// import MainNavigator from './Components/Navigation/MainNavigator';
// import Main from './Screens/Main';
import DbConfig from './Components/General/DbConfig';

// const { sound } = Audio.Sound.createAsync(
//   require('./assets/Music/MUSIC.mp3')
// );

enableScreens();

const loadFonts = async () => {
  await Fonts.loadAsync({
    'cherry': require("./assets/fonts/CherryBomb-Regular.ttf"),
    'erica': require('./assets/fonts/EricaOne-Regular.ttf')
  });
}


export default function App() {

  const [loadApp, setLoadApp] = useState(false);

  // const musicSetting = useSelector(state => state.settingsReducer.general);


  // useEffect(() => {

  //   if (musicSetting) {
  //     console.log('Playing Sound');
  //     sound.playAsync();
  //   } else {
  //     // stop code 
  //     sound.unloadAsync();
  //   }


  // }, [musicSetting]);


  if (!loadApp) {
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => setLoadApp(true)}
      onError={(err) => console.log(err)}
    />
  }

  return (
    <Provider store={store}>
      <DbConfig />
      {/* <MainNavigator /> */}
    </Provider>
  );
}