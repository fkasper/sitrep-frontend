import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadArticle} from 'redux/modules/intellipedia';
import Helmet from 'react-helmet';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
// import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';


function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  if (!isLoaded(state) && typeof state.router.params.subject !== 'undefined') {
    return dispatch(loadArticle(state.router.params.subject));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    article: state.intellipedia.data,
    permissions: state.permissions.data
  })
)
export default class Intellipedia extends Component {
  static propTypes = {
    user: PropTypes.object,
    article: PropTypes.object,
    permissions: PropTypes.object
  }

  componentWillMount() {

  }

  adminToolbar() {
    return (<Toolbar>
    <ToolbarGroup float="right">
      <ToolbarTitle text="OC Options" />
      <IconMenu
        iconButtonElement={
          <IconButton touch>
            <NavigationExpandMoreIcon />
          </IconButton>
        }
      >
        <MenuItem primaryText="Download" />
        <MenuItem primaryText="More Info" />
      </IconMenu>
    </ToolbarGroup>
  </Toolbar>);
  }
  article() {
    return (<div style={{overflowY: 'auto'}}></div>);
  }
  render() {
    const { article, permissions: {IsAdmin, IsOc } } = this.props;
    const styles = require('./Intellipedia.scss');
    // require the logo image both from client and server
    return (
      <div style={{height: '100%'}}>
      <Helmet title="Intellipedia"/>
        <div style={{marginLeft: 340, height: '100%'}}>
          {(IsAdmin || IsOc) && this.adminToolbar()}
          {article ? this.article() : <div className={styles.noSuchPageFound}>No such page was found</div>}
        </div>
      </div>
    );
  }
}
