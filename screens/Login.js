import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  BackHandler,
  AsyncStorage
} from "react-native";
const axios = require("axios");

import NetInfo from "@react-native-community/netinfo";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      islogin:false,
      data:null,
      isOnline: false,
    };
    this.backHandler = null
  }
  
  componentDidMount(){
    NetInfo.addEventListener(state => {
      this.setState({ isOnline: state.isConnected });
    });
    this.setBackHandler();
  }
  

  componentWillUnmount() {
    this.removeBackHandler();
  }

  removeBackHandler() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._handleBackButton
    );
  }

  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }

  _handleBackButton = () => {
    // console.log("Exit from app")
    BackHandler.exitApp();
    return true;
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  _handelLogin=()=>{
    if (this.state.isOnline) {
      if(this.state.username==null){
          alert("Username is required!");
      }else if(this.state.password==null){
          alert("Password is required!");
      }else{
          let data = {
              name: this.state.username,
              password: this.state.password
            };
          var self = this;
          axios
          .post("http://128.199.79.79/costomer-count/public/api/login", data, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(function(response) {
          //   console.log(response.data.data);
            if (response.data.success) {
              self.setState({
                data: response.data.data,
                islogin: true
              });
              
              var id = response.data.data.id.toString();
              var name = response.data.data.name;
              var branch_id = response.data.data.branch_id.toString();
              var branch_name = response.data.data.branch_name;

              AsyncStorage.multiSet(
                [
                  ["IS_SIGNED_IN", "true"],
                  ['ID',id],
                  ['NAME',name],
                  ['BRANCH_ID',branch_id],
                  ['BRANCH_NAME',branch_name]
                ],
                err => {
                  if (err) {
                      alert('Asynstorage Error');
                  } else {
                    self.props.navigation.navigate("Count");
                  }
                }
              );
            } else {
              // self.setState({ isLoginErrorModal: true });
              alert('Username or Password Incorrect!');
            }
          })
          .catch(function(error) {
            console.log("Error:", error);
          });
        
      }
    }else{
      alert('Please check your internet connection!');
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
      <KeyboardAvoidingView 
      style={styles.container} 
      behavior="padding" 
      enabled>
      <View
        style={styles.container}
      >
        <StatusBar hidden={true} />
        <View style={styles.loginForm}>
        <Image
            style={{ marginBottom: 5,width:200, height:100 }}
            source={require("../assets/logo.png")}
          />
          <Text 
           style={{ fontSize:18, marginBottom:50, textAlign:"center" }}>
             IT,Mobiel & Electronic Mart
            </Text>
          <Text style={styles.loginTitle}>Please Login</Text>
          <TextInput
            style={styles.input}
            value={this.state.username}
            placeholder="Username"
            placeholderTextColor="#22a6f1"
            autoCapitalize="none"
            onChangeText={name => this.onChangeText("username",name)}
          />
           <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            placeholder="Password"
            placeholderTextColor="#22a6f1"
            onChangeText={(psw) => this.onChangeText("password",psw)}
            />
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this._handelLogin()}
          >
            <Text style={styles.btnLoginText}>Login</Text>
          </TouchableOpacity>
        </View>
       
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  loginForm: {
    marginTop: 100,
    marginHorizontal: 50,
    fontFamily:"Dosis-Regular",
    justifyContent:"center",
    alignItems:"center"
  },
  loginTitle: {
    color: "gray",
    textAlign: "center",
    fontSize: 17,
    marginBottom:20
  },
  input: {
    textAlign: 'center',
    width: "100%",
    marginBottom:10,
    color: "gray",
    fontSize: 15,
    padding:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#22a6f1'
  },
  btnLogin:{
    backgroundColor:'blue',
    width: "30%",
    height:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginBottom:20
  },
  btnLoginText:{
      color:'white',
      textAlign:"center",
      textAlignVertical:"center",
      fontSize: 15,
  }
});
