import React, {Component, PropTypes} from 'react';
// import LeftNav from 'material-ui/lib/left-nav';
// import Divider from 'material-ui/lib/divider';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import Snackbar from 'material-ui/lib/snackbar';
import * as notificationActions from 'redux/modules/notifications';

@connect(
  state => ({
    active: state.notifications.show,
    message: state.notifications.message,
    icon: state.notifications.icon
  }), {
    ...notificationActions,
    pushState
  })
export default class NotificationCenter extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    active: PropTypes.bool,
    message: PropTypes.string,
    icon: PropTypes.string,
    notifyHide: PropTypes.func.isRequired
  }

  handleRequestClose() {
    this.props.notifyHide();
  }

  render() {
    const { active, message } = this.props;
    return (<Snackbar
          open={active}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this, null)}
        />);
  }
}


// {menu.hoverMenu && <Popover
//    open={open}
//    anchorEl={anchorEl}
//    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
//    targetOrigin={{horizontal: 'right', vertical: 'top'}}
//    animation={PopoverAnimationFromTop}>
//    <div style={style.popover}>
//       <p></p>
//    </div>
//  </Popover>}
