import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    error: state.auth.loginError
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({loading: false});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const password = this.refs.password;
    this.blurAnimation();
    this.props.login(input.value, password.value);
    password.value = '';
  }

  blurAnimation = () => {
    this.setState({loading: true});
  }


  render() {
    const {user, error} = this.props;
    const {loading} = this.state;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        {!user &&
        <div>
          <div style={{width: 220, margin: '20px auto'}}>
            <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '100%'}} />
          </div>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
            Please login
            </h2>
          </div>
          <div className={styles.card} style={{position: 'relative', opacity: (loading ? 0.3 : 1)}}>
          <div className={styles.boxTop} ></div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit} style={{padding: '40px 40px 0px 40px'}}>
            {error && <div className={styles.error}>{error.message} </div>}

              <div className="form-group">
                <input type="email" ref="username" placeholder="Email" autoFocus className={styles.input}/>
                <input type="password" ref="password" placeholder="Password" className={styles.input}/>
              </div>
              <button className={styles.signInButton} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
              <a href="/auth/change-password" style={{fontSize: 13, cursor: 'pointer', color: '#427fed'}}>Forgot Password</a>
            </form>
            <div className={styles.spinner} style={{display: ((loading) ? 'block' : 'none')}}>
              <div className={styles.doubleBounce1}></div>
              <div className={styles.doubleBounce2}></div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
