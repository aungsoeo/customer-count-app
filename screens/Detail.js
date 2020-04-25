import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  RefreshControl,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";

const axios = require("axios");

import { AntDesign } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import AppJson from '../app.json';

var today = new Date();
var date =
  today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

var hours = today.getHours();
var minutes = today.getMinutes();
var ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? "0" + minutes : minutes;
var strTime = hours + ":" + minutes + " " + ampm;

var dateTime = date + "  " + strTime;

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      total: 0,
      ho: 0,
      l1: 0,
      l2: 0,
      summarytotal: 0,
      hototal: 0,
      l1total: 0,
      l2total: 0,
      date: new Date(),
      setState: new Date(),
      mode: "calendar",
      setMode: "calendar",
      show: false,
      setShow: false,
    };
    this._handleBackPress = this._handleBackPress.bind(this);
    this.backHandler = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackPress
    );
    this.getSummaryCount(date);
    this.setState({ currentDateTime: dateTime });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _handleBackPress = () => {
    this.props.navigation.navigate("Count");
    return true;
  };

  getSummaryCount(cdate) {
    const self = this; // *

    var url = "http://128.199.79.79/costomer-count/public/api/summary?date="+cdate;

    axios
      .get(url)
      .then(function (response) {

        self.setState({
          ho: response.data.data.todayho,
          l1: response.data.data.todayl1,
          l2: response.data.data.todayl2,
          total:response.data.data.todaytotal,

          hototal: response.data.data.hototal,
          l1total: response.data.data.l1total,
          l2total: response.data.data.l2total,
          summarytotal:response.data.data.summarytotal,

          refreshing: false,
          currentDateTime: null,
        });
      })
      .catch(function (error) {
        //When api call fail, catch function will work
        console.log(error);
      });
  }

  onRefresh = () => {
    this.setState({ total: 0, ho: 0, l1: 0, l2: 0 });
    this.getSummaryCount(date);
  };

  onChange = (event, selectedDate) => {
    var changdate =
      selectedDate.getDate() +
      "." +
      (selectedDate.getMonth() + 1) +
      "." +
      selectedDate.getFullYear();
    this.setState({
      currentDateTime: changdate + "  " + strTime,
      show: false,
    });
    this.setState({ total: 0, ho: 0, l1: 0, l2: 0 });
    this.getSummaryCount(changdate);
  };

  showMode = (currentMode) => {
    // this.setState({
    //   setShow:true,
    //   setMode:currentMode
    // })
  };

  showDatepicker = () => {
    this.setState({ showMode: "date", show: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        >
          <View
            style={{
                borderWidth: 0,
                borderColor: "gray",
                borderRadius: 1,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                margin: 5,
                paddingTop:5,
                paddingHorizontal: 50,
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", height: 50 }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 15,
                    textAlign: "center",
                    fontWeight:'bold',
                  }}
                >
                  Today Customer Counting
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "20%" }}>
                  <TouchableOpacity onPress={() => this.showDatepicker()}>
                    <AntDesign name="calendar" size={30} color="#900" />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    {this.state.currentDateTime != null
                      ? this.state.currentDateTime
                      : dateTime}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {this.state.total}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18, marginTop: 7 }}
                  >
                    Head Office
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {this.state.ho}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1, alignContent: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18, marginTop: 7 }}
                  >
                    Linn 1
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {this.state.l1}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18, marginTop: 7 }}
                  >
                    Linn 2
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {this.state.l2}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                margin: 5,
                paddingTop:5,
                paddingHorizontal: 50,
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", height: 50 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight:'bold',
                    marginBottom: 15,
                    textAlign: "center",
                  }}
                >
                   Customer Count Summary
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18 }}
                  >
                    Head Office
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {this.state.hototal}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1, alignContent: "center" }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18 }}
                  >
                    Linn 1
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {this.state.l1total}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18}}
                  >
                    Linn 2
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {this.state.l2total}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  margin: 5,
                  padding: 5,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 18}}
                  >
                    Total
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {this.state.summarytotal}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, marginTop:20 }}>
              <Text style={{ fontSize: 15, textAlign: "center" }}>App Version {AppJson.expo.version}</Text>
              <Text style={{ fontSize: 14,fontWeight:'300', textAlign: "center" , marginTop:5, marginBottom:5}}>Developed By Linn R&D</Text>
            </View>
          </View>

          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="calendar"
              onChange={this.onChange.bind()}
            />
          )}
        </RefreshControl>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
