import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../redux/settings/settingReducer";
import MainNavigator from "../Navigation/MainNavigator";
import { Audio } from 'expo-av';

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
}
const db = openDatabase();

const DbConfig = () => {
    const dispatch = useDispatch()
    const dataNew = require("../../settings.json");
    const musicSetting = useSelector(state => state.settingsReducer.general);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/Music/MUSIC2.mp3')
        );
        dispatch(settingsActions.saveSound(sound));
        await sound.playAsync();
        await sound.setIsLoopingAsync(true);
    }

    useEffect(() => {

        if (musicSetting.music) {
            playSound();
        }

        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists settings (id integer primary key not null, name TEXT, value TEXT);"
                // "DROP TABLE settings"
            );
            // console.log("drop")
        });

        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) as total FROM settings", [], (_, { rows }) => {
                // console.log("rows12", rows._array);
                if (JSON.stringify(rows._array[0].total) == 0) {
                    let objArray = Object.values(dataNew)

                    for (let i = 0; i < objArray.length; i++) {
                        let keyVal = Object.keys(objArray[i]);
                        let valueVal = Object.values(objArray[i]);
                        //console.log('jjj', Object.keys(objArray[i])  +'-'+ Object.values(objArray[i]));
                        for (let p = 0; p < keyVal.length; p++) {
                            // console.log('keyval', upValKeys[p]+ '  - '+upValValues[p] )
                            tx.executeSql("insert into settings (name, value) values (?, ?)",
                                [keyVal[p], valueVal[p]], (_, { rows }) => {
                                    console.log("inserted ", rows._array);
                                }
                            )
                        }
                    }
                }
            })
        });

        let t = [];
        let numbers = [];
        let timers = [];
        let quiz = [];

        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM settings", [], (_, { rows }) => {
                // console.log('list123333', rows._array);
                t = rows._array;

                for (let i = 0; i < 8; i++) {
                    numbers.push({
                        name: t[i].name,
                        value: t[i].value
                    })
                }

                for (let i = 8; i < 11; i++) {
                    timers.push({
                        name: t[i].name,
                        value: t[i].value
                    })
                }

                for (let i = 11; i < 13; i++) {
                    quiz.push({
                        name: t[i].name,
                        value: t[i].value
                    })
                }

                dispatch(settingsActions.setQuizNumbers(numbers));
                dispatch(settingsActions.setQuizTimers(timers));
                dispatch(settingsActions.setQuizCondition(quiz));

                // console.log("tttt1", numbers)
                // console.log("tttt2", timers)
                // console.log("tttt3", quiz)
            }
            );
        });
    }, []);

    return (
        <MainNavigator />
    )
}

export default DbConfig;