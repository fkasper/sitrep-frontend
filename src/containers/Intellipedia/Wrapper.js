import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import FlatButton from 'material-ui/lib/flat-button';
import { notify } from 'redux/modules/notifications';
import { changeMenuMode } from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { isLoaded, load as loadArticles } from 'redux/modules/intellipedia';
import { loadSearch } from 'redux/modules/search';
import * as intellipediaActions from 'redux/modules/intellipedia';
import { uploadFile } from 'redux/modules/uploads';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));
  if (!isLoaded(state)) {
    promises.push(dispatch(loadArticles()));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    articles: state.intellipedia.data,
    settings: state.permissions.data,
    params: state.router.params,
    search: state.search.data,
    searchLoading: state.search.loading
  }),
  {...intellipediaActions, updateSettings, pushState, loadSearch, notify, uploadFile}
)
export default class Wrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    articles: PropTypes.array,
    loadSearch: PropTypes.func.isRequired,
    settings: PropTypes.object,
    uploadFile: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    search: PropTypes.object,
    searchLoading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    params: PropTypes.object
  }

  constructor(params) {
    super(params);
    this.state = {menuMobaOpen: false, searching: false};
  }
  onTouchStart(articleId) {
    if (this.props.user && this.props.user.globalPermissions.admin) {
      this.touchTimer = setTimeout(() => {
        this.props.updateSettings('intellipediaDefaultPageId', articleId);
      }, 1000);
    }
  }

  onTouchEnd() {
    clearTimeout(this.touchTimer);
  }

  onDrop(page, event) {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      if (page) {
        this.props.uploadFile(event.dataTransfer.files).then((action) => {
          this.props.save(page.id, {...page, metadata: { ...page.metadata, preview: action.result.absRedirectTarget}}).then(this.props.notify('Your image was saved successfully'));
        });
      }
    }
  }
  preventDefault(event) {
    event.preventDefault();
  }

  render() {
    const css = require('./Intellipedia.scss');
    const { articles, user: { globalPermissions: { admin } } } = this.props;
    return (
      <div className={css.formatting}>
        <div className={css.header}>
          <h1>Intellipedia{admin && <FlatButton
            label="Create Page"
            secondary
            onTouchTap={() => this.props.pushState(null, `/intellipedia/new`)}
            type="submit" />}</h1>
        </div>
        <div className={css.townsList}>
        {articles && articles.length ? <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {articles.map((art) => <Link to={`/intellipedia/${art.id}`} className={css.town}
            onMouseDown={this.onTouchStart.bind(this, art.id)}
            onMouseUp={this.onTouchEnd.bind(this, art.id)}
            onDrop={this.onDrop.bind(this, art)}
            onDragOver={this.preventDefault}
            onTouchStart={this.onTouchStart.bind(this, art.id)}
            onTouchEnd={this.onTouchEnd.bind(this, art.id)}>
            <div className={css.townImage} style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url(${art.metadata.preview})`}}></div>
            <div className={css.townName}>{art.metadata && art.metadata.title}</div>
            </Link>)
          }
        </div> : <div>
          <div>Nothing to see here (no pages are available right now)</div>
        </div>}

      </div>
        {this.props.children}
      </div>
    );
  }
}
