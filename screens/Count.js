import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,StatusBar } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default class Count extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
          colors={[
              "#27C79D", 
              "#052E23"
          ]}
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 1}}
          style={ styles.container}
        >
        <StatusBar hidden={true} />
        <Text style={styles.welcomeTxt}>WELCOME</Text>
        <View style={styles.btnContainer}>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={()=>navigate("Login")}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.regContainer}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => navigate("Register")}
              >
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
            </View>
            
            
        </View>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:"100%", 
    height:"100%",
  },
  welcomeTxt:{
    color:'white',
    fontWeight:'700',
    fontSize:25,
    fontFamily:"Dosis-Bold",
  },
  btnContainer:{
    flexDirection:'row',
    margin:20,
    borderRadius:20,
    width:300,
    overflow:'hidden'
  },
  loginContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#27C79D'
  },
  regContainer:{
    flex:1,
    backgroundColor:'#F5F7FA',
    justifyContent:'center',
    alignItems:'center',
  },
  btn: {
    paddingVertical:15,
    width: 200,
    justifyContent:'center',
    alignItems:'center'
  },
  btnText: {
    fontSize:16,
  }
});
