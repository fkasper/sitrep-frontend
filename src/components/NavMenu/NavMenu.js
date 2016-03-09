import React, {Component, PropTypes} from 'react';
// import LeftNav from 'material-ui/lib/left-nav';
// import Divider from 'material-ui/lib/divider';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import * as menuActions from 'redux/modules/menu';
import { notify } from 'redux/modules/notifications';
// import IconButton from 'material-ui/lib/icon-button';
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
    pushState,
    notify
  })
export default class NavMenu extends Component {
  static propTypes = {
    menu: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    open: PropTypes.bool,
    user: PropTypes.object,
    logoutHandler: PropTypes.func,
    settings: PropTypes.object,
    minimal: PropTypes.bool,
    notify: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({open: false, docked: false, height: 400, ttvis: false});
  }
  componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.getHeight.bind(this, null));
      this.getHeight();
    }
  }
  componentWillUnmount() {
    if (window) window.removeEventListener('resize', this.getHeight.bind(this, null));
  }

  getHeight() {
    if (window) this.setState({height: window.innerHeight, width: window.innerWidth});
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
        if (this.props && this.props.logoutHandler) {
          this.props.logoutHandler(evnt);
          this.props.notify('You have successfully logged out!', true, false);
        }
      } else {
        this.props.pushState(null, menu.target);
      }
    } else if (menu.hoverMenu) {
      this.openMenu(menu.hoverMenu, evnt);
    }
  }

  showTooltip(tip, evt) {
    if (!this.props.minimal) return;
    const target = evt.target;
    const rect = target.getBoundingClientRect();
    const calculated = rect.top + (rect.height / 2) - 16;
    this.setState({ttvis: true, rect: calculated, ttext: tip.text});
  }

  hideTooltip() {
    this.setState({ttvis: false});
  }

  render() {
    // const { activateMenu, minimal, settings, user, menu: { active, last, items } } = this.props;
    const { minimal, user, menu: { items, disabled } } = this.props;
    const { height, width, ttvis, rect, ttext } = this.state;
    const internalMinimal = minimal || (width <= 768);
    const styles = require('./NavMenu.scss');
    const logoEmbed = require('./logo.png');
    const style = {
      menuWrapper: {
        position: 'relative',
        zIndex: 1928,
        width: (disabled) ? 0 : 'auto',
        display: (disabled) ? 'none' : 'block'
      },
      fixedLeft: {
        position: 'absolute',
        left: 0,
        bottom: 'auto',
        height: height,
        top: 0,
        right: 0,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        // boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
        borderRadius: 0,
        borderRight: '1px solid #ccc',
        backgroundColor: '#f5f5f5'
      },
      body: {
        boxSizing: 'content-box',
        bottom: 50,
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        width: '100%',
        borderBottom: '1px solid #ccc'
      },
      support: {
        boxSizing: 'content-box',
        bottom: 0,
        position: 'absolute',
        height: 50,
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'space-around'
      },
      menu: {
        display: 'flex',
        flexWrap: 'wrap',
        cursor: 'pointer',
        justifyContent: (internalMinimal) ? 'space-around' : 'flex-start',
        // borderBottom: (minimal) ? '0' : '1px solid #dedede'
      },
      icon: {
        padding: 7,
        fontSize: 25
      },
      iconBorder: {
        width: 55,
        height: 45
      },
      iconMaxBorder: {
        width: 45,
        height: 45
      },
      menuText: {
        textAlign: 'right',
        paddingTop: 6,
        fontSize: 14
      },
      imageStyle: {
        width: '80%',
        height: 40,
        display: 'block',
        margin: '10px 0'
      },
      logo: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderBottom: '1px solid #dedede',
      },
      tooltip: {
        top: (ttvis) ? rect : -10000,
        left: (ttvis) ? 60 : -10000,
        opacity: (ttvis) ? 1 : 0,
        visibility: (ttvis) ? 'visible' : 'hidden'
      }
    };
    const findOne = (haystack, arr) => arr.some( (vol) => haystack.indexOf(vol) >= 0);
    return (
      <div className={`${styles.leftNav} ${user || styles.navinVis} ${internalMinimal && styles.minimal}`} style={style.menuWrapper}> {user &&
        <div style={style.fixedLeft}>
          <div style={style.body}>
            {items && items.map((menu, index) => ((menu.onlyIfHasRole && (user.globalPermissions && user.globalPermissions.length && !findOne(menu.onlyIfHasRole, user.globalPermissions)) || !user.globalPermissions) ? <div key={index}></div> : <div
              key={index}
              onMouseEnter={this.showTooltip.bind(this, menu)}
              onMouseLeave={this.hideTooltip.bind(this, null)}
              onTouchTap={this.action.bind(this, menu)}
              style={style.menu} className={styles.menu}>
              <div
              className="material-icons" style={style.icon}>{menu && menu.icon}</div>
              {internalMinimal || <div style={style.menuText}>{menu && menu.text}</div>}
            </div>))}
          </div>
          <div style={style.support} onTouchTap={() => this.props.pushState(null, '/exercise-support')}><img src={logoEmbed} style={{maxWidth: '80%', maxHeight: '80%', display: 'block', marginTop: 5}}/></div>
        </div>
    }
    <div className={styles.tooltip} style={style.tooltip}>{ttext}</div>
    </div>);
  }
}
