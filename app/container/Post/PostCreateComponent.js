
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
} from 'react-native';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as postAction from '../../action/postAction';
var AuthUtility= require('../../reducer/lib/AuthUtility');
var ApiUtility= require('../../reducer/lib/ApiUtility');
var Config = require('../../Config');

import { Toolbar,Icon } from 'react-native-material-ui';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PostComponent from '../../components/Post/PostComponent';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');


class Post extends Component {

constructor(props) {
    super(props);
    this.state={
        _id:'',
        type:null,
        uri:null
    };
}


componentWillMount(){
// alert(this.props.bottomTab)

  const { navigation } = this.props;
  const type = navigation.getParam('type', null); 
  const uri = navigation.getParam('uri', null); 

   this.setState({type:type,uri:uri});

}
  	render() {
        
      // if(this.props.login.update == true){
      //   this.props.navigation.navigate('HomePage'); 
      // }


	  return (

      <View style={{flex:1,backgroundColor:color.mainbackground}}>   

		  	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />
                      <PostComponent 
                      type={this.state.type}
                      uri={this.state.uri}
                      navigation={this.props.navigation}
                      loginAction={this.props.loginAction}
                      postAction={this.props.postAction}
                      login={this.props.login}
                    />
                  
	    </View>
	  );
	}
}


const styles = StyleSheet.create({
  titleText:{
    // fontFamily:'AirbnbCerealApp-Bold',
    fontSize:25,
    lineHeight:55,
    color:color.appTitle,
    textAlign:'left',
    fontWeight:'600',
  },

});


const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login : state.login,

  };
}

const mapDispatchToProps = dispatch => {
  
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
    postAction : bindActionCreators(
      postAction, dispatch,
    ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
