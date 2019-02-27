import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import postReducer from './postReducer';
import postDetailReducer from './postDetailReducer';
import favReducer from './favReducer';


// Root Reducer
const rootReducer = combineReducers({
  	login: loginReducer,
	post:postReducer,
	postDetail:postDetailReducer,
	 fav:favReducer,

});

export default rootReducer;