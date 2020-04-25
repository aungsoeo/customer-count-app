import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  BackHandler,
  AsyncStorage,
  RefreshControl,
} from "react-native";

const axios = require("axios");

export default class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      branch_name: null,
      branch_id: null,
      refreshing: true,
    };
    this._handleBackPress = this._handleBackPress.bind(this);
    this.backHandler = null;
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackPress
    );

    await AsyncStorage.getItem("BRANCH_NAME")
      .then((response) => {
        this.setState({ branch_name: response });
      })
      .catch((err) => {});

    await AsyncStorage.getItem("BRANCH_ID")
      .then((response) => {
        this.setState({ branch_id: response });
        this.getCustomerCount();
      })
      .catch((err) => {});
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _handleBackPress = () => {
    // this.props.navigation.navigate("Login");
    return true;
  };

  getCustomerCount() {
    const self = this; // *

    var url =
      "http://128.199.79.79/costomer-count/public/api/count/" +
      this.state.branch_id;

    axios
      .get(url)
      .then(function (response) {
        self.setState({ total: 0 });
        if (response.data.data.length > 0) {
          self.setState({ total: response.data.data[0].count });
        } else {
          self.setState({ total: 0 });
        }
        self.setState({ refreshing: false });
      })
      .catch(function (error) {
        //When api call fail, catch function will work
        console.log(error);
      });
  }

  onRefresh = () => {
    this.setState({ total: 0 });
    this.getCustomerCount();
  };

  _handleIncrease = async () => {
    const self = this;
    await axios
      .post("http://128.199.79.79/costomer-count/public/api/update/count", {
        branch: self.state.branch_id,
        count: 1,
      })
      .then(function (response) {
        // alert("Successfully Save!");
      })
      .catch(function (err) {
        // alert("Api Error");
        // console.log(err);
      });

    this.getCustomerCount();
  };

  _handleDecrease = async () => {
    const self = this;
    await axios
      .post("http://128.199.79.79/costomer-count/public/api/decrease/count", {
        branch: self.state.branch_id,
        count: 1,
      })
      .then(function (response) {
        // alert("Successfully Save!");
      })
      .catch(function (err) {
        // alert("Api Error");
        // console.log(err);
      });

    this.getCustomerCount();
  };

  render() {
    var today = new Date();
    var date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    var dateTime = date + "  " + strTime;

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        >
          <View style={styles.container}>
            <Text style={styles.branchLabel}>{this.state.branch_name}</Text>
            <Text style={styles.label}>{dateTime}</Text>
            <Text style={styles.label}>Number of Customer Counting</Text>
            <Text style={styles.countNo}>{this.state.total}</Text>
            <View style={styles.btnContainer}>
              <View style={styles.loginContainer}>
                <TouchableOpacity
                  style={[styles.btnNeg]}
                  onPress={() => this._handleDecrease()}
                >
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.regContainer}>
                <TouchableOpacity
                  style={[styles.btnPlus]}
                  onPress={() => this._handleIncrease()}
                >
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RefreshControl>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  branchLabel:{
    fontWeight:'bold',
    fontSize: 20,
    marginBottom: 30,
  },
  label: {
    color: "gray",
    fontSize: 20,
    marginBottom: 30,
  },
  countNo: {
    color: "gray",
    fontSize: 40,
    marginBottom: 30,
  },
  btnNeg: {
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnPlus: {
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  btnText: {
    color: "gray",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 50,
    marginBottom: 10,
  },
});
