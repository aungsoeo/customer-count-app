import React from "react";
import { StyleSheet, Text } from "react-native";


export default class Title extends React.Component {
  render() {
    return (
      <Text style={styles.text} numberOfLines={1}>{this.props.title.length < 20 ? this.props.title : this.props.title.substring(0, 19) + "..."}</Text>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: 'black',
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20
  },
});
