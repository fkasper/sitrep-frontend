import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {loadSingle, load, isLoaded} from 'redux/modules/newsstories';
import * as newsStoriesActions from 'redux/modules/newsstories';
import {changeMenuMode} from 'redux/modules/menu';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import { EditableNewsStoryElement } from 'components';
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
  if (!isLoaded(state) && typeof state.router.params.siteId !== 'undefined') {
    promises.push(dispatch(load(state.router.params.siteId)));
  }
  if (typeof state.router.params.siteId !== 'undefined' && typeof state.router.params.storyId !== 'undefined') {
    promises.push(dispatch(loadSingle(state.router.params.siteId, state.router.params.storyId)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    story: state.newsstories.single,
    stories: state.newsstories.data,
    settings: state.permissions.data,
    editing: state.newsstories.editing,
    params: state.router.params
  }),
  {...newsStoriesActions, pushState}
)
export default class SiteShow extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    story: PropTypes.object,
    stories: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    switchTrending: PropTypes.func.isRequired,
    settings: PropTypes.object,
    editing: PropTypes.object,
    params: PropTypes.object,
    loadSingle: PropTypes.func.isRequired
  }
  componentWillMount() {
    // loadSingle(this.props.params.siteId, this.props.params.storyId);
    setTimeout(() => {
      console.log('performing reload! StoryID: ', this.props.params.storyId);
      if (!this.props.story || !this.props.story.htmlContent || !this.props.story.title) {
        loadSingle(this.props.params.siteId, this.props.params.storyId);
      }
    }, 1200);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.story && newProps.story.id && this.props.params.storyId === 'new') {
      this._switchToArticle(newProps.story.id);
    }
  }
  // _dragStart(trend, event) {
  //   event.dataTransfer.setData('trend', JSON.stringify(trend));
  // }
  // _dragStop(trend, event) {
  //   console.log('Drag stop ', event);
  // }
  // _drop(newTrend, event) {
  //   event.preventDefault();
  //
  //   let oldTrend;
  //
  //   try {
  //     oldTrend = JSON.parse(event.dataTransfer.getData('trend'));
  //   } catch (err) {
  //     // If the text data isn't parsable we'll just ignore it.
  //     return;
  //   }
  //   if (oldTrend && oldTrend.meta && oldTrend.meta.trending) {
  //     this.props.switchTrending(newTrend, oldTrend);
  //   }
  //   console.log('Dropped ', event, newTrend, oldTrend);
  // }
  //
  _switchToArticle(articleId) {
    const { params: { siteId } } = this.props;
    this.props.pushState(null, `/news-site/${siteId}/${articleId}`);
  }
  //
  // preventDefault(event) {
  //   event.preventDefault();
  // }
  // componentWillMount() {
  //   this.setState({editing: false});
  // }


  render() {
    // const { settings, biography, user, user: {globalPermissions: { admin } } } = this.props;
    const { stories, story, params: { siteId, storyId } } = this.props;
    // const { editing } = this.state;
    const css = require('./Style.scss');
    const styles = require('./Style.js');
    const validStories = stories && stories.filter((item) => (!item.scheduled || (item.scheduled && (item.scheduledPostDate * 1000 < (new Date()).getTime()))) );
    // const trending = stories && validStories.filter((item) => item.meta && item.meta.trending).slice(0, 5).sort((ab, ba) => ab.meta.trending - ba.meta.trending);
    return (<div>
      {(story || storyId === 'new') ?
      <div style={styles.bodyContentInner}>
        <Helmet title={`${story && story.title}`}/>

        <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '66.666%'}} className={`${css.moba100Perc} ${css.nopadLeft}`}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>STORY</div>
            </div>
            <div style={styles.sliderNews}>
              <h1 style={styles.singleTitle}>
                <a href="#" style={styles.singleTitleA}><EditableNewsStoryElement station={siteId} type="text" formKey={story && story.id} sKey="title" initialValues={story} /></a>
              </h1>
              <div style={{...styles.flexSpace, ...styles.singleInfo}}>
                <div style={styles.singleInfoLeft}>Posted: {story && moment(story.scheduledPostDate * 1000).fromNow()}</div>
                <div></div>
              </div>
              <div style={styles.mainNews} className={css.mainNews}>
                <EditableNewsStoryElement station={siteId} type="textblock" formKey={story && story.id} sKey="htmlContent" initialValues={story} />
              </div>
            </div>
          </div>
          <div style={{...styles.sectionCategory, ...styles.gridOneThird}} className={`${css.moba100Perc} ${css.nopadLeft}`}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>Latest News{'  '}<a href="#" onClick={this.props.editStart.bind(this, null)} style={{...styles.latestNewsInfo, textDecoration: 'none'}}>Add Story</a></div>
            </div>
            <div style={styles.sectionContent}>
              <ul style={{...styles.unstyledList}}>
                {stories && validStories.slice(0, 5).map(item => <li style={{...styles.latestNewsItem}} key={item.id}>
                  <Link to={`/news-site/${siteId}/${item.id}`} style={{...styles.latestNewsTitle}}>{item.title}</Link>
                  <div style={styles.latestNewsInfo}>Posted {moment(item.scheduledPostDate * 1000).fromNow()}</div>
                </li>)}
              </ul>
            </div>
          </div>
        </div>

      </div> : <div>Loading</div>}</div>
    );
  }
}
