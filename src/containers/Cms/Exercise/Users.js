import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import {isLoaded as isUsersLoaded, load as loadUsers} from 'redux/modules/users';
import connectData from 'helpers/connectData';
// import Paper from 'material-ui/lib/paper';
// import Avatar from 'material-ui/lib/avatar';
// import List from 'material-ui/lib/lists/list';
// import ListItem from 'material-ui/lib/lists/list-item';
// import Add from 'material-ui/lib/svg-icons/content/add';
// import Remove from 'material-ui/lib/svg-icons/content/remove';
// import AutoComplete from 'material-ui/lib/auto-complete';
//
// // import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MenuItem from 'material-ui/lib/menus/menu-item';
// import IconButton from 'material-ui/lib/icon-button';
// import Colors from 'material-ui/lib/styles/colors';
// // import { SettingsForm } from 'components';
// // import Divider from 'material-ui/lib/divider';
//
// // import Table from 'material-ui/lib/table/table';
// // import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
// // import TableRow from 'material-ui/lib/table/table-row';
// // import TableHeader from 'material-ui/lib/table/table-header';
// // import TableRowColumn from 'material-ui/lib/table/table-row-column';
// // import TableBody from 'material-ui/lib/table/table-body';
// // import IconMenu from 'material-ui/lib/menus/icon-menu';
// // import MenuItem from 'material-ui/lib/menus/menu-item';
// // import IconButton from 'material-ui/lib/icon-button';
// // import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  if (!isUsersLoaded(getState())) {
    promises.push(dispatch(loadUsers()));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    error: state.exercises.error,
    loading: state.exercises.loading,
    users: state.users.data
  }))
export default class Parameters extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    users: PropTypes.array
  }

  render() {
    return (<div>
      <Helmet title="User Management Console" />
      test
    </div>);
    // const handleEdit = (widget) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(widget.id));
    // };
    // const {users, error, editing, loading, load} = this.props;
    // const { error, users } = this.props;
    // // let refreshClassName = 'fa fa-refresh';
    // // if (loading) {
    // //   refreshClassName += ' fa-spin';
    // // }
    // const styles = require('./Users.scss');
    // const dataSource1 = users && users.length && users.map((user) => (
    //   {
    //     text: user.Email,
    //     value: (
    //       <MenuItem
    //         primaryText={user.Email}
    //         rightIcon={<Add color={Colors.grey400} />}
    //       />
    //     ),
    //   }
    // ));
    // return (
    //   <div className={styles.widgets + ' container'}>
    //     <Helmet title="Exercise Parameters"/>
    //     <div style={{marginLeft: 340, height: '100%'}} className={styles.formatting}>
    //
    //       {error &&
    //       <div className="alert alert-danger" role="alert">
    //         <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    //         {' '}
    //         {error}
    //       </div>}
    //
    //       <Paper zDepth={1} rounded={false}>
    //         <div className={styles.padding}>
    //           <h3>Exercise Users</h3>
    //           <p>You can add or remove users from the exercise entirely, or just edit their permission levels. To do so, simply drag/drop them onto the right field</p>
    //           <div className={styles.flexBox}>
    //           <AutoComplete
    //             hintText="Type a username to start search"
    //             style={{width: '100%'}}
    //             filter={AutoComplete.caseInsensitiveFilter}
    //             dataSource={dataSource1}
    //           />
    //           </div>
    //           <div className={styles.flexBox}>
    //             <fieldset className={styles.flex}>
    //               <List subheader="Users">
    //               {users && users.length && users.map((user) => (
    //                 <ListItem
    //                   rightIconButton={<IconButton
    //                     touch
    //                     tooltip="remove from role"
    //                     tooltipPosition="bottom-left"
    //                     onTouchTap={this.addUserToExercise.bind(this, user)}
    //                   >
    //                     <Remove color={Colors.grey400} />
    //                   </IconButton>}
    //                   primaryText={user.RealName}
    //                   secondaryText={user.Email}
    //                   leftAvatar={<Avatar>{user.Email[0]}</Avatar>}
    //                 />
    //               ))}
    //               </List>
    //             </fieldset>
    //             <fieldset className={styles.flex}>
    //               <List subheader="OCs">
    //               {users && users.length && users.map((user) => (
    //                 <ListItem
    //                   rightIconButton={<IconButton
    //                     touch
    //                     tooltip="remove from role"
    //                     tooltipPosition="bottom-left"
    //                     onTouchTap={this.addUserToExercise.bind(this, user)}
    //                   >
    //                     <Remove color={Colors.grey400} />
    //                   </IconButton>}
    //                   primaryText={user.RealName}
    //                   secondaryText={user.Email}
    //                   leftAvatar={<Avatar>{user.Email[0]}</Avatar>}
    //                 />
    //               ))}
    //               </List>
    //             </fieldset><fieldset className={styles.flex}>
    //               <List subheader="Admins">
    //               {users && users.length && users.map((user) => (
    //                 <ListItem
    //                   rightIconButton={<IconButton
    //                     touch
    //                     tooltip="remove from role"
    //                     tooltipPosition="bottom-left"
    //                     onTouchTap={this.addUserToExercise.bind(this, user)}
    //                   >
    //                     <Remove color={Colors.grey400} />
    //                   </IconButton>}
    //                   primaryText={user.RealName}
    //                   secondaryText={user.Email}
    //                   leftAvatar={<Avatar>{user.Email[0]}</Avatar>}
    //                 />
    //               ))}
    //               </List>
    //             </fieldset>
    //           </div>
    //         </div>
    //       </Paper>
    //
    //     </div>
    //   </div>
    // );
  }
}
