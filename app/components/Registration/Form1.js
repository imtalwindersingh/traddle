 
 
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Picker,
  ListView,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';

import { Toolbar,Button,Avatar } from 'react-native-material-ui';

import ValidationComponent from 'react-native-form-validator';

import Geocoder from 'react-native-geocoder';

import AuthUtility from '../../reducer/lib/AuthUtility';
import ApiUtility from '../../reducer/lib/ApiUtility';

var Config = require('../../Config');

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

// import RNGooglePlacePicker from 'react-native-google-place-picker';

// var LatLongLocationPicker= require('./LatLongLocationPicker');
// var SelectMultiDateTime= require('./SelectMultiDateTime');
// 
// var ImageMultiPick = require('./ImageMultiPick');

var RegistrationStyle = require('../../style/RegistrationStyle');

import Rules from '../../common/validations/rules';
import Messages from '../../common/validations/messages';

class Form1 extends ValidationComponent {

constructor(props) {
    super(props);

    this.state = { 
      
      stepNumber:1,
      // token:this.props.token,
      _id:'',
      title:'',
      description:'',
      regImageMultiPick:[],

      priceperhour:null,
      availability:null,
      gdttlhrs:null,
      ttlhrs:null,
      guestlimit:null,

      latlongModalVisible:false,
      reglatlong:'',
      country:'',      
      statename:'',
      city:'',

      regtags:[],

      tagMultiPickModalVisible:false,

      worldsurf:null,
      notes:null,

        checkTitle:[],
        checkDescription:[],
        checkregImgMultiPick:[],
        
        checkPriceperhour:[],
        checkAvailability:[],
        checkGdttlhrs:[],
        checkTtlhrs:[],
        checkGuestlimit:[],
        
        checkWorldsurf:[],
        checkNotes:[],

        _id:'',
                
        disabled:false,

        daysArray:[
        {
          id:"1",
          name:'Sunday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
          isChecked:true,
         
        },
        {
          id:"2",
          name:'Monday',
          stimeh:"09",
          stimem:"00",
           etimeh:"21",
          etimem:"00",
           isChecked:true,
        },
        {
          id:"3",
          name:'Tuesday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
           isChecked:true,
        },
        {
          id:"4",
          name:'Wednesday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
           isChecked:true,
        },
        {
          id:"5",
          name:'Thursday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
           isChecked:true,
        },
        {
          id:"6",
          name:'Friday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
           isChecked:true,
        },
        {
          id:"7",
          name:'Saturday',
          stimeh:"09",
          stimem:"00",
          etimeh:"21",
          etimem:"00",
          isChecked:true,
        },
        
        ],

      selectedHours: 0,
      selectedMinutes: 0,
      user_id:"",
      catTime:[],
      editdays:[],
      neweditdays:[],
      finalDays:[],

      packageData:null,

    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

}


componentWillMount(){

      // var that = this;
      // AuthUtility.getUserField('_id',function(_id){
      //    that.setState({_id:_id});
      //  });

      // if(this.props.update){

      //     var _id = this.props._id;   

      //       var path = Config.API_URL+'/package/listing'; 
      //       var bundle={
      //         _id:_id,
      //       }; 
      //   this.props.packageDetailAction.fetchPackageDetail(path,bundle);

      // }

}


focusNextField(id) {
  this.inputs[id].focus();
}

componentDidMount(){
  
  //   var that=this,days=[];
  //   // console.log("vass",this.state.daysArray);
  //    for(var i=0;i<this.state.daysArray.length;i++){
  //     // console.log("hour",this.state.daysArray[i]['isChecked']);
  //     if(this.state.daysArray[i]['isChecked']){
  //       days.push(this.state.daysArray[i]);
  //     }
  // }
  // this.setState({regtags:days});
  //   this.fetchDetailForUpdt();

    // this.intServerFetch();

}

fetchDetailForUpdt(){

  // alert('data'+JSON.stringify(this.props.packageDetail.packageDetail));

  if(this.props.packageDetail.isLoading ==false && this.props.packageDetail.packageDetail != null && this.props.update )
  {
        var data=this.props.packageDetail.packageDetail[0];
        console.log('PackageAdd/update:fetchDetailForUpdt:',data.availibility);

          this.setState({
            title:data.title,
            description:data.description,
            regImageMultiPick:data.images,
            priceperhour:data.perhourprice.toString(),
            // regtags:data.availibility,
            gdttlhrs:data.guidetotalnoofhours.toString(),
            ttlhrs:data.totalhours.toString(),
            guestlimit:data.maximumguestlimit.toString(),
            reglatlong:data.guideloc,
            country:data.country,
            statename:data.state,
            city:data.city,
            worldsurf:data.worldsurfleagueapproted,
            notes:data.notes,
          });
          this.setDateForUpdate(data.availibility);
  }

}

setDateForUpdate(daysArray){

// alert(JSON.stringify(daysArray));
  console.log('Components:daysArray::',daysArray);
  
  var catArr=[];
  if(daysArray.length > 0){
           
      for(var i=0;i<daysArray.length;i++){
      
        // alert(daysArray[i].day);
        catArr['id']=i;
        catArr['name']=daysArray[i].day;
        catArr['stimeh']=new Date(daysArray[i].timestart).getHours();
        catArr['stimem']=new Date(daysArray[i].timestart).getMinutes();
        catArr['etimeh']=new Date(daysArray[i].timeend).getHours();
        catArr['etimem']=new Date(daysArray[i].timeend).getMinutes();
        catArr['isChecked']=true;
 
      }
    }

    if(catArr.length == daysArray){
      this.setState({regtags:catArr,daysArray:catArr});
    }
}

renderTagMultiPick(){

    console.log("renderTagMultiPick::");
    var regtags =this.state.regtags;
   
    if(regtags.length > 0)
    {
          return(

            <View>
              <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>MY AVAILABILITY</Text>

              <TouchableOpacity onPress={()=>this.setState({tagMultiPickModalVisible:true})} style={{backgroundColor:'#f8f8f8',marginBottom:15,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10,marginTop:5}}>        
                  
                  <View style={{flexWrap:'wrap',flexDirection: 'row',}}>
                  { regtags.map((item, key)=>(
                    <View style={[CommonStyle.capsuleView]}>
                        
                        <Text style={CommonStyle.capsuleText} numberOfLines={1}>
                          {item.name}
                        </Text>

                    </View>
                  ))}
                  
                  </View>
                  
              
              </TouchableOpacity>
            </View>
          );
    }
    else{
       return(
          <View>

              <TouchableOpacity onPress={()=>this.gotoTagMultipick()} style={this.state.isErrorProfessions ? RegistrationStyle.formFieldViewError : RegistrationStyle.formFieldView}>
                <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>MY AVAILABILITY</Text>
              </TouchableOpacity>
                 

          </View>
      );
    }
}

gotoTagMultipick(){
    //Actions.Actions.MapFilter();
    this.setState({
      tagMultiPickModalVisible:true
  })
}


oncloseTagMultiPick(tagsArr,catTime){
  console.log("catTime",catTime,tagsArr);
  if(catTime!==undefined){
    this.setState({catTime:catTime});
    // this.setState({regtags:catTime});
  }else{
    this.setState({
      tagMultiPickModalVisible : false,
      regtags:[],
      checkregtags:[]

    });
  }
 
   if(tagsArr == undefined || tagsArr.length == 0)
  {
    this.setState({
      tagMultiPickModalVisible : false,
      regtags:[],
      checkregtags:[]
    });  
  }
  else{

     this.toTimeStamp(tagsArr);

    // this.setState({
    //   tagMultiPickModalVisible : false,
    //   regtags:tagsArr,
    //   checkregtags:[]
    // }); 
  }
  console.log("oncloseTagMultiPick",tagsArr);

}

toTimeStamp(regtags){

  var newregtags=null;

  for(var i=0;i<regtags.length;i++){
        var year=new Date().getFullYear();
        var month=new Date().getMonth();
        var day=new Date().getDate();
        var shour=regtags[i].stimeh;
        var sminute=regtags[i].stimem;

        var ehour=regtags[i].etimeh;
        var eminute=regtags[i].etimem;
        var second='00';
        
        // console.log('year,month-1,day,hour,minute,second:',year,month,day,hour,minute,second);  

        var datum = new Date(Date.UTC(year,month,day,shour,sminute,second));
        var datumend = new Date(Date.UTC(year,month,day,ehour,eminute,second));
        console.log('datum::',datum.getTime()/1000);
        // return datum.getTime()/1000;
        regtags[i]['day']=regtags[i].name;
        regtags[i]['timestart']=datum.getTime()/1000;
        regtags[i]['timeend']=datumend.getTime()/1000;
        
  }

    this.setState({
      tagMultiPickModalVisible : false,
      regtags:regtags,
      checkregtags:[]
    }); 

  // console.log('newAvatar',regtags);

}

validation1(){

  // var errorStatus=0;
  // var isMyFormValidate =this.validate({
  //     title:{required: true},
  //     description:{required: true},
  //   });
    
  //   if(this.state.regImageMultiPick.length == 0){
  //     this.setState({checkregImgMultiPick : ['Required Field.']});
  //     errorStatus=1;
  //   }
 
  //   this.setState({
  //     checkTitle:this.getErrorsInField('title'),
  //     checkDescription:this.getErrorsInField('description'),
  //   });

  //   if(isMyFormValidate && errorStatus == 0){
      this.setState({stepNumber:2});
    // }
}

validation2(){
        
    // var errorStatus=0;
    // var isMyFormValidate =this.validate({
    //   priceperhour: {required: true},
    //   availability:{required: true},
    //   gdttlhrs:{required: true},
    //   ttlhrs:{required: true},
    //   guestlimit:{required: true},
    // });

    // this.setState({
    //   checkPriceperhour : this.getErrorsInField('priceperhour'),
    //   checkAvailability : this.getErrorsInField('availability'),
    //   checkGdttlhrs : this.getErrorsInField('gdttlhrs'),
    //   checkTtlhrs : this.getErrorsInField('ttlhrs'),
    //   checkGuestlimit : this.getErrorsInField('guestlimit'),
    // });

    
    // if(isMyFormValidate && errorStatus==0){
      this.setState({stepNumber:3});
    // }
}

validation3(){
this.props.navigation.navigate("HomePage");
    // if(this.state.reglatlong != ''){
      // this.setState({stepNumber:4});
    // }
    
}


doValidation(){
  console.log('doValidation:',this.state.stepNumber);
  switch(this.state.stepNumber)
    {
        case 1:
          return(this.validation1());
          break;

        case 2:
          return(this.validation2());
          break;

        case 3:
          return(this.validation3());
          break;

        case 4:
          return(this.validation4());
          break;

        default:
          return(this.validation1());
          
    }


}

_onRegistrationSubmit() {

    var that=this;
      var bunch = {

          user:this.state._id,

          title:this.state.title,
          description:this.state.description,
          images:JSON.stringify(this.state.regImageMultiPick),
         
          perhourprice:this.state.priceperhour,
          availibility:JSON.stringify(this.state.regtags),
          guidetotalnoofhours:this.state.gdttlhrs,
          totalhours:this.state.ttlhrs,
          maximumguestlimit:this.state.guestlimit,

          guideloc:this.state.reglatlong,
          country:this.state.country,
          state:this.state.statename,
          city:this.state.city,

          // guideloc:'22.7623,22.12334',

          // country:'india',
          // state:'gujarat',
          // city:'rajkot',

          worldsurfleagueapproted:this.state.worldsurf,
          notes:this.state.notes,

        };

        that.setState({
          isLoading : false
        });

        var imgMulti=that.state.regImageMultiPick;

        if(this.props.update == true)
        {
          bunch['_id']= this.props.packageDetail.packageDetail[0]._id;
          var path = Config.API_URL+'/package/update';
          that.props.packageAction.updatePackage(path,bunch,imgMulti);
          that.props.navigation.navigate('PackagePage');
        }
        else{
          var path = Config.API_URL+'/package/create';
          that.props.packageAction.addPackage(path,bunch,imgMulti);
          that.props.navigation.navigate('PackagePage');
        }
        
}


renderLoginBtn(){
  if(this.state.disabled)
  {return;
    // return(
    //   <TouchableOpacity style={[CommonStyle.submitBtn,]}>
    //    <Text style={[CommonStyle.submitBtnText,{}]}>Submit</Text>
    //   </TouchableOpacity>
    // );
  }
  else{
    return(
       <TouchableOpacity onPress={this.doValidation.bind(this)} style={CommonStyle.submitBtn}>
        <Text style={CommonStyle.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    );
  }
}


gotoLatLongPicker(){

  // RNGooglePlacePicker.show((response) => {

  //   if (response.didCancel) {
  //     console.log('response.didCancel::',response.didCancel);
  //   }
  //   else if (response.error) {
  //     console.log('GooglePlacePicker Error: ', response.error);
  //   }
  //   else {
  //     console.log('RNGooglePlacePicker::',response);
  //      this.setState({
  //       reglatlong: response.latitude.toString()+','+response.longitude.toString(),
  //       location: response.latitude.toString()+','+response.longitude.toString()
  //     });
  //     this.getCityName(response.latitude,response.longitude)      
  //   }
  // })
    // this.setState({
    //   latlongModalVisible:true
  // })
}


getCityName(latitude,longitude){

  // alert();
    var that=this;

    var city = {
      lat: latitude,
      lng: longitude
    };

    Geocoder.geocodePosition(city).then(res => {
    // res is an Array of geocoding object (see below)

      // console.log('getCityName:res::',res[0]);

      this.setState({country:res[0].country,statename:res[0].adminArea,city:res[0].locality});

    })
    .catch(err => console.log(err))

}


renderLatlongPicker(){

  var that=this;
    console.log("renderLatlongPicker::");
    if(this.state.reglatlong == '')
    {
      return(
          <View>
          <TouchableOpacity onPress={()=>this.gotoLatLongPicker()} style={this.state.isErrorLatLong ? RegistrationStyle.formFieldViewError : RegistrationStyle.formFieldView}>
            <Text numberOfLines={1} style={{fontSize:15,justifyContent:'flex-end',color:color.placeholderTextColor}}>Pick location*</Text>
          </TouchableOpacity>
          { this.state.checkreglatlong ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkreglatlong[0]}</Text> : null}                    
          </View>
      );
    }
    else{
      // this.setState({isErrorLatLong:false,checkreglatlong:[]});
       return(
          <TouchableOpacity onPress={()=>this.gotoLatLongPicker()} style={this.state.isErrorLatLong ? RegistrationStyle.formFieldViewError : RegistrationStyle.formFieldView}>
            <Text numberOfLines={2} style={{fontSize:18,justifyContent:'center',color:'#000000'}}>{this.state.city}</Text> 
          {/**    <Text numberOfLines={1} style={{fontSize:15,justifyContent:'flex-end',color:color.textInputColor}}>{this.state.reglatlong}</Text>**/}
          </TouchableOpacity>
      );
    }
}


oncloseLatLongModal(lat,long){
  
  if(lat !== '' && long !== '')
  {
    this.setState({
      latlongModalVisible : false,
      reglatlong:lat.toString()+','+long.toString(),
      isErrorLatLong:false,
      checkreglatlong:[],
    });
  }
  else{
    this.setState({
      latlongModalVisible : false,
      reglatlong:''
    });    
  }
  console.log("oncloseModal::latitude:longitude",lat,long);

}


onImageMultiPicked(imagePaths){

  console.log("onImageMultiPicked:",imagePaths);
  this.setState({regImageMultiPick:imagePaths,disabled:false,checkregImgMultiPick:[]});

}

onImageMultiPickProcessLoading(isLoading){
   
    console.log("onImageMultiPickProcessLoading:",isLoading);
    this.setState({disabled:true});

}


renderStep1(){
  console.log('renderStep1');
  return(
      <View>

          <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>TITLE</Text>
              <TextInput ref="title" 
               
                  underlineColorAndroid={this.state.checkTitle.length?'red':color.underlineColorAndroid} 
                  onChangeText={(title) => this.setState({title:title})} 
                  value={this.state.title}
                  style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                  { this.state.checkTitle ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkTitle[0]}</Text> : null}
                  
                  {/** this.state.checkEmail.map(errorMessage => <Text style={{color:'red',marginLeft:5}}>{errorMessage}</Text>) **/}
              
              <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>DESCRIPTION</Text>
              <TextInput ref="description" 
                  multiline={true}   
                  underlineColorAndroid={this.state.checkDescription.length?'red':color.underlineColorAndroid} 
                  onChangeText={(description) => this.setState({description:description})} 
                  value={this.state.description}
                  style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
               { this.state.checkDescription ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkDescription[0]}</Text> : null }

              <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>ADD PICTURES</Text> 
              <View style={{height:150,}}>
                   
              </View>



        </View>
  );

}

renderStep2(){

  return(

        <View>

                  <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>PRICE PER HOUR($)</Text>
                  <TextInput ref="priceperhour" 
                      keyboardType='phone-pad'
                      underlineColorAndroid={this.state.checkPriceperhour.length?'red':color.underlineColorAndroid} 
                      onChangeText={(priceperhour) => this.setState({priceperhour:priceperhour})} 
                      value={this.state.priceperhour}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                      { this.state.checkPriceperhour ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkPriceperhour[0]}</Text> : null}
                  
          
                  
          {/** 
          	 {this.renderTagMultiPick()} 
                  <SelectMultiDateTime 
                    days={''}
                    editdays={''}
                    hours={0}
                    catTime={this.state.catTime}
                    selectedArr={this.state.regtags}
                    modalVisible={this.state.tagMultiPickModalVisible} 
                    oncloseModal={this.oncloseTagMultiPick.bind(this)}
                  />   
            **/}

                  <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>GUIDE TOTAL NUMBER OF HOURS</Text>
                  <TextInput ref="gdttlhrs" 
                     keyboardType='phone-pad'
                      underlineColorAndroid={this.state.checkGdttlhrs.length?'red':color.underlineColorAndroid} 
                      onChangeText={(gdttlhrs) => this.setState({gdttlhrs:gdttlhrs})} 
                      value={this.state.gdttlhrs}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                      { this.state.checkGdttlhrs ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkGdttlhrs[0]}</Text> : null}
                      
                            
                  <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>TOTAL HOURS</Text>
                  <TextInput ref="ttlhrs"
                      keyboardType='phone-pad' 
                      underlineColorAndroid={this.state.checkTtlhrs.length?'red':color.underlineColorAndroid} 
                      onChangeText={(ttlhrs) => this.setState({ttlhrs:ttlhrs})} 
                      value={this.state.ttlhrs}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                   { this.state.checkTtlhrs ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkTtlhrs[0]}</Text> : null }

                    <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>MAXIMUM GUEST LIMIT AT A TIME</Text>
                  <TextInput ref="guestlimit" 
                      keyboardType='phone-pad'
                      underlineColorAndroid={this.state.checkGuestlimit.length?'red':color.underlineColorAndroid} 
                      onChangeText={(guestlimit) => this.setState({guestlimit:guestlimit})} 
                      value={this.state.guestlimit}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                   { this.state.checkGuestlimit ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkGuestlimit[0]}</Text> : null }
        </View>

  );

}

renderStep3(){
  console.log('renderStep3');
  return(
        <View>
           <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>WORLD SURF LEAGUE APPORTED</Text>
                  <TextInput ref="worldsurf" 
                      multiline={true}
                      underlineColorAndroid={this.state.checkWorldsurf.length?'red':color.underlineColorAndroid} 
                      onChangeText={(worldsurf) => this.setState({worldsurf:worldsurf})} 
                      value={this.state.worldsurf}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                      { this.state.checkWorldsurf ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkWorldsurf[0]}</Text> : null}
                  
                  <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>NOTES</Text>
                  <TextInput ref="notes" 
                      multiline={true}
                      underlineColorAndroid={this.state.checkNotes.length?'red':color.underlineColorAndroid} 
                      onChangeText={(notes) => this.setState({notes:notes})} 
                      value={this.state.notes}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                   { this.state.checkNotes ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkNotes[0]}</Text> : null }

        
{/** 
	  {this.renderLatlongPicker()} 
          <LatLongLocationPicker modalVisible={this.state.latlongModalVisible} 
            oncloseModal={this.oncloseLatLongModal.bind(this)}
          />
          **/}
        </View>
  );
}

renderStep4(){

  return(
        <View>

                <Text style={{fontSize:13,color:'#000000',marginBottom:5}}>WORLD SURF LEAGUE APPORTED</Text>
                  <TextInput ref="worldsurf" 
                      multiline={true}
                      underlineColorAndroid={this.state.checkWorldsurf.length?'red':color.underlineColorAndroid} 
                      onChangeText={(worldsurf) => this.setState({worldsurf:worldsurf})} 
                      value={this.state.worldsurf}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                      { this.state.checkWorldsurf ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkWorldsurf[0]}</Text> : null}
                  
                  <Text style={{fontSize:13,color:'#000000',marginBottom:5,marginTop:5}}>NOTES</Text>
                  <TextInput ref="notes" 
                      multiline={true}
                      underlineColorAndroid={this.state.checkNotes.length?'red':color.underlineColorAndroid} 
                      onChangeText={(notes) => this.setState({notes:notes})} 
                      value={this.state.notes}
                      style={{color:color.textInputColor,fontSize:22,marginBottom:10,paddingTop:5,paddingBottom:5,backgroundColor:'#f8f8f8'}} />
                   { this.state.checkNotes ? <Text style={{color:'red',marginLeft:5}}>{this.state.checkNotes[0]}</Text> : null }

           
        </View>
  );
}

_renderStepComponets(){

  console.log('_renderStepComponets:this.state.stepNumber:',this.state.stepNumber);
  switch(this.state.stepNumber)
  {
      case 1:
        return(this.renderStep1());
        break;

      case 2:
        return(this.renderStep2());
        break;

      case 3:
        return(this.renderStep3());
        break;

      // case 4:
      //   return(this.renderStep4());
      //   break;

      default:
        return(this.renderStep1());
      
  }

}

goBack(){

  console.log('goBack:',this.state.stepNumber);
  switch(this.state.stepNumber)
    {
        case 1:
          return(this.props.navigation.goBack());
          break;

        case 2:
          return(this.setState({stepNumber:1}));
          break;

        case 3:
          return(this.setState({stepNumber:2}));
          break;

        case 4:
          return(this.setState({stepNumber:3}));
          break;

        default:
          return(this.props.navigation.goBack());
          
    }

}

render() {
  // alert('render'+JSON.stringify(this.props.packageDetail));

  return (

    <View style={{height:Dimensions.get('window').height-25,backgroundColor:color.backgroundColor,}}>   

      <Toolbar
        leftElement="arrow-back"
        centerElement={"Trader registration Form"}
        rightElement={null}
        searchable={null}
        onLeftElementPress={() =>{this.goBack();}}
        onRightElementPress={() =>{ this.doValidation();}}
        style={
          {
            container: {backgroundColor:color.toolBackColor,elevation:0},
            leftElement:{color:color.textInputColor},
            rightElement:{color:color.textInputColor},
            titleText:{
              color:color.textInputColor,
              // fontFamily:'SFMedium',
            },
            centerElementContainer:{
               // alignItems:'center'
            },
          }
        }
       />
      
        <ScrollView style={{padding:15,}}>    
          <KeyboardAvoidingView>
            {this._renderStepComponets()}
          </KeyboardAvoidingView>
        </ScrollView>


        <View style={{flexDirection:'row',height:40,}}>
              <TouchableOpacity onPress={this.goBack.bind(this)} style={[CommonStyle.submitBtn,{height:40,width:Dimensions.get('window').width/2,}]}>
                <Text style={CommonStyle.submitBtnText}>Previous</Text>
              </TouchableOpacity>
          

            <View style={[CommonStyle.vLine,{backgroundColor:color.rBtnBack}]}></View>

          
              <TouchableOpacity onPress={this.doValidation.bind(this)} style={[CommonStyle.submitBtn,{height:40,width:Dimensions.get('window').width/2,}]}>
                <Text style={CommonStyle.submitBtnText}>Next</Text>
              </TouchableOpacity>
          
          </View>


    </View>
  );
}
  
}


Form1.defaultProps = {
  messages : Messages,
  rules:Rules
};

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const styles = StyleSheet.create({

titleText:{
    fontFamily:'SFMedium',
    fontSize:42,
    lineHeight:55,
    color:color.textInputColor,
    textAlign:'center'
  },
datePickerBox:{
  // marginTop: 9,
  // borderWidth: 0.5,
  padding: 0,
  // borderTopLeftRadius: 4,
  // borderTopRightRadius: 4,
  // borderBottomLeftRadius: 4,
  // borderBottomRightRadius: 4,
  height: 38,
  justifyContent:'center'
},

datePickerText: {
  fontSize: 14,
  marginLeft: 5,
  borderWidth: 0,
  color: color.placeholderTextColor,
},

listcontainer: {
  backgroundColor:'yellow',
  width:Dimensions.get('window').width,
  justifyContent:'center',
},
});

module.exports = Form1;
