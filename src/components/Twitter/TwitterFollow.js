import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { loadSearch } from 'redux/modules/search';

@connect(
  state => ({
    user: state.auth.user,
    // articles: state.intellipedia.data,
    settings: state.permissions.data,
    params: state.router.params,
    search: state.search.data,
    searchLoading: state.search.loading
  }),
  { loadSearch }
)
export default class TwitterNavBar extends Component {
  static propTypes = {
    user: PropTypes.object,
    // pushState: PropTypes.func.isRequired,
    // updateSettings: PropTypes.func.isRequired,
    loadSearch: PropTypes.func.isRequired,
    settings: PropTypes.object,
    search: PropTypes.object
  }

  constructor(params) {
    super(params);
    this.state = {menuMobaOpen: false, searching: false};
  }

  render() {
    // const css = require('./Intellipedia.scss');
    // const { articles, user: { globalPermissions: { admin } } } = this.props;
    return (
      <div>
      nav bar
      </div>
    );
  }
}
