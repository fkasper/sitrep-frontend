import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import * as usersActions from 'redux/modules/users';
import {isLoaded as isGroupsLoaded, load as loadGroups} from 'redux/modules/groups';
import {changeMenuMode} from 'redux/modules/menu';

import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import { SettingsForm } from 'components';
function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));

  if (!isGroupsLoaded(getState())) {
    promises.push(dispatch(loadGroups()));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    users: state.users.data,
    groups: state.groups.data,
    error: state.users.error,
    loading: state.users.loading
  }),
  {...usersActions, initializeWithKey })
export default class Index extends Component {
  static propTypes = {
    users: PropTypes.array,
    groups: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({active: 0});
  }

  render() {
    // const handleEdit = (widget) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(widget.id));
    // };
    // const {users, error, editing, loading, load} = this.props;
    const { error, groups } = this.props;
    const { active } = this.state;
    const activeGroup = groups[active];
    // let refreshClassName = 'fa fa-refresh';
    // if (loading) {
    //   refreshClassName += ' fa-spin';
    // }
    const styles = require('./Users.scss');
    return (
      <div className={styles.widgets + ' container ' + styles.formatting}>
        <Helmet title="Users"/>
        <Paper zDepth={2} className={styles.header}>
          <h1>Manage Mappings</h1>
          <p>Email, Password and Name are always mandatory.</p>
          <strong>/auth/sign-up/{activeGroup.id}</strong>
        </Paper>
        <div>
        <div className={styles.flexBox}>
          <div className={`${styles.flex} ${styles.leftNav}`}>
          <List subheader="Groups">
            {groups && groups.map((group, index) => (
              <div key={index}>
                <ListItem
                  primaryText={group.name}
                  onTouchTap={() => { this.setState({active: index}); }}
                  style={{textAlign: 'center', backgroundColor: (active === index && '#ccc')}}
                />
                <Divider />
              </div>
            ))}
          </List>
          </div>
          <div className={styles.flex} style={{padding: 15}}>
          {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error.message}
          </div>}
            <SettingsForm
              formKey={activeGroup.id}
              key={active}
              initialValues={activeGroup} />
          </div>
        </div>


        </div>
      </div>
    );
  }
}
