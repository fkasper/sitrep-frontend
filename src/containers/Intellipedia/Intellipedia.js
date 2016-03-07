import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadArticles, loadSingle as loadArticle} from 'redux/modules/intellipedia';
import Helmet from 'react-helmet';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { pushState } from 'redux-router';
import { EditableIntellipediaPage } from 'components';
// import colors from 'material-ui/lib/styles/colors';
// import Add from 'material-ui/lib/svg-icons/content/add';
import RaisedButton from 'material-ui/lib/raised-button';


// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';
// import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
// import IconButton from 'material-ui/lib/icon-button';
// import Paper from 'material-ui/lib/paper';


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
    article: state.intellipedia.single,
    settings: state.permissions.data
  }),
  {updateSettings, pushState, loadArticle}
)
export default class Intellipedia extends Component {
  static propTypes = {
    user: PropTypes.object,
    articles: PropTypes.array,
    article: PropTypes.object,
    updateSettings: PropTypes.func.isRequired,
    loadArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.touchTimer = null;
  }

  componentWillMount() {
    this.loadHomepage(this.props.settings.intellipediaDefaultPageId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings && (nextProps.settings.intellipediaDefaultPageId !== this.props.settings.intellipediaDefaultPageId)) {
      this.loadHomepage(nextProps.settings.intellipediaDefaultPageId);
    }
  }

  loadHomepage(articleId) {
    this.props.loadArticle(articleId);
  }

  longTouchStart(articleId) {
    if (this.props.user && this.props.user.globalPermissions.admin) {
      this.touchTimer = setTimeout(() => {
        this.props.updateSettings('intellipediaDefaultPageId', articleId);
      }, 1000);
    }
  }

  longTouchEnd() {
    clearTimeout(this.touchTimer);
  }

  // adminSetDefault() {
  //   const { settings } = this.props;
  //   const csStyles = require('containers/Login/Login.scss');
  //
  //   return (<div><div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Set the default Page ID (only text right now)</div>
  //   <div><input type="text"
  //           className={csStyles.ipb}
  //           onBlur={(ev) => this.props.updateSettings('intellipediaDefaultPageId', ev.target.value)}
  //           onChange={(ev) => this.props.updateSettings('intellipediaDefaultPageId', ev.target.value)}
  //           placeholder={"Set the default Page ID"}
  //           value={settings.intellipediaDefaultPageId}
  //         /></div></div>);
  // }

  render() {
    // const { article, user: {globalPermissions: { admin } } } = this.props;
    const { articles, article, settings, user: {globalPermissions: { admin } } } = this.props;
    const css = require('./Intellipedia.scss');
    // require the logo image both from client and server
    return (
      <div style={{height: '100%'}}>
      <Helmet title="Intellipedia"/>
        <div style={{overflowY: 'auto'}} className={css.formatting}>
          <div className={css.header}>
            <h1>Intellipedia</h1>{admin && <RaisedButton
              label="New"
              secondary
              onTouchTap={() => this.props.pushState(null, `/intellipedia/new`)}
              type="submit" />}
          </div>

          <div className={css.townsList}>

          {articles && articles.length ? <div>
            {articles.map((art) => <div className={css.town}
              onMouseDown={this.longTouchStart.bind(this, art.id)}
              onMouseUp={this.longTouchEnd.bind(this, art.id)}
              onTouchStart={this.longTouchStart.bind(this, art.id)}
              onTouchEnd={this.longTouchEnd.bind(this, art.id)}
              onTouchTap={() => this.props.pushState(null, `/intellipedia/${art.id}`)}>
              <div className={css.townImage} style={{backgroundImage: `url(${art.metadata.preview})`}}></div>
              <div className={css.townName}>{art.metadata && art.metadata.title}</div>
              </div>)
            }

            { settings && settings.intellipediaDefaultPageId && article && article.content &&
              <div className={css.formatting} style={{padding: 10}}>
                <h1><EditableIntellipediaPage formKey={article.id} type="text" initialValues={article} sKey="metadata.title" /></h1>
                <EditableIntellipediaPage formKey={article.id} type="textblock" initialValues={article} sKey="content" />
              </div>
            }
          </div> : <div>
            <div>Nothing to see here (no pages are available right now)</div>
          </div>}
        </div>
      </div>
      </div>
    );
  }
}

// <Editor stateOnly value={article.content} onChange={() => {}} formKey={article.id}/>
