import React from 'react';
import { View, ActivityIndicator } from "react-native";

import * as Font from 'expo-font';

import StackNavigator from './StackNavigator';
import welcomeStyle from "./styles/LoginStyle";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded : false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      "Pyidaungsu-Bold": require('./assets/fonts/pyidaungsu/Pyidaungsu-Bold.ttf'),
      "Pyidaungsu-Regular": require('./assets/fonts/pyidaungsu/Pyidaungsu-Regular.ttf'),
      "Linn-Light": require("./assets/fonts/linn/Linn-Caracas-Light.otf"),
      "Linn-Medium": require("./assets/fonts/linn/Linn-Caracas-Medium.otf"),
      "Linn-Regular": require("./assets/fonts/linn/Linn-Caracas.otf")
    });

    //this.setState will wait until font loadAsync done with await keyword
    this.setState({ fontLoaded: true})
  }

  render(){
    if(this.state.fontLoaded){
      return (
      <StackNavigator/>
      );
    }else{
      return (
        <View style={welcomeStyle.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  }
}
