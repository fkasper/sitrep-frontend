import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
// import FlatButton from 'material-ui/lib/flat-button';
import { notify } from 'redux/modules/notifications';
import { changeMenuMode } from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
// import { isLoaded, load as loadTweets } from 'redux/modules/tweets';
import { loadSearch } from 'redux/modules/search';
import { TwitterNavBar, TwitterTrending } from 'components';

function fetchDataDeferred(getState, dispatch) {
  // const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, true)));
  // if (!isLoaded(state)) {
  //   promises.push(dispatch(loadArticles()));
  // }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    // articles: state.intellipedia.data,
    settings: state.permissions.data,
    params: state.router.params,
    search: state.search.data,
    searchLoading: state.search.loading
  }),
  { updateSettings, pushState, loadSearch, notify }
)
export default class Wrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    loadSearch: PropTypes.func.isRequired,
    settings: PropTypes.object,
    notify: PropTypes.func.isRequired,
    search: PropTypes.object,
    children: PropTypes.node.isRequired,
    params: PropTypes.object
  }

  constructor(params) {
    super(params);
    this.state = {menuMobaOpen: false, searching: false};
  }

  componentWillMount() {
    if (!this.props.user.twitterName) {
      this.props.pushState(null, '/twitter/create-handle');
    }
  }

  render() {
    const css = require('components/Twitter/twitter.scss');
    // const { articles, user: { globalPermissions: { admin } } } = this.props;
    return (
      <div style={{background: '#f5f8fa', height: '100%'}}>
        <TwitterNavBar />
        <div>
          <div style={{height: '100%'}}>
            <div className={`${css.AppContent} ${css.wrapper} ${css['wrapper-home']}`} style={{position: 'relative', padding: '56px 14px 15px', margin: '0 auto', minHeight: 0}}>
              <TwitterTrending />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
