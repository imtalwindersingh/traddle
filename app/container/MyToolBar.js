

import React, { Component, PropTypes } from 'react';
import {

  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl,SectionList,FlatList,TextInput,Picker,ImageBackground,
  Dimensions,ListView,Modal,ToolbarAndroid,ToastAndroid,NetInfo,ScrollView
} from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
// import EventEmitter from "react-native-eventemitter";
// var EventEmitter = require('./events/EventEmitter');
// var AuthUtility=require('./lib/AuthUtility');
var color=require('../style/color');
import { Avatar,Toolbar,BottomNavigation,Icon,ListItem ,Button} from 'react-native-material-ui';
import { connect ,Provider} from 'react-redux';
import * as loginAction from '../action/loginAction';
import {bindActionCreators} from 'redux';


class MyToolBar extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     language:'En',
        //     categoryArray:[
        //       {key:"En",value:"En"},{key:"Hi",value:"Hi"}
        //     ],
        //     user:null,
        //     token:"",
        // };
    }
    componentWillMount(){
        var that=this;
    // this.eventEmitter = EventEmitter;
    // this.eventEmitter.addListener('language',this.language.bind(this));
    // EventEmitter.on("userUpdate",this.userUpdate.bind(this));
    // const { navigation } = this.props;
    // const language = navigation.getParam('language', "");   
    // // alert("tool"+language);
    // this.setState({language:language});
    // // alert(JSON.stringify(this.props.login.loginData));
    // if(this.props.login.loginData!=undefined){
    //     this.setState({user:this.props.login.loginData.user,token:this.props.login.loginData.token});
    //   }
    // AuthUtility.getToken(function(val){
    //     AuthUtility.getKey('user',function(user){
    //       that.setState({token:val,user:JSON.parse(user)});
    //     });
    // });
    
    }
    userUpdate(val){
      this.props.loginAction.restoreLoginData();
        // var that=this;
        //     AuthUtility.getKey("user",function(user){
        //       console.log("eiit",user);
        //       that.setState({user:JSON.parse(user)});
        //     });
          
    }
    
    componentWillUnmount(){
      // EventEmitter.removeListener('language', function(){});
    }
   // language(val){
   //      this.setState({language:val});
      // }
  //   componentWillReceiveProps(nextProps){
  //   alert(nextProps.language);
  //   if(nextProps.language!=="undefined"){

  //     this.setState({language:nextProps.language});
  //   }
  //   if(this.state.language!=="null"){
  //       EventEmitter.emit("language",this.state.language);
  //   }
  // }
  renderUser(){
     
     // var user=null,token=null;
    //  if(this.props.login.loginData!=null){
    //   token=this.props.login.loginData.token;
    //   user=this.props.login.loginData.user;
    //   // alert("uRE"+user);
    //   }
    //   console.log("REee",user);
    // if(user!=null){
    //   if(user.image!==undefined){
    //     console.log("rennn",user.image);
    //   return(
    //     <TouchableOpacity style={{flex:0,width:30}} onPress={()=>this.props.navigation.navigate('Profile',{language:this.state.language,mode:"update"})}>
    //        {this.renderImg(user)}
           
    //         </TouchableOpacity>   );
    //   }
    // }else{
    //   console.log("renn",user);
    //   return(
    //     <TouchableOpacity style={{flex:0,width:30}} onPress={()=>{EventEmitter.emit("loginVisible",true)}}>
    //         <Image source={require('../Images/user.png')}
    //         style={{width:30,height:30,alignItems:'center',marginRight:10,justifyContent:'center',marginBottom:5,marginTop:5,paddingRight:10}} />
    //         </TouchableOpacity>   );
    // }
  }
  // renderImg(user){
  //   // for image is optional so it gives '' here
  //   if(user.image==''){
  //     return(<Image source={require('../Images/user.png')}
  //       resizeMethod="resize"
  //       style={{width:30,height:30,borderRadius:15,alignItems:'center',marginRight:10,justifyContent:'center',marginBottom:5,marginTop:5,paddingRight:10}} />);
  //   }else{
  //     return( <Image source={{uri:user.image}}
  //       resizeMethod="resize"
  //       style={{width:30,height:30,borderRadius:15,alignItems:'center',marginRight:10,justifyContent:'center',marginBottom:5,marginTop:5,paddingRight:10}} />);
  //   }
  // }
    render(){
      
        return (
    
            <View>	 
            <StatusBar
            hidden={false}
            backgroundColor={color.mainbackground}
            barStyle="light-content"
        />
          <View style={{height:1,borderBottomWidth: 0,borderWidth:1,borderColor:'#6ca829',backgroundColor:'#6ca829',elevation:0.5,width:Dimensions.get('window').width}}></View>  
        <Toolbar
        leftElement="menu"
        // centerElement={
    
        //     <Image source={require('../../components/Images/enter-name.png')}
        //     resizeMode="center"
        //     style={{height:60,alignItems:'center',marginLeft:50,marginTop:6,justifyContent:'center',marginBottom:6,width:110}} />
        // }
        rightElement={

        <View style={{height: 48,width:110,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:color.mainbackground,marginRight:10}}>
         
        
            {this.renderUser()}
              
            
        </View>
        
        }
    onLeftElementPress={()=>{this.props.navigation.openDrawer()}}
    style={{
        container: {backgroundColor:color.mainbackground,elevation:0,alignItems:'center'},
        leftElement:{color:color.toolTitleColor},
        centerElement:{alignItems:'center',justifyContent:'center',flex:1},
        rightElement:{color:color.toolTitleColor,flex:0},
    }}
    />
    </View>
        );

    }

}
// module.exports = MyToolBar;
const mapStateToProps = state => {

    return {
      login : state.login,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    // alert(JSON.stringify(loginAction));
    return {
      loginAction : bindActionCreators(
        loginAction, dispatch,
      ),
  
    };
  }
  // module.exports =LoginModal ;
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyToolBar);