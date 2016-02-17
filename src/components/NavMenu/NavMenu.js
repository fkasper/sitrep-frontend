import React, {Component, PropTypes} from 'react';
// import LeftNav from 'material-ui/lib/left-nav';
// import Divider from 'material-ui/lib/divider';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import * as menuActions from 'redux/modules/menu';
import IconButton from 'material-ui/lib/icon-button';
// import Popover from 'material-ui/lib/popover/popover';
// import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
// import CircularProgress from 'material-ui/lib/circular-progress';
// import AppBar from 'material-ui/lib/app-bar';

@connect(
  state => ({
    menu: state.menu,
    user: state.auth.user,
    settings: state.permissions.data,
    minimal: state.menu.minimal
  }), {
    ...menuActions,
    pushState
  })
export default class NavMenu extends Component {
  static propTypes = {
    menu: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    open: PropTypes.bool,
    user: PropTypes.object,
    logoutHandler: PropTypes.func,
    settings: PropTypes.object,
    minimal: PropTypes.bool
  }

  componentWillMount() {
    this.setState({open: false, docked: false});
  }

  showPrevMenu = () => {
    this.showMoreMenu(this.props.menu.last);
  }

  openMenu(target, evnt) {
    this.setState({open: true, anchorEl: evnt.currentTarget});
  }

  action(menu, evnt) {
    if (menu.target) {
      if (menu.target === 'logout()') {
        this.props.logoutHandler(evnt);
      } else {
        this.props.pushState(null, menu.target);
      }
    } else if (menu.hoverMenu) {
      this.openMenu(menu.hoverMenu, evnt);
    }
  }

  render() {
    // const { activateMenu, minimal, settings, user, menu: { active, last, items } } = this.props;
    const { minimal, user, menu: { items }, settings } = this.props;
    // const { open, anchorEl } = this.state;
    const styles = require('./NavMenu.scss');
    const style = {
      menuWrapper: {
        position: 'relative',
        zIndex: 1928
      },
      fixedLeft: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
        borderRadius: 0
      },
      menu: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: (minimal) ? 'space-around' : 'flex-start',
        borderBottom: (minimal) ? '0' : '1px solid #dedede'
      },
      icon: {
        fontSize: 40
      },
      iconBorder: {
        width: 60,
        height: 60
      },
      iconMaxBorder: {
        width: 60,
        height: 60
      },
      menuText: {
        textAlign: 'right',
        paddingTop: 20
      },
      imageStyle: {
        width: '80%',
        height: 60,
        display: 'block',
        margin: '10px 0'
      },
      logo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderBottom: (minimal) ? '0' : '1px solid #dedede',
      },
    };
    return (
      <div className={`${styles.leftNav} ${user || styles.navinVis} ${minimal && styles.minimal}`} style={style.menuWrapper}> {user &&
        <div style={style.fixedLeft}>
          {minimal || <div style={style.logo}><img src={settings.logoUrl} style={style.imageStyle}/></div>}
          {items && items.map((menu) => (<div key={menu.text} style={style.menu}>
            <IconButton
            tooltip={menu.text}
            style={minimal ? style.iconBorder : style.iconMaxBorder}
            iconClassName="material-icons"
            onTouchTap={this.action.bind(this, menu)}
            tooltipPosition="bottom-right"
            iconStyle={style.icon}>{menu.icon}</IconButton>
            {minimal || <div style={style.menuText}>{menu.text}</div>}
          </div>))}
        </div>
    }
    </div>);
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
