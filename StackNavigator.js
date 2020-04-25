import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from "react";

//import screen
import Login from './screens/Login';
import Count from './screens/Count';
import Detail from './screens/Detail';

import Title from "./components/Title";
import Forward from "./components/Forward";
import Logout from "./components/Logout";


const StackNavigatiorConfig ={
    initialRouteName : 'Login'
}


const RouteConfigs = {
    Login : { 
        screen: Login,
        navigationOptions: () => ({
            headerShown: false
          }),
        
    },
    Count : { 
        screen: Count ,
        navigationOptions: ({ navigation }) => ({
            headerTitle:()=> <Title  title={"Customer Counting"} />,
            headerRight:()=> <Forward navigation={navigation} routeName="Detail" />,
            headerLeft: ()=>null
          })
    },
    Detail : { 
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
            // title: "Count Summary",
            headerTitle:()=> <Title  title={"Count Summary"} />,
            headerRight:()=> <Logout navigation={navigation} routeName="Login" />
          })
    },
    
   
}

export default createAppContainer(
    createStackNavigator(RouteConfigs,StackNavigatiorConfig)
)