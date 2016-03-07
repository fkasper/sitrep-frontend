import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import * as passwordActions from 'redux/modules/password';
import { pushState } from 'redux-router';

import Helmet from 'react-helmet';


@connect(
    state => ({
      user: state.auth.user,
      passwd: state.passwd
    }),
    {...authActions, ...passwordActions, pushState})
export default
class Change extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    error: PropTypes.object,
    change: PropTypes.func,
    passwd: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.passwd);
    if (nextProps.error) {
      this.setState({loading: false});
    }
    if (nextProps.passwd.response) {
      this.props.pushState(null, '/');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email;
    this.blurAnimation();
    this.handleNewPasswdUpdate().then(() => {
      this.props.change(email.value);
      this.setState({localError: null, loading: false});
      email.value = '';
    }).catch((msg)=>{
      this.setState({localError: msg, loading: false});
    });

    // this.props.login(input.value, password.value);
    // password.value = '';
  }

  handleNewPasswdUpdate = () => {
    return new Promise((accept, reject) => {
      const email = this.refs.email;
      if (email.value === '') {
        reject('You have to enter your old password');
        return;
      }
      accept();
    });
  }

  blurAnimation = () => {
    this.setState({loading: true});
  }

  render() {
    const {error} = this.props;
    const { localError, loading } = this.state;
    const styles = require('../Login/Login.scss');


    return (<div>
      <Helmet title="Change your Password" />
            <div style={{width: 220, margin: '20px auto'}}>
              <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '100%'}} />
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
              Change your Password
              </h2>
            </div>
            <div className={styles.card + ' ' + styles.card2} style={{position: 'relative'}}>
              <div className={styles.boxTop} ></div>
              <form className="login-form form-inline" onSubmit={this.handleSubmit} style={{padding: '40px 40px 0px 40px'}}>
              {((error) || localError) && <div className={styles.error}>{(error ? error.error : null) || localError} </div>}

                <div className="form-group">
                  <input type="email" ref="email" placeholder="Your email address" className={styles.input}/>
                </div>
                <button className={styles.signInButton} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
                </button>
                <a href="/auth/login" style={{fontSize: 13, cursor: 'pointer', color: '#427fed'}}>Back to Login</a>
              </form>
              <div className={styles.spinner} style={{display: ((loading) ? 'block' : 'none')}}>
                <div className={styles.doubleBounce1}></div>
                <div className={styles.doubleBounce2}></div>
              </div>
            </div>

          </div>);
  }
}
