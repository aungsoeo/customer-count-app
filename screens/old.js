import React from "react";
import {
  View,
  Text,
  Image,
  Picker,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

const axios = require("axios");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenValue: "1",
      choosenIndex: "",
      count:'0',
      total:0,
      branch:'LINN HO'
    };
  }

   componentDidMount=async()=> {
    await this.getCustomerCount();
  }
  getCustomerCount() {
    this.setState({ total:0 });
    const self = this; // *

    var url ="http://128.199.79.79/costomer-count/public/api/count/"+this.state.choosenValue;

     axios
      .get(url)
      .then(function(response) {
        self.setState({ total:0 });
        if(response.data.data.length>0){
          self.setState({ total: response.data.data[0].count });
        }else{
          self.setState({ total:0 });
        }
        
      })
      .catch(function(error) {
        //When api call fail, catch function will work
        console.log(error);
      });
  }


  _handleSave= async()=> {
    const self = this;
    await axios
      .post("http://128.199.79.79/costomer-count/public/api/update/count", {
        branch: self.state.choosenValue,
        count: self.state.count
      })
      .then(function(response) {
        alert("Successfully Save!");
      })
      .catch(function(err) {
        alert("Error in Save");
        console.log(err);
      });

    this.getCustomerCount();
  }

  _handleChangeBranch=async(value,index)=>{

    if(value=='1'){
      await this.setState({ branch:"LINN HO"});
    }
    if(value=='2'){
      await this.setState({ branch:"LINN 1"});
    } 
    if(value=='3'){
      await this.setState({ branch:"LINN 2"});
    }

    await this.setState({ total:0, choosenValue: value, choosenIndex: index });

    await this.getCustomerCount();
  }

  _handleIncrement(){
    var updatecount = parseInt(this.state.count)+1;
    this.setState({ count: updatecount.toString() });
  }
  _handleDecrement(){
    var updatecount = parseInt(this.state.count)-1;
    this.setState({ count: updatecount.toString()});
  }
  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return (
      <View style={styles.container}>
        <View style={{ justifyContent:"center", alignItems:'center'}}>
          <Image
            style={{ marginBottom: 50,width:200, height:100 }}
            source={require("./assets/logo.png")}
          />
          <Text 
           style={{ fontWeight:"bold", fontSize:22, marginBottom:10, textAlign:"center" }}>
             Customer count during Covid-19
            </Text>
          <Text 
            style={{ fontWeight:"bold",color:'blue', fontSize:20, marginBottom:10, textAlign:"center" }}>
              {this.state.branch} - {this.state.total} 
          </Text>
          <Text 
           style={{ fontWeight:"bold", fontSize:15, marginBottom:50, textAlign:"center" }}>
             {today}
          </Text>
        </View>
        <View style={styles.formContainer}>

          <Text>Select Branch</Text>
          <Picker
            selectedValue={this.state.choosenValue}
            onValueChange={(itemValue, itemIndex) =>this._handleChangeBranch(itemValue,itemIndex)}
          >
            <Picker.Item label="LINN HO" value="1" />
            <Picker.Item label="LINN 1" value="2" />
            <Picker.Item label="LINN 2" value="3" />
          </Picker>

          <View style={{ flexDirection:"row", marginTop:10 }}> 
              <TouchableOpacity 
                style={{flex:1, height:40, backgroundColor:'gray', justifyContent:"center", alignItems:"center", padding:10}}
                onPress={() => this._handleDecrement()}>
                    <Text style={styles.createBtnText, {fontSize:80,color:'white', marginBottom:15}}> - </Text>
              </TouchableOpacity>
              <View style={{width:'40%', paddingHorizontal:10 }}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.count}
                  keyboardType = 'numeric'
                  onChangeText={value => this.setState({ count: value })}
                />
              </View>
              <TouchableOpacity 
                  style={{flex:1, height:40, backgroundColor:'gray',justifyContent:"center", alignItems:"center", padding:10}}
                  onPress={() => this._handleIncrement()}>
                        <Text style={styles.createBtnText, {fontSize:40,color:'white', marginBottom:5}}>+</Text>
              </TouchableOpacity> 
          </View>

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => this._handleSave()}
          >
            <Text style={styles.createBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    width: '80%',
    marginBottom:100
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderStyle: "solid",
    textAlign:"center",
    fontSize:20
  },
  createBtn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    marginTop: 10
  },
  createBtnText:{
    color: 'white'
  }
});
