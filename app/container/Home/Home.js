
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

// import * as commentAction from '../../action/commentAction';

var Config = require('../../Config');
var AuthUtility= require('../../reducer/lib/AuthUtility');
var ApiUtility= require('../../reducer/lib/ApiUtility');

import { Toolbar,Icon } from 'react-native-material-ui';

import Icons from 'react-native-vector-icons/dist/FontAwesome';

import HomeComponent from '../../components/Home/Home';

// import NotificationScreen from '../Notification/Notification';
// import PostScreen from '../Post/Post';
// import ProfileScreen from '../Profile/Profile';

// import CustomBottomTab from '../../common/CustomBottomTab';

var color = require('../../style/color.js');
var CommonStyle = require('../../style/common');

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../action/loginAction';
import * as postAction from '../../action/postAction';
import * as favaction from '../../action/favaction';
// import * as bookmarkAction from '../../action/bookmarkAction';
// import * as blockAction from '../../action/blockAction';
// import * as friendRequestAction from '../../action/friendRequestAction';

// import * as notificationAction from '../../action/notificationAction';

// var ProfessionsMultiPick = require('../../common/ProfessionsMultiPick');


class Home extends Component {



constructor(props) {
    super(props);
    this.state={
      listtype:'postlist',
      professionsModalVisible : false,

      regProfessions:[],
    };
}




  componentWillMount(){
   // console.log("loginSata",this.props.loginData)
   
// alert('componentWillMount')
     const { navigation } = this.props;
      const id = navigation.getParam('listtype','');
      
    // alert(id)
    this.props.loginAction.restoreLoginData();

    
    if(id!=""){
      this.setState({listtype:id});
    }

    this.gotoProfessions()
    
  }

  componentWillReceiveProps(nextProps){
     var { navigation } = this.props;
      var renderpage = navigation.getParam('renderpage','');   
      
     // alert(this.state.listtype+'@@'+renderpage)
    //  if(renderpage == 'notification' && this.state.listtype == ''){
    //     // alert('gii')
    //   this.setState({listtype:'notification'}); 
    // }

      if( this.state.listtype == 'createPost' && renderpage == 'postlist' )
      {
        this.setState({listtype:'postlist'})
      }
  }


  //Modal start
  gotoProfessions(){
    var that = this;
     AuthUtility.getUserField("interest",function(interest){
      interest = interest || [];

      if(interest.length<=0){


        that.setState({
          professionsModalVisible:true
        });
      }
    });
  }
  closeModal(){
     this.setState({
        professionsModalVisible:false
    })
  }
  oncloseProfessionsMultiPick(professionsArray,arrowBack){
  
    if(arrowBack)
    {
      this.setState({
        professionsModalVisible : false,
      });
     
    }

   else{
    this.setState({
      professionsModalVisible : false,
      regProfessions:professionsArray
    });
    console.log("oncloseProfessionsMultiPick",professionsArray);
    if(professionsArray.length > 0){
        // AuthUtility.getToken(function(token){
        //     ApiUtility.setToken(token);
        //      // console.log("Home: getToken: ",token);
        // });
        var that=this;
        AuthUtility.getUserField('_id',function(_id){
          var pathUpdt = Config.API_URL+'/user/update';
           var bundle={
              // _id:that.state._id,
              interest:JSON.stringify(professionsArray),
            };

            that.props.loginAction.updateLoginData(pathUpdt,bundle,that.props.navigation,"update"); 
            alert('Your tags saved successfully')
            // this.props.navigation.goBack();
             // that.props.navigation.navigate("ProfilePage");
        });
          
    }else{
      alert("Please select at least one Interest");
    }    
   } 
  }
  //modal End


  onlogout(){
    AuthUtility.removeToken(function(){});
    AuthUtility.clear(function(){});
    this.props.navigation.navigate('LoginPage');
  }

  setView(viewKey){
    // alert('setView'+viewKey)
    this.setState({listtype:viewKey})
  }


  renderToolbar(){
    if(this.state.listtype == 'postlist'){
      return(
                <View style={[CommonStyle.toolbarView,{flexDirection:'row',justifyContent:'space-between',marginTop:Platform.OS=='ios'?20:0}]}>
                     <TouchableOpacity onPress={()=>{}}>
                      <Icon name="notification" size={28} color={color.toolTitleColor} style={{}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>this.onlogout()}>
                      <Text style={[CommonStyle.toolbarText]}>Logout</Text>
                    </TouchableOpacity>


                    {/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('FilterModal')}}>
                      <Icon name="search" size={28} color={color.toolTitleColor} style={{}}/>
                    </TouchableOpacity>
                    */}
                </View>
      )
    }
    else{
      return(
            <View style={[CommonStyle.toolbarView,{flexDirection:'row',justifyContent:'center',marginTop:Platform.OS=='ios'?20:0}]}>
              <Text style={[CommonStyle.toolbarText]}>Bookmark</Text>
            </View>
      )
    }
  }

  renderScreen(){
// alert('renderScreen'+this.state.listtype)
    if(this.state.listtype == 'postlist' || this.state.listtype == 'bookmark'){
      return(
        <View style={{}}>
                  
                 
                  
                  <View style={{height:Dimensions.get('window').height-73,}}>
                  
                      <HomeComponent 
                          navigation={this.props.navigation}
                          listtype={this.state.listtype}
                          loginAction={this.props.loginAction}
                          login={this.props.login}
                          postAction={this.props.postAction}
                          post={this.props.post}
                          favaction={this.props.favaction}
                          isContact={this.props.isContact}
                          // bookmarkAction={this.props.bookmarkAction}
                          // blockAction={this.props.blockAction}
                          // friendRequestAction={this.props.friendRequestAction}
                          // commentAction={this.props.commentAction}
                          // notificationAction={this.props.notificationAction}
                      />

                     {/*<ProfessionsMultiPick 
                        selectedArr={this.state.regProfessions}
                        modalVisible={this.state.professionsModalVisible} 
                        oncloseModal={this.oncloseProfessionsMultiPick.bind(this)}
                      />*/} 
                  
                  </View>
                  </View>
      )
    }
    
    else if(this.state.listtype == 'notification'){
      return(
        <NotificationScreen navigation={this.props.navigation}/>
      )
    }
    
    else if(this.state.listtype == 'createPost'){
        return(

            <PostScreen bottomTab={true} navigation={this.props.navigation}/>

        )
    }
    else if(this.state.listtype == 'myprofile'){
        return(

            <ProfileScreen navigation={this.props.navigation}/>

        )
    }
    else
      return;

  }

  	render() {
    
	  return (

	   <View style={{flex:1,}}>  
		  
      	<StatusBar
            backgroundColor={color.statusbar}
            barStyle="dark-content"
            hidden={false}
        />

          {/*<View style={{height:Dimensions.get('window').height-20,}}>*/}
          <View style={{height:Dimensions.get('window').height,}}>
          {this.renderScreen()}
          </View>

         {/* <CustomBottomTab onBtnPress={this.setView.bind(this)} navigation={this.props.navigation}/> */}

	    </View>
	  );
	}
}


const styles = StyleSheet.create({
 
});


// module.exports = Home;
const mapStateToProps = state => {
  // alert(JSON.stringify(state.login));
  return {
    login : state.login,
    post : state.post,
  };
}

const mapDispatchToProps = dispatch => {
  
  return {
    loginAction : bindActionCreators(
      loginAction, dispatch,
    ),
    // commentAction:bindActionCreators(
    //   commentAction, dispatch,
    // ),
    postAction : bindActionCreators(
      postAction, dispatch,
    ),
    favaction: bindActionCreators(
      favaction, dispatch,
    ),
    // bookmarkAction: bindActionCreators(
    //   bookmarkAction, dispatch,
    // ),
    // blockAction: bindActionCreators(
    //   blockAction, dispatch,
    // ),
    // friendRequestAction: bindActionCreators(
    //   friendRequestAction, dispatch,
    // ),
    // notificationAction: bindActionCreators(
    //   notificationAction, dispatch,
    // ),

  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
