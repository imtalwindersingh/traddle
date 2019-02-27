

//App intro. screen 

import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,TextInput,
  StatusBar,  
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Toolbar,Button,Icon } from 'react-native-material-ui';
// import PhoneNumberPicker from 'react-native-country-code-telephone-input'
import ValidationComponent from 'react-native-form-validator';
// import ImageSinglePick from '../../common/ImageSinglePick';
var Config = require('../../Config');
var ApiUtility=require('../../reducer/lib/ApiUtility')
var AuthUtility=require('../../reducer/lib/AuthUtility')
var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';


var DatePickerModal=require('../../common/DatePickerModal');

class ComoditySelection extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state={
  
      //Login Form Fields..

        showDate:false,
      datePickerModalVisible:false,
       birthdate:'',      

      name:this.props.username,
      email:'',
      password:'',
      confirmpassword:"",
      isLoading:false,
  
      //Login Form validation fields..
      checkname:[],
      checkEmail : [],
      checkPassword:[],
      checkconfirmpassword:[],
      checkmobileno:[],
      checkregImgSinglePick:[],
  
      //Custom
      disabled:true,
      countryName:"",
      callingCode:"",
      phoneNo:"",
      regImageSinglePick:this.props.profilePic,
      disabled:false,

      country:'india',
      statename:'gujarat',
      city:'rajkot',
      location:'22.230000,63.776000',
      fcmToken:null,
    };
  }


_onSubmitButton() {
  const { navigation } = this.props;
  const country_code = navigation.getParam('country_code', '');
  const phone_number = navigation.getParam('phone_number', ''); 
  const social = navigation.getParam('social','');
  const token = navigation.getParam('token', ''); 

    const email = navigation.getParam('email', ''); 
const profilePic=navigation.getParam('profilePic','');
const firstname=navigation.getParam('firstname','');
const lastname=navigation.getParam('lastname','');
const username =navigation.getParam("username",'');
const name=navigation.getParam('name','');
const socialid=navigation.getParam('socialid','');
 
    // const email = this.props.email;

    var that=this;
    var errorStatus=0;
   // Call ValidationComponent validate method
    var isMyFormValidate =this.validate({
      // name:{required:true},
      // email: {required: true,},
      password:{required: true,minlength:4},
      confirmpassword:{required:true,minlength:4}
    });
  
    this.setState({
      // checkname:this.getErrorsInField('name'),
      checkconfirmpassword:this.getErrorsInField('confirmpassword'),
      checkEmail : this.getErrorsInField('email'),
      checkPassword : this.getErrorsInField('password'),
      // checkmobileno:this.getErrorsInField('mobileNo'),
    });

    if(this.state.password != this.state.confirmpassword)
    {
      alert('password and confirmpassword must be same');
      return;
    }
   
    // if(this.state.fcmToken == null) //these 2 lines commented to solve app crash at clickon registeration button
    // return; 


 // if(this.state.phoneNo == ''){
  //   this.setState({checkmobileno : ['Required Field.']});
  //   errorStatus=1;
  // }
  
  // if(this.state.regImageSinglePick == ''){
  //   this.setState({checkregImgSinglePick : ['Required Field.']});
  //   errorStatus=1;
  // }
  
    
    console.log('this.isFormValid()1::',this.state.callingCode);
     
     if(isMyFormValidate){
    // this.setState({disabled:false});
    // alert("this.props.lastname"+this.props.lastname);
      console.log('this.isFormValid()::',email,profilePic,firstname,lastname);
      var bundle = {
        "token":token,
        "lastname":lastname,
        "firstname":firstname,
        "birthdate":this.state.birthdate,
        "username":this.state.name,
        "image":this.state.regImageSinglePick,
        "email" : email,
        "password" : this.state.password,
        'loc':this.state.location,
        'country':this.state.country,
        'city':this.state.city,
        'state':this.state.statename,
        'phoneno':phone_number,
        'countrycode':country_code,
        };
    
      var path = Config.API_URL+'/user/create';
      ApiUtility.fetchPost(path,bundle,function(response){
        
        // console.log("thim",response);
        if(response.success){
            alert('Registration done successfully');
             // AuthUtility.setKey("isContact",'true',function(){
             //        });
              // that.props.navigation.navigate('LoginPage');
              var bundle = {
                    // 'logintype':'social',
                    // "email" : email,
                    "username":that.state.name,
                    "password" :that.state.password,
                  };

          //      Contacts.checkPermission( (err, permission) => {
          //   // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
          //   if(permission === 'undefined'){
          //     Contacts.requestPermission( (err, permission) => {
          //       // ...
          //     })
          //   }
          //   if(permission === 'authorized'){
          //     console.log("authorized");
          //     Contacts.getAll( (err, contacts) => {
          //     // //update the first record
          //     let someRecord = contacts[0]
          //     console.log("connn"+JSON.stringify(contacts));
          //     // someRecord.emailAddresses.push({
          //     //   label: "junk",
          //     //   email: "mrniet+junkmail@test.com",
          //     })
          //     // yay!
          //   }
          //   if(permission === 'denied'){
          //     // x.x
          //   }
          // })

                var path = Config.API_URL+'/auth/social-login';
                // repeat call sociallogin for token get in social api 
                if(social == 'instagram'){
    

    var bunch = {
      type:'instagram',
      instagramid:socialid,
      username:username,
      facebookid:null,
      name:name,
      firstname:firstname,
      lastname:lastname,
      email:email,
      image:profilePic,
      devicetype:'mobile',
      reqSource:'mobile',
    };
  }
  else{
    var bunch = {
      type:'facebook',
      instagramid:null,
      facebookid:socialid,
      username:username,
      name:name,
      email:email,
      firstname:firstname,
      lastname:lastname,
      image:profilePic,
      devicetype:'mobile',
      reqSource:'mobile',
    };
  }
      
      ApiUtility.fetchPost(path,bunch,function(response){

       console.log('/auth/social-login:=>',response);

        if(response.success == true)
        {
          
         var expiretime=new Date().getTime()+parseInt(response.expiretime); 
              //console.log("refres--",response.refreshtoken);    
              AuthUtility.setToken(response.token,function(){
                AuthUtility.setKey("expiretime",expiretime.toString(),function(){
                  AuthUtility.setKey("refreshtoken",response.refreshtoken,function(){
                    AuthUtility.setKey("userData",JSON.stringify(response.data.user),function(){    
                      AuthUtility.setUser(response.data.user);
                      console.log("userrrrrr"+JSON.stringify(response.data.user));
                      // alert(response.message)
                          // alert("@@@@@"+response.message)
                          that.props.navigation.navigate('HomePage');
                    });
                  });
                });
         
              });
        }
        

       },function(error){
        //  Actions.Actions.Home({ type: 'reset'});
      });
               
                


            }
            
          },function(error){
            
            // ToastAndroid.show('Connection not available...Retry!', ToastAndroid.LONG);
    
            that.setState({
              isLoading: false,
            });
    
          });
    
    }
    else{
      return;
  }
  }
     
 PhoneNumberPickerChanged(country, callingCode, phoneNumber){
    this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
 }

checkUniqueUserName(){
  // console.log('checkUniqueEmail');
  
  //   var that=this;
  //   var errorStatus=0;
  //  // Call ValidationComponent validate method
  //   var isMyFormValidate =this.validate({
  //     name:{required:true},
  //     // email: {required: true,},
  //     password:{required: true,minlength:4},
  //     confirmpassword:{required:true,minlength:4}
  //   });
  
  //   this.setState({
  //     checkname:this.getErrorsInField('name'),
  //     checkconfirmpassword:this.getErrorsInField('confirmpassword'),
  //     checkEmail : this.getErrorsInField('email'),
  //     checkPassword : this.getErrorsInField('password'),
  //     // checkmobileno:this.getErrorsInField('mobileNo'),
  //   });

  // var that=this;
   
  //   if(that.state.name != '')
  //   {

  //     var bunch={
  //       key:'username',
  //       value:that.state.name,
        
  //     };

  //     var path = Config.API_URL+'/user/unique-check';
  //         ApiUtility.fetchPost(path,bunch,function(response){
            
  //           console.log('/user/unique-check:',response);

  //           if(response.data.isduplicate == true)
  //           {
  //                 alert('Username must be unique');
  //                 return;
  //           }  
  //           else{
  //             that._onSubmitButton();
  //           }
  //         },function(error){
              
  //         });
  //   }
 
}

oncloseDatePickerModal(bdate){

    this.setState({
        birthdate:bdate,
        datePickerModalVisible : false,
      }); 

  }

 showDatePicker(){
        this.setState({
          datePickerModalVisible:true
        })
  }


  render(){
    
   //  if(this.props.login.loginData != null){
      
   //    if(typeof this.props.login.loginData != undefined && this.props.login.isLoading==false ){
    
   //      if(this.props.login.loginData.success){
   //        this.props.navigation.navigate('HomePage');
   //      }
     
   //    }
   // }

    // alert(this.props.username)
    return(
        <View style={{flex:1,backgroundColor:color.mainbackground}}>
        
          <ScrollView>
    
            <View style={[CommonStyle.mainFullScreenContainer,{justifyContent:'center',paddingTop:30}]}>

              <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>USER NAME</Text>
              <TextInput ref="name"                  
                  underlineColorAndroid={this.state.checkname.length?'red':color.underlineColorAndroid} 
                  onChangeText={(name) => this.setState({name:name})} 
                  value={this.state.name}
                  editable={false}
                  style={CommonStyle.textInputStyle} />
                  { /**this.state.checkname ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkname[0]}</Text> : null**/}

                <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>PASSWORD</Text>
                <TextInput ref="password"                    
                  secureTextEntry={true} 
                  underlineColorAndroid={this.state.checkPassword.length?'red':color.underlineColorAndroid} 
                  onChangeText={(password) => this.setState({password:password})} 
                  value={this.state.password}
                  style={CommonStyle.textInputStyle} />
                 { this.state.checkPassword ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkPassword[0]}</Text> : null }

                 <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>CONFIRM PASSWORD</Text>
                 <TextInput ref="confirmpassword"   
                   secureTextEntry={true} 
                   underlineColorAndroid={this.state.checkconfirmpassword.length?'red':color.underlineColorAndroid} 
                   onChangeText={(confirmpassword) => this.setState({confirmpassword:confirmpassword})} 
                   value={this.state.confirmpassword}
                   style={CommonStyle.textInputStyle} />
                { this.state.checkconfirmpassword ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkconfirmpassword[0]}</Text> : null }

             

                             

                {/** 
             
                <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>MOBILE NO</Text>
                <PhoneNumberPicker
                       countryHint={{name: 'United States', cca2: 'US', callingCode:"1"}}
                       onChange={this.PhoneNumberPickerChanged.bind(this)}/>
              { this.state.checkmobileno ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkmobileno[0]}</Text> : null }
                **/}

            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Form1")}} style={[CommonStyle.submitBtn,{backgroundColor:color.text3}]}>
              <Text style={CommonStyle.submitBtnText}>Submit</Text>
            </TouchableOpacity> 

          </View>

        </ScrollView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
startBtn:{
  position:'absolute',
  right:23,
  bottom:10,
  zIndex:1,
  height:50,
  padding:5,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  //backgroundColor:'blue',
},
carouselContainer: {
  height:Dimensions.get('window').height,
  width:Dimensions.get('window').width,
  alignItems: 'center',
  backgroundColor:'#ffffff',
  justifyContent:'flex-start',
 
  //backgroundColor:color.GreenLight,
},
carouselText:{
  color:color.text1,
  // marginTop:10,
  padding:5,
  fontSize:18,
  // textAlign:'center'
},
carouselTitle:{
  textAlign:'center',
  color:color.text1,
  marginBottom:3,
  marginTop:30,
  padding:2,
  fontSize:26,
  // fontFamily:'SourceSansPro-Regular',
},
bottomHalf:{
  justifyContent:'flex-start',
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height/3,
  backgroundColor:color.mainbackground,
  paddingLeft:25,
  paddingRight:30,
  paddingTop:20,
},
upperHalf:{
  justifyContent:'flex-start',
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height/4,
  backgroundColor:color.mainbackground,
  paddingLeft:25,
  paddingRight:30,
  paddingTop:20,
},
button: {
    width:Dimensions.get('window').width/2,
    height:50,
},
});
ComoditySelection.defaultProps = {
  messages : Messages,
  rules:Rules
  };
module.exports = ComoditySelection;
