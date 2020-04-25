import React from "react";
import { Image, TouchableOpacity } from "react-native";

export default class Forward extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Detail")}
      >
        <Image
            style={{ width:50,height:50,marginRight:10}}
            source={require('../assets/menu.png')}
          />
        
      </TouchableOpacity>
    );
  }
}
