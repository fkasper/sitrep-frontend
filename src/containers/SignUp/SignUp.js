import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import { CreateUserForm } from 'components';
import { pushState } from 'redux-router';
import { changeMenuMode } from 'redux/modules/menu';
import connectData from 'helpers/connectData';
import {loadSingle as loadGroup} from 'redux/modules/groups';

function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  const state = getState();
  promises.push(dispatch(changeMenuMode(true, true)));

  if (typeof state.router.params.groupId !== 'undefined') {
    promises.push(dispatch(loadGroup(state.router.params.groupId)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    status: state.auth.created,
    exercise: state.exercises.current,
    settings: state.permissions.data,
    group: state.groups.single
  }),
  {...authActions, pushState})
export default class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    status: PropTypes.string,
    pushState: PropTypes.func.isRequired,
    exercise: PropTypes.object,
    settings: PropTypes.object,
    group: PropTypes.object
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
    const {user, settings} = this.props;
    const {loading} = this.state;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Create User"/>
        {!user &&
        <div>
          <div style={{width: 220, margin: '20px auto'}}>
            <img src={settings.logoUrl} style={{width: '100%'}} />
          </div>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
            Sign up for an account
            </h2>
          </div>
          <div className={styles.card} style={{position: 'relative', opacity: (loading ? 0.3 : 1)}}>
          <div className={styles.boxTop} ></div>
            {this.props.group &&
              <CreateUserForm formKey={'user'} key={'user'} initialValues={{fields: this.props.group.fields}} />}
          </div>
        </div>
        }
      </div>
    );
  }
}
