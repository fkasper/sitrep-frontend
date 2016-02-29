import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {load as loadStories} from 'redux/modules/newsstories';
import connectData from 'helpers/connectData';
import * as newsStoriesActions from 'redux/modules/newsstories';
import {changeMenuMode} from 'redux/modules/menu';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import { EditNewsStoriesForm } from 'components';
import moment from 'moment';
// import RaisedButton from 'material-ui/lib/raised-button';
// import Add from 'material-ui/lib/svg-icons/content/add';


// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';
// import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
// import IconButton from 'material-ui/lib/icon-button';
// import Paper from 'material-ui/lib/paper';


function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, true)));
  if (typeof state.router.params.siteId !== 'undefined') {
    promises.push(dispatch(loadStories(state.router.params.siteId)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    stories: state.newsstories.data,
    settings: state.permissions.data,
    editing: state.newsstories.editing,
    params: state.router.params
  }),
  {...newsStoriesActions, pushState}
)
export default class SiteArchive extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    stories: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    switchTrending: PropTypes.func.isRequired,
    settings: PropTypes.object,
    editing: PropTypes.object,
    params: PropTypes.object
  }
  _dragStart(trend, event) {
    event.dataTransfer.setData('trend', JSON.stringify(trend));
  }
  _dragStop(trend, event) {
    console.log('Drag stop ', event);
  }
  _drop(newTrend, event) {
    event.preventDefault();

    let oldTrend;

    try {
      oldTrend = JSON.parse(event.dataTransfer.getData('trend'));
    } catch (err) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }
    if (oldTrend && oldTrend.meta && oldTrend.meta.trending) {
      this.props.switchTrending(newTrend, oldTrend);
    }
    console.log('Dropped ', event, newTrend, oldTrend);
  }

  _switchToArticle(articleId) {
    const { params: { siteId } } = this.props;
    this.props.pushState(null, `/news-site/${siteId}/${articleId}`);
  }

  preventDefault(event) {
    event.preventDefault();
  }
  // componentWillMount() {
  //   this.setState({editing: false});
  // }


  render() {
    // const { settings, biography, user, user: {globalPermissions: { admin } } } = this.props;
    const { editing, stories} = this.props;
    // const { editing } = this.state;
    // const css = require('./Style.scss');
    const styles = require('./Style.js');
    const validStories = stories && stories.filter((item) => (!item.scheduled || (item.scheduled && (item.scheduledPostDate * 1000 < (new Date()).getTime()))) ).sort((ab, ba) => ba.scheduledPostDate - ab.scheduledPostDate);

    return (<div>
      {(editing && editing.create) ? <EditNewsStoriesForm formKey={'newsStory'} sKey={''} initialValues={{}} /> :
      <div style={styles.bodyContentInner}>
        <Helmet title={`News Archive`}/>

        <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '100%'}}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>News Archive</div>
            </div>
            <div style={styles.sectionContent}>
              <div style={{...styles.unstyledList}}>
                {stories && validStories.map(item => <div style={{...styles.latestNewsItem}} key={item.id} onTouchTap={this._switchToArticle.bind(this, item.id)}>
                  <div style={styles.archiveImage}></div>
                  <div style={styles.archiveBody}>
                    <div style={{fontSize: 18, cursor: 'pointer'}}>{item.title}</div>
                    <div style={styles.singleInfoLeft}>Posted {moment(item.scheduledPostDate * 1000).fromNow()}</div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{...styles.sectionCategory}}>
          <div style={styles.sectionName}>
            <div style={{color: '#333'}}>LATEST ARTICLES</div>
          </div>
          <div style={styles.sectionContent}>
            <ul style={{...styles.unstyledList}}>
              <li style={{...styles.latestNewsItem}}>
                <a href="#" style={{...styles.latestNewsTitle}}>Title</a>
                <div style={styles.latestNewsInfo}>2 hours ago</div>
              </li>
            </ul>
          </div>
        </div> */}

      </div>}</div>
    );
  }
}

// <Link to={`/news-site/${siteId}/${item.id}`} style={{...styles.latestNewsTitle}}>{item.title}</Link>
// <div style={styles.latestNewsInfo}>Posted {moment(item.scheduledPostDate * 1000).fromNow()}</div>
