import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { logout } from 'redux/modules/auth';

import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { isLoaded as isExercisePermissionsLoaded, load as loadExercisePermissions } from 'redux/modules/permissions';

// import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import Cookie from 'js-cookie';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';
import { NavMenu } from 'components';

/**
 * fetchData retreives basic user and exercise information from the server.
 */
function fetchData(getState, dispatch) {
  const promises = [];
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  if (!isExercisePermissionsLoaded(getState())) {
    promises.push(dispatch(loadExercisePermissions()));
  }
  return Promise.all(promises);
}
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.green500,
    primary2Color: colors.green700,
    primary3Color: colors.green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: 'all'
});

@themeDecorator(muiTheme)
@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    error: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.setStore(nextProps.user);
      this.props.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/auth/login');
    }
  }

  setStore(nextUser) {
    if (nextUser.access_token) {
      Cookie.set('sid', nextUser.access_token);
    }
  }

  hideError= () => {
    console.log('hiding');
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.appContent}>
          <NavMenu open logoutHandler={this.handleLogout}/>
          {this.props.children}
        </div>

      </div>
    );
  }
}
