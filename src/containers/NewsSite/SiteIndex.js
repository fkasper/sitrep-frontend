import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {load as loadStories} from 'redux/modules/newsstories';
import * as newsStoriesActions from 'redux/modules/newsstories';
import {changeMenuMode} from 'redux/modules/menu';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
// import { EditNewsStoriesForm } from 'components';
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
export default class SiteIndex extends Component {
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

  settingsKey(item) {
    const { params: { siteId } } = this.props;
    return 'newsSite' + siteId + item;
    // this.props.updateSettings(key, location.value.logo);
  }

  setting(name, fallback) {
    const { settings } = this.props;
    const key = this.settingsKey(name);
    return settings[key] || fallback;
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
    const { stories, params: { siteId } } = this.props;
    // const { editing } = this.state;
    const css = require('./Style.scss');
    const styles = require('./Style.js');
    const validStories = stories && stories.filter((item) => (!item.scheduled || (item.scheduled && (item.scheduledPostDate * 1000 < (new Date()).getTime()))) );
    const trending = stories && validStories.filter((item) => item.meta && item.meta.trending).slice(0, 5).sort((ab, ba) => ab.meta.trending - ba.meta.trending);
    return (<div>
      <div style={styles.bodyContentInner}>
        <Helmet title={`News Station`}/>
        {this.setting('newsStyle', 'new') === 'new' ?
        <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '66.666%'}} className={css.moba100Perc}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>Trending</div>
            </div>
            <div style={styles.sliderNews}>
              {trending && trending[0] &&
                <div style={{...styles.sliderItem, ...styles.sliderItemActive}}
                  draggable
                  onDragStart={this._dragStart.bind(this, trending[0])}
                  onDragStop={this._dragStop.bind(this, trending[0].meta.trending)}
                  onDrop={this._drop.bind(this, trending[0])}
                  onDragOver={this.preventDefault}
                  onTouchTap={this._switchToArticle.bind(this, trending[0].id)}
                  className={css.sliderItem}>
                  <div className={css.prn}>
                    <div style={styles.caption} className={css.mobaHeight200}>
                      <div style={styles.captionTitle} className={css.mobaFw10}>{trending[0].title}</div>
                      <div style={styles.captionInfo}>Posted {moment(trending[0].scheduledPostDate * 1000).fromNow()}</div>
                      {trending[0].meta && trending[0].meta.description && <div style={styles.captionDescription}>{trending[0].meta.description}</div>}
                    </div>
                  </div>
                  <div className={css.plr}>
                  {trending[0].meta && trending[0].meta.preview && <img src={trending[0].meta.preview} className={`${css.perspectiveImage} ${css.mobaHeight200}`} style={styles.newsImage} /> }
                  </div>
                </div>
              }
              {trending &&
              <div style={{...styles.carouselItems, ...styles.flexWrapper}}>
              {trending.slice(1, 5).map(item =>
                <div style={styles.carouselItem}
                onDragStart={this._dragStart.bind(this, item)}
                onDragStop={this._dragStop.bind(this, item)}
                onDrop={this._drop.bind(this, item)}
                onDragOver={this.preventDefault}
                draggable
                key={item.id}
                onTouchTap={this._switchToArticle.bind(this, item.id)}
                className={css.carouselItem}>

                  <div style={styles.carouselThumb} className={css.carouselZoom}>
                    <img src={item.meta.preview} className={css.perspectiveImage}/>
                    <div className={css.carouselCaption} style={styles.carouselCaption}>
                      <div style={styles.carouselDescription}>{item.title}</div>
                    </div>
                  </div>

                </div>)}
              </div>}
            </div>
          </div>
          <div style={{...styles.sectionCategory, ...styles.gridOneThird}} className={`${css.moba100Perc} ${css.nopadLeft}`}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>Latest News{'  '}<a href="#" onClick={this._switchToArticle.bind(this, 'new')} style={{...styles.latestNewsInfo, ...styles.actions, padding: 2, color: '#000', textDecoration: 'none'}}>Add Story</a></div>
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
        </div> : <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '66.666%'}} className={css.moba100Perc}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>Latest</div>
            </div>
            <div style={styles.sliderNews}>
              {trending && trending[0] &&
                <div style={{...styles.sliderItem, ...styles.sliderItemActive}}
                  onTouchTap={this._switchToArticle.bind(this, validStories[0].id)}
                  className={css.sliderItem}>
                  <div className={css.prn}>
                    <div style={styles.caption} className={css.mobaHeight200}>
                      <div style={styles.captionTitle} className={css.mobaFw10}>{validStories[0].title}</div>
                      <div style={styles.captionInfo}>Posted {moment(validStories[0].scheduledPostDate * 1000).fromNow()}</div>
                      {validStories[0].meta && validStories[0].meta.description && <div style={styles.captionDescription}>{validStories[0].meta.description}</div>}
                    </div>
                  </div>
                  <div className={css.plr}>
                  {validStories[0].meta && validStories[0].meta.preview && <img src={validStories[0].meta.preview} className={`${css.perspectiveImage} ${css.mobaHeight200}`} style={styles.newsImage} /> }
                  </div>
                </div>
              }
              {trending &&
              <div style={{...styles.carouselItems, ...styles.flexWrapper}}>
              {validStories.slice(1, 4).map(item =>
                <div style={styles.carouselItem}
                onDragStart={this._dragStart.bind(this, item)}
                onDragStop={this._dragStop.bind(this, item)}
                onDrop={this._drop.bind(this, item)}
                onDragOver={this.preventDefault}
                draggable
                key={item.id}
                onTouchTap={this._switchToArticle.bind(this, item.id)}
                className={css.carouselItem}>

                  <div style={styles.carouselThumb} className={css.carouselZoom}>
                    <img src={item.meta.preview} className={css.perspectiveImage}/>
                    <div className={css.carouselCaption} style={styles.carouselCaption}>
                      <div style={styles.carouselDescription}>{item.title}</div>
                    </div>
                  </div>

                </div>)}
              </div>}
            </div>
          </div>
        </div>}
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

      </div></div>
    );
  }
}
