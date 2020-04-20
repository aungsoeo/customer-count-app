import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  BackHandler,
  Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
    this._handleBackPress = this._handleBackPress.bind(this);
    this.backHandler = null
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _handleBackPress = () => {
    this.props.navigation.navigate("Home");
    return true;
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  _handelLogin=()=>{
    if(this.state.username==null){
        alert("Username is required!");
    }else if(this.state.password==null){
        alert("Password is required!");
    }else{
      Alert.alert(
        "Success",
        "Login Successful!",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Home")
          }
        ],
        { cancelable: false }
      );
      
    }
    
  }

  clearState(){
    this.setState({
      username:null,
      password:null
  });
  }
  render() {
    return (
      <LinearGradient
        colors={["#27C79D", "#052E23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <KeyboardAvoidingView  behavior="padding" enabled>
        <StatusBar hidden={true} />
        <View style={styles.loginForm}>
          <Text style={styles.loginTitle}>Login Information</Text>
          <TextInput
            style={styles.input}
            value={this.state.username}
            placeholder="Username"
            placeholderTextColor="white"
            autoCapitalize="none"
            onChangeText={name => this.onChangeText("username",name)}
          />
           <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={(psw) => this.onChangeText("password",psw)}
            />
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this._handelLogin()}
          >
            <Text style={styles.btnLoginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginForm: {
    marginTop: 200,
    marginHorizontal: 50,
    fontFamily:"Dosis-Regular",
  },
  loginTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom:30
  },
  input: {
    width: "100%",
    marginBottom:20,
    marginTop:10,
    color: "white",
    fontSize: 15,
    paddingLeft:1,
    borderBottomWidth:1,
    borderBottomColor:'white'
  },
  btnLogin:{
    backgroundColor:'#27C79D',
    width: "100%",
    height:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  btnLoginText:{
      textAlign:"center",
      textAlignVertical:"center",
      fontSize: 15,
  }
});
