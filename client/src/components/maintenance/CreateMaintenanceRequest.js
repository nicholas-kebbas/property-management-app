import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Redux */
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, RadioGroup } from 'redux-form-material-ui';

const required = value => value ? undefined : 'Required';

class CreateMaintenanceRequest extends Component{
  constructor(props) {
    super(props);
  }

  // const {propertyId} = this.props.params.propertyId;
  //onSubmit = (data) => ({...data, propertyId: })
  onSubmit = ({tenantId, propertyId, pmId, form_subject, form_body}) => {
    console.log('application: '+ propertyId + form_subject, form_body);
    this.props.create_maintenance_request({tenantId, propertyId, pmId, form_subject, form_body}, () => {
      alert("Maintenance Request was sent successfully!");
      // this.props.router.push("/propertylisting");
    })
  //console.log(({user_type, username, email, firstname, lastname, password});
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(data => this.onSubmit({...data, tenantId: localStorage.getItem('my_id'), propertyId: this.props.params.propertyId}))} align="center">
      <h1>
       Make Maintenance Request
      </h1>
      <div>
        <Field name="propertyId" id="propertyId" label={'Property ID: '+this.props.params.propertyId} component={TextField} disabled />
      </div>
      <div>
        <Field name="tenantId" id="tenantId" label={'Tenant ID: '+localStorage.getItem('my_id')} component={TextField} disabled />
      </div>
      <div>
        <Field name="form_subject" id="form_subject" label="Subject" component={TextField} />
      </div>
      <div>
        <Field name="form_body" id="form_body" label="Message" component={TextField} />
      </div>
      <br/>
      <button className = "button" type="submit">Make Maintenance Request</button>
      <br />
    </form>
    )
  }
}

CreateMaintenanceRequest = reduxForm({
  form: 'tenant_application_form'
})(CreateMaintenanceRequest)

export default connect(null, actions)(CreateMaintenanceRequest);
