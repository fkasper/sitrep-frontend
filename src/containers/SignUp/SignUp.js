import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import { CreateUserForm } from 'components';
import { pushState } from 'redux-router';

@connect(
  state => ({
    user: state.auth.user,
    error: state.auth.loginError,
    status: state.auth.created
  }),
  {...authActions, pushState})
export default class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object,
    status: PropTypes.string,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status && nextProps.status.status) {
      this.props.pushState(null, '/auth/login');
    }
  }


  render() {
    const {user} = this.props;
    const {loading} = this.state;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Create User"/>
        {!user &&
        <div>
          <div style={{width: 220, margin: '20px auto'}}>
            <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '100%'}} />
          </div>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
            Sign up for an account
            </h2>
          </div>
          <div className={styles.card} style={{position: 'relative', opacity: (loading ? 0.3 : 1)}}>
          <div className={styles.boxTop} ></div>
            <CreateUserForm formKey={'user'} key={'user'} initialValues={{}} />
          </div>
        </div>
        }
      </div>
    );
  }
}
