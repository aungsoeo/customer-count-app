import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import screen
import Login from './screens/Login';
import Count from './screens/Count';
import Detail from './screens/Detail';


const StackNavigatiorConfig ={
    initialRouteName : 'Login'
}


const RouteConfigs = {
    Login : { 
        screen: Login,
        navigationOptions:()=>({
            headerStyle: {
                backgroundColor:"#235",
                borderBottomWidth: 0, //For IOS to hide header bottom shadow color
                elevation: 0 //For Android to hide header bottom shadow color
            },
            
            headerTitleStyle:{
                color:'white',
                width:'90%',
                textAlign:'center'
            }
        }) 
    },
    Count : { 
        screen: Count ,
        navigationOptions:()=>({
            title: "Count",
            headerStyle: {
                backgroundColor:"#235",
            },
            headerTitleStyle:{
                color:'white',
                width:'80%',
                textAlign:'center',
                fontFamily: "Linn-Regular",
                fontWeight:'300'
            },
            headerTintColor:"white"
        }) 
    },
    Detail : { 
        screen: Detail,
    },
    
   
}

export default createAppContainer(
    createStackNavigator(RouteConfigs,StackNavigatiorConfig)
)