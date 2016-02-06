import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import * as usersActions from 'redux/modules/users';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadUsers());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    users: state.users.data,
    error: state.users.error,
    loading: state.users.loading,

  }),
  {...usersActions, initializeWithKey })
export default class Widgets extends Component {
  static propTypes = {
    users: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  render() {
    // const handleEdit = (widget) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(widget.id));
    // };
    // const {users, error, editing, loading, load} = this.props;
    const { users, error } = this.props;
    // let refreshClassName = 'fa fa-refresh';
    // if (loading) {
    //   refreshClassName += ' fa-spin';
    // }
    const styles = require('./Users.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <Helmet title="Users"/>
        <div style={{marginLeft: 340, height: '100%'}}>

          {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}
          {users && users.length && <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Rank</TableHeaderColumn>
                  <TableHeaderColumn>Actions</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableRowColumn>{user.Email}</TableRowColumn>
                    <TableRowColumn>{user.RealName}</TableRowColumn>
                    <TableRowColumn>{user.UserRank}</TableRowColumn>
                    <TableRowColumn>
                      <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                      >
                        <MenuItem
                          primaryText="Settings"
                          containerElement={<Link to={`/cms/user/${user.Email}`} />}/>
                      </IconMenu>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>}
        </div>
      </div>
    );
  }
}
