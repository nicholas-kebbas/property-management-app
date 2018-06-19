import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';

// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
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
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:8000/api";
    console.log("values",
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    //To be done:check for empty values before hitting submit
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
             onChange = {(event, newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             label="Last Name"
             onChange = {(event, newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             type="email"
             label="Email"
             onChange = {(event, newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             label="Password"
             onChange = {(event, newValue) => this.setState({password:newValue})}
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
