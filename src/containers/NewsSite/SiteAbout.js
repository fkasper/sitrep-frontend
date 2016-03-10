import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import {loadSingle as loadTextPart} from 'redux/modules/intellipedia';
import * as aboutActions from 'redux/modules/newsstories';
import {changeMenuMode} from 'redux/modules/menu';
import { EditableIntellipediaPage } from 'components';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, true)));
  if (typeof state.router.params.siteId !== 'undefined') {
    promises.push(dispatch(loadTextPart(state.router.params.siteId)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data,
    page: state.intellipedia.single,
    params: state.router.params
  }),
  {...aboutActions, pushState}
)
export default class SiteAbout extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    page: PropTypes.object,
    settings: PropTypes.object,
    params: PropTypes.object
  }

  render() {
    // const { settings, biography, user, user: {globalPermissions: { admin } } } = this.props;
    // const { editing, stories} = this.props;
    const { params: { siteId }, page } = this.props;
    // const css = require('./Style.scss');
    const styles = require('./Style.js');
    // const validStories = stories && stories.filter((item) => (!item.scheduled || (item.scheduled && (item.scheduledPostDate * 1000 < (new Date()).getTime()))) ).sort((ab, ba) => ba.scheduledPostDate - ab.scheduledPostDate);

    return (<div>
      <div style={styles.bodyContentInner}>
        <Helmet title={`Contact`}/>

        <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '100%'}}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>About</div>
            </div>
            <div style={styles.sectionContent}>
              <EditableIntellipediaPage formKey={siteId} type="textblock" initialValues={page && page.content ? page : { metadata: {}, characteristics: { queryGroup: 'abouts', queryScope: siteId }, content: 'please add content' }} sKey="content" />
            </div>
          </div>
        </div>

      </div></div>
    );
  }
}

// <Link to={`/news-site/${siteId}/${item.id}`} style={{...styles.latestNewsTitle}}>{item.title}</Link>
// <div style={styles.latestNewsInfo}>Posted {moment(item.scheduledPostDate * 1000).fromNow()}</div>
