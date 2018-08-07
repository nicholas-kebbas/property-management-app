import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {

  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    /* redirects to home if not logged in */
    shouldNavigateAway() {
      if (this.props.user_type !== 'tenant') {
        this.props.router.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
      user_type: state.auth.user_type,
      my_id: state.auth.my_id
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
