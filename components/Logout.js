import React from "react";
import { Image, TouchableOpacity } from "react-native";

export default class Logout extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Login")}
      >
        <Image
            style={{ width:30,height:30, marginRight:10}}
            source={require('../assets/logout.png')}
          />
        
      </TouchableOpacity>
    );
  }
}
