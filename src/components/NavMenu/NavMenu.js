import React, {Component, PropTypes} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import { findDOMNode } from 'react-dom';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as menuActions from 'redux/modules/menu';
import CircularProgress from 'material-ui/lib/circular-progress';

@connect(
  state => ({
    menu: state.menu,
    user: state.auth.user
  }), {
    ...menuActions
  })
export default class NavMenu extends Component {
  static propTypes = {
    menu: PropTypes.object,
    activateMenu: PropTypes.func.isRequired,
    open: PropTypes.bool,
    user: PropTypes.object,
    logoutHandler: PropTypes.func
  }

  componentWillMount() {
    this.setState({open: false});
    if (!__SERVER__) {
      this.updateDimensions();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  componentIsMounted() {
    try {
      findDOMNode(this);
      return true;
    } catch (err) {
      return false;
    }
  }

  updateDimensions() {
    if (this.componentIsMounted()) {
      const documentElement = document.documentElement;
      const body = document.getElementsByTagName('body')[0];
      const width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
      // height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;    // const height = windows.innerHeight;
      if (width <= 768) {
        this.setState({open: false});
        console.log('not open, state: ', this.state);
        return;
      }
      this.setState({open: true});
    }
    // this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  showPrevMenu = () => {
    this.showMoreMenu(this.props.menu.last);
  }

  render() {
    const { activateMenu, user, menu: { active, last, items } } = this.props;
    const { open } = this.state;

    const styles = require('./NavMenu.scss');
    return ( <div> {user &&
      <LeftNav open={open} style={{width: 340}} className={styles.navBar}>

        <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '80%', margin: '10px auto', display: 'block'}}/>
        {items ? items.map((menu) => {
          return (<List
            style={{
              display: (active === menu.Title) ? 'block' : 'none'
            }}
            className={styles.fadeIn}
            key={menu.Title}>
            {menu.HasBack &&
              <div>
                <ListItem
                  style={{fontSize: 14}}
                  leftIcon={<i className="material-icons">chevron_left</i>}
                  onTouchTap={() => { activateMenu(last);}}
                  primaryText="Back"
                  className={styles.backButton} />
                <Divider />
              </div>}
            {menu.Items.map((item) => {
              return (<div key={`${menu.Title}_${item.Text}`}>
                <ListItem
                  leftIcon={<i className="material-icons">{item.Icon}</i>}
                  rightIcon={item.LinksToSubMenu ? <i className="material-icons">chevron_right</i> : <i></i>}
                  containerElement={!item.LinksToSubMenu ? <Link to={item.Target} style={{fontSize: 14}}/> : <a style={{fontSize: 14}}/>}
                  onTouchTap={ (evnt) => {
                    return (item.LinksToSubMenu ?
                      activateMenu(item.Target)
                    : (
                      (item.Target === 'logout()') && this.props.logoutHandler(evnt)
                    )
                  );}}
                  primaryText={item.Text}/>
                <Divider />
              </div>);
            })}
          </List>);
        }) : <CircularProgress />}
      </LeftNav> }</div>
    );
  }
}
