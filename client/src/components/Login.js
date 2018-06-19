import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ProfilePage from './ProfilePage.js';

class Login extends Component {

constructor(props){
  super(props);
  this.state={
    username:'',
    password:'',
    title: "Login"
  }
 }

// TODO: Implement Backend
handleClick(event) {
  var apiBaseUrl = "http://localhost:8000/api/";
  var self = this;
  var payload={
    "email":this.state.username,
    "password":this.state.password
  }
  axios.post(apiBaseUrl+'login', payload)
  .then(function (response) {
    console.log(response);
    if(response.data.code === 200) {
      console.log("Login successful");
      var profilePage=[];
      profilePage.push(<ProfilePage appContext={self.props.appContext}/>)
      self.props.appContext.setState({loginPage:[],profilePage:profilePage})
    }
    else if(response.data.code === 204){
      console.log("Username password do not match");
      alert("username password do not match")
    }
    else{
      console.log("Username does not exists");
      alert("Username does not exist");
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  }


render() {
  /* Remember to call classes here */
  const { classes } = this.props;

    return (
      <div>
          <div>
            <br />
              <Typography color="inherit" variant="display1">
                {this.state.title}
              </Typography>
            <br />
           <TextField
             label="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               label="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
               <Button variant="contained" color="primary" label="Submit" style={style}
               onClick={(event) => this.handleClick(event)}> Submit </Button>
             <br />
             <a href="/register"> Need an account? Register Here.</a>
         </div>
      </div>
    );
  }
}

const style = {
 margin: 15,
};

Login.propTypes = {
  classes: PropTypes.object
};

export default Login;
