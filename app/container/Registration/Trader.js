
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image, 
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import { Toolbar,Icon } from 'react-native-material-ui';

import RegistrationTrader from '../../components/Registration/RegistrationTraderpage';

import {bindActionCreators} from 'redux';

import * as loginAction from '../../action/loginAction';


var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

class Trader extends Component {

  constructor(props) {
    super(props);
    this.state={
      
    
     
    };
}

  componentWillMount(){ 
    console.log("willlll");
  }


  	render() {
        
	  return (

	  	<View style={{flex:1,backgroundColor:color.mainbackground,}}>	 
		  	
    		    <StatusBar
                backgroundColor={color.statusbar}
                barStyle="light-content"
                hidden={false}
            />    
    
            <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10,height:50,alignItems:'center'}}>

              <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{}}>
                <Icon name="arrow-back" color={'#000000'} size={22}/>
              </TouchableOpacity>

            </View>
  	         	
              <RegistrationTrader 
                  email={this.state.email}
                  token={this.state.token}
                  profilePic ={this.state.profilePic}

                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  username={this.state.username}
                
                  navigation={this.props.navigation} 
                  loginAction={this.props.loginAction}
                  login={this.props.login}
              />

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    fontFamily:'Roboto-Bold',
    fontSize:25,
    lineHeight:55,
    color:color.appTitle,
    textAlign:'left',
    fontWeight:'600',
  },

});


const mapStateToProps = state => {

  return {
    login : state.login,
  };
}

const mapDispatchToProps = dispatch => {
  // alert(JSON.stringify(loginAction));
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trader);
