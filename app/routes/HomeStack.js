
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Alert,
  InteractionManager,
  TouchableOpacity,
  Linking,
  Navigator, 
  NativeModules,
  AsyncStorage,
  BackHandler, 
  StatusBar
} from 'react-native';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import { 
  createSwitchNavigator,
  createStackNavigator, 
  TabNavigator, 
  createDrawerNavigator,
  createBottomTabNavigator

} from 'react-navigation'; 


import Icon from 'react-native-vector-icons/FontAwesome';

import HomePage from '../container/Home/Home';
import CurrentTradeMain from '../container/CurrentTrade/CurrentTradeMain';
import ContractsMain from '../container/Contracts/ContractsMain';
import Registration from '../container/MyToolBar';
// import PostCreate from '../components/Post/PostCreate';
// import PostCreateComponent from '../container/Post/PostCreateComponent';

// import PostDetail from '../container/PostDetail/PostDetail';

// import InterestSelectPage from '../container/Interest/InterestSelect';
// import Notification from '../container/Notification/Notification';
// import FilterModal from '../components/Home/FilterModal';
// import SearchModal from '../container/Home/SearchModal';
// import Help from '../components/Help';

// import Comment from '../container/comment/Comment';
// import BookmarkPage from '../container/Bookmark/Bookmark';

// import Post from '../container/Post/Post';
// import PostDetail from '../container/PostDetail/PostDetail';
// import CreatePost from '../components/Post/CreatePost';
// import Messages from '../components/Messages/Messages';
// import ChatRoom from '../components/Messages/ChatRoom';

// import CustomBottomTab from '../common/CustomBottomTab';

// import ProfilePage from '../container/Profile/Profile';
// import ProfileEdit from '../container/Profile/ProfileEdit';
// import ChangePassword from '../components/Profile/ChangePassword';
// import SettingsPage from '../components/Profile/SettingsPage';
// import WebViewPage from '../components/Profile/WebViewPage';


const HomeStack = createStackNavigator({

      HomePage:{
        screen:HomePage,
        navigationOptions: { header: null } //to hide the header
      },

      // PostCreate:{
      //   screen:PostCreate,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // PostCreateComponent:{
      //   screen:PostCreateComponent,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // InterestSelectPage:{

      //   screen:InterestSelectPage,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // SearchModal: {
      //   screen: SearchModal,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // FilterModal: {
      //   screen: FilterModal,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // Post:{
      //    screen: Post,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // PostDetail:{
      //    screen: PostDetail,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // CreatePost:{
      //    screen: CreatePost,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // Messages:{
      //    screen: Messages,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // ChatRoom:{
      //    screen: ChatRoom,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // Comment:{
      //   screen: Comment,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // Help:{
      //    screen: Help,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // CustomBottomTab:{

      //   screen:CustomBottomTab,
      //   navigationOptions: { header: null } //to hide the header
      // },
    },
    {
      initialRouteName:'HomePage',
      // lazy:false
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
  // alert()
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

// const OFFERStack = createStackNavigator({

    //  ProfilePage:{
    //   screen:ProfilePage,
    //   navigationOptions: { header: null }
    // },
    //   ProfileEdit:{
    //     screen:ProfileEdit,
    //     navigationOptions: { header: null }
    //   },

    //   ChangePassword:{
    //     screen:ChangePassword,
    //     navigationOptions: { header: null }
    //   },
    //   WebViewPage:{
    //     screen:WebViewPage,
    //     navigationOptions: { header: null }
    //   },

    //   SettingsPage:{
    //     screen:SettingsPage,
    //     navigationOptions: { header: null }
    //   },
    //   CustomBottomTab:{

    //     screen:CustomBottomTab,
    //     navigationOptions: { header: null } //to hide the header
    //   },
  //   },
  //   {
  //     initialRouteName:'ProfilePage',
  //   }
  // );

// OFFERStack.navigationOptions = ({ navigation }) => {
//   // console.log("in",navigation.state.index);
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

const ContractStack = createStackNavigator({

      ContractsMain:{
        screen:ContractsMain,
        navigationOptions: { header: null } //to hide the header
      },

      // CustomBottomTab:{

      //   screen:CustomBottomTab,
      //   navigationOptions: { header: null } //to hide the header
      // },
    },
    {
      initialRouteName:'ContractsMain',
    }
  );

ContractStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const CurrentTradeStack = createStackNavigator({

      CurrentTradeMain:{
        screen:CurrentTradeMain,
        navigationOptions: { header: null } //to hide the header
      },

      // CustomBottomTab:{

      //   screen:CustomBottomTab,
      //   navigationOptions: { header: null } //to hide the header
      // },
      // MyBookDetailPage:{
      //   screen:MyBookDetailPage,
      //   navigationOptions: { header: null } //to hide the header
      // },
    },
    {
      initialRouteName:'CurrentTradeMain',
      lazy:false
    }
  );

CurrentTradeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeTabs = createStackNavigator({

      HomeStack:{
        screen:HomeStack,
        navigationOptions: { header: null } //to hide the header
      },
      // OFFERStack:{
      //   screen:OFFERStack,
      //   navigationOptions: { header: null } //to hide the header
      // },
      ContractStack:{
        screen:ContractStack,
        navigationOptions: { header: null } //to hide the header
      },
      
      // CustomBottomTab:{

      //   screen:CustomBottomTab,
      //   navigationOptions: { header: null } //to hide the header
      // },
      CurrentTradeStack:{
        screen:CurrentTradeStack,
        navigationOptions: { header: null } //to hide the header
      },
    },
    {
      initialRouteName:'HomeStack',
    }
  );


export default HomeTabs;