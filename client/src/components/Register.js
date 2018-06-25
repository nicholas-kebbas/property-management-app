import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      title: 'Register'
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:8000/auth/signup";
    console.log("payload: ",
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    //TODO: check for empty values before hitting submit

    // Create payload to send over to backend
    var self = this;
    var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }

    /* TODO: Reimplement this to use redux */
    axios.post(apiBaseUrl+'/register', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "No account associated with this username.";
       self.props.parentContext.setState({
         loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
        });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

/* There's definitely a better way to do this */
  handleChangeFirstName(event) {
    this.setState({
      first_name: event.target.value
    })
  }

  handleChangeLastName(event) {
    this.setState({
      last_name: event.target.value
    })
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
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
             label="First Name"
             onChange={this.handleChangeFirstName}
             />
           <br/>
           <TextField
             label="Last Name"
             onChange={this.handleChangeLastName}
             />
           <br/>
           <TextField
             type="email"
             label="Email"
             onChange={this.handleChangeEmail}
             />
           <br/>
           <TextField
             type = "password"
             label="Password"
             onChange={this.handleChangePassword}
             />
           <br/>
           <Button variant="contained" color="primary" label="Submit" style={style}
           onClick={(event) => this.handleClick(event)}> Submit </Button>
          <br />
          <a href="/login"> Already have an account? Login Here.</a>
          </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

Register.propTypes = {
  classes: PropTypes.object,
};

export default Register;
