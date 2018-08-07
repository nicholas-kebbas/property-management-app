// This will house our combined reducers call
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth'
import property from './property'
import application from './application'
import message from './message'
import payment from './payment'
import maintenance from './maintenance'
import chat from './chat'

export default combineReducers({
  auth,
  form: formReducer,
  property,
  application,
  message,
  maintenance,
  payment,
  chat
});
