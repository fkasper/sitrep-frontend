import React, {Component, PropTypes} from 'react';
import { pushState } from 'redux-router';
import {connect} from 'react-redux';

// @connect(state => ({ time: state.info.data.time }))
@connect(
  state => ({
    user: state.auth.user,
    permissions: state.permissions.data,
  }),
  pushState)
export default class RequireAccessLevel extends Component {
  static propTypes = {
    time: PropTypes.number,
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    exercise: PropTypes.object,
    level: PropTypes.string,
    permissions: PropTypes.object
  }

  userInExerciseWithPermissionLevel(level) {
    const { permissions } = this.props;

    // Either Exercise Admin privileges or a specific role
    if (permissions.IsAdmin || permissions[level] === true) {
      return true;
    }
    return false;
  }

  render() {
    const {user, level} = this.props;

    let authorized = false;
    if (!user) {
      return '';
    }
    // Global Admin privileges
    if (user.is_admin) {
      authorized = true;
    }

    if (this.userInExerciseWithPermissionLevel(level)) {
      authorized = true;
    }

    return (authorized && <div>{this.props.children}</div>);
  }
}
