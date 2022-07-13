import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';

import Main from '../../screens/FoodApp/Main';
import Categories from '../../screens/FoodApp/Categories';
import CategoryDetail from '../../screens/FoodApp/CategoryDetail';
import Favorites from '../../screens/FoodApp/Favorites';
import AboutScreen from '../../screens/FoodApp/About';

import { Ionicons } from '@expo/vector-icons'

const MainNavigation = createStackNavigator({
    MainScreen: Main,
    CategoriesScreen: Categories,
    CategoryDetailScreen: CategoryDetail    
});

const favoriteStack = createStackNavigator({
    favorite: Favorites
})

const aboutStack = createStackNavigator({
    About: {
        screen: AboutScreen,
        navigationOptions: {
            headerTitle: "About us"
        }
    }
})


const tabNavigatorConfig = {
    Home: {
        screen: MainNavigation,
        navigationOptions: {
            tabBarLabel: "HOME!",
            tabBarIcon: (tabInfo) => <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />,
            tabBarColor: "red"
        }
    },
    Favorites: {
        screen: favoriteStack,
        navigationOptions: {
            tabBarLabel: "Favorites",
            tabBarIcon: (tabInfo) => <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />,
            tabBarOptions: {
                activeBackgroundColor: "red",
                inactiveBackgroundColor: "blue"
            }
        }
    }
}

const TabNavigator = (Platform.OS === "android") ?
    createMaterialBottomTabNavigator(tabNavigatorConfig, {
        activeColor: "white",
        shifting: true,
        inactiveColor: "gray",
        backgroundColor: 'red'

    })
    : createBottomTabNavigator(tabNavigatorConfig, {
        tabBarOptions: {
            activeBackgroundColor: "red",
            activeTintColor: "white",
            inactiveBackgroundColor: "gray",
            inactiveTintColor: "black"
        }
    })

const MainNavigator = createDrawerNavigator({
    Home: TabNavigator,
    About: aboutStack    
})

export default createAppContainer(MainNavigator);