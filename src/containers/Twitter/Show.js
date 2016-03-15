import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {loadSingle as loadArticle} from 'redux/modules/intellipedia';
import Helmet from 'react-helmet';
import {changeMenuMode} from 'redux/modules/menu';
import { EditableIntellipediaPage } from 'components';


function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));
  if (typeof state.router.params.storyId !== 'undefined') {
    promises.push(dispatch(loadArticle(state.router.params.storyId)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    article: state.intellipedia.single,
    settings: state.permissions.data
  }),
  { loadArticle }
)
export default class Show extends Component {
  static propTypes = {
    user: PropTypes.object,
    article: PropTypes.object,
    updateSettings: PropTypes.func.isRequired,
    loadArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  render() {
    const { article } = this.props;
    const css = require('./Intellipedia.scss');
    return (
      <div style={{height: '100%'}}>
      <Helmet title={`${article && article.metadata.title} - Intellipedia`} />
        <div style={{overflowY: 'auto'}} className={css.formatting}>
          { (article && article.content) ? <div className={css.formatting} style={{padding: 10}}>
            <h1><EditableIntellipediaPage formKey={article.id} type="text" initialValues={article} sKey="metadata.title" /></h1>
            <EditableIntellipediaPage formKey={article.id} type="textblock" initialValues={article} sKey="content" />
          </div> : <div>Loading</div>}
          <div></div>
        </div>
      </div>
    );
  }
}
