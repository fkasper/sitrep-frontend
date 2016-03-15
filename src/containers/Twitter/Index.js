import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadTweets} from 'redux/modules/tweets';
import Helmet from 'react-helmet';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import * as twitterActions from 'redux/modules/tweets';

import { pushState } from 'redux-router';
// import { EditableIntellipediaPage } from 'components';
import twttr from 'utils/twittertext';
function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, true)));
  if (!isLoaded(state)) {
    promises.push(dispatch(loadTweets()));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    tweets: state.tweets.data,
    trending: state.tweets.trending,
    settings: state.permissions.data
  }),
  {...twitterActions, updateSettings, pushState}
)
export default class Index extends Component {
  static propTypes = {
    user: PropTypes.object,
    tweets: PropTypes.array,
    trending: PropTypes.array,
    updateSettings: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.touchTimer = null;
  }

  componentDidMount() {
    setInterval(() => {
      this.props.load(0, 100);
    }, 30000);
    if (window) {
      this.refs.scrollanchor.addEventListener('scroll', () => {
        console.log(this.isVisible(this.refs.last));
      });
    }
  }

  isVisible(elem) {
    const shift = 10;
    const coords = elem.getBoundingClientRect();
    const topVisible = coords.top > 0 && coords.top < 0;
    const bottomVisible = coords.bottom < shift && coords.bottom > 0;
    return topVisible || bottomVisible;
  }

  render() {
    // const { article, user: {globalPermissions: { admin } } } = this.props;
    const { tweets } = this.props;
    const css = require('components/Twitter/twitter.scss');
    // require the logo image both from client and server className={`${css['']} ${css['']}
    return (
      <div style={{height: '100%'}}>
        <Helmet title="Twitter"/>
        <div className={`${css['content-main']} ${css['top-timeline-tweetbox']}`} style={{width: 563}}>
          <div className={`${css['stream-container']} ${css['conversations-enabled']}`}>
            <div className={`${css.stream}`}>
              <ol className={`${css['stream-items']}`} ref="scrollanchor">
                { tweets && tweets.length && tweets.map((tweet, index) => <li key={index} className={`${css['js-stream-item']} ${css['stream-item']} ${css['expanding-stream-item']}`}>
                  <div ref={(index + 1 === tweets.length) && 'last' } className={`${css.tweet} ${css['original-tweet']} ${css['js-original-tweet']} ${css['js-stream-tweet']} ${css['js-actionable-tweet']} ${css['js-profile-popup-actionable']}`} >
                  { tweet.retweeted_status && <div className={css.context}>
                    <div className={`${css['tweet-context']} ${css['with-icn']}`}>
                      <span className={`${css.Icon} ${css['Icon--small']} ${css['Icon--retweeted']}`} />
                      <span className={css['js-retweet-text']}><a className={css['pretty-link']} href={`/twitter/user/${tweet.user.screen_name}`}><b>{tweet.user.name}</b></a> Retweeted</span>
                    </div>
                  </div>}
                    <div className={`${css.content}`}>
                      <div className={`${css['stream-item-header']}`}>
                        { tweet.retweeted_status ? <a className={`${css['account-group']} ${css['js-nav']}`} href={`/twitter/user/${tweet.retweeted_status.user.screen_name}`}>
                          <img className={css.avatar} src={tweet.retweeted_status.user.profile_image_url_https} />
                          <strong className={css.fullname}>{tweet.retweeted_status.user.name}</strong>{` `} <span className={css.username}>{tweet.retweeted_status.user.screen_name}</span>
                        </a> : <a className={`${css['account-group']} ${css['js-nav']}`} href={`/twitter/user/${tweet.user.screen_name}`}>
                          <img className={css.avatar} src={tweet.user.profile_image_url_https} />
                          <strong className={css.fullname}>{tweet.user.name}</strong>{` `} <span className={css.username}>{tweet.user.screen_name}</span>
                        </a>}

                      </div>
                      <div className={css['js-tweet-text-container']}>
                        <p className={css.TweetTextSize} dangerouslySetInnerHTML={{__html: twttr.txt.autoLink(tweet.text)}}>
                        </p>
                      </div>

                      <div className={css['stream-item-footer']}>
                        <div className={css.ProfileTweetActionList} style={{marginTop: 10}}>
                          <div className={`${css['ProfileTweet-action']} ${css['ProfileTweet-action--reply']}`}>
                            <button className={`${css['ProfileTweet-actionButton']} ${css['u-textUserColorHover']}`}>
                              <div className={css.IconContainer}>
                                <span className={`${css.Icon} ${css['Icon--reply']}`}></span>
                              </div>
                            </button>
                          </div>
                          <div className={`${css['ProfileTweet-action']} ${css['ProfileTweet-action--retweet']}`}>
                            <button className={`${css['ProfileTweet-actionButton']} ${css['u-textUserColorHover']}`}>
                              <div className={css.IconContainer}>
                                <span className={`${css.Icon} ${css['Icon--retweet']}`}></span>
                              </div>
                              <div className={css.IconTextContainer}>
                                <span className={`${css['ProfileTweet-actionCount']}`}>
                                  <span className={css['ProfileTweet-actionCountForPresentation']}>{tweet.retweet_count}</span>
                                </span>
                              </div>
                            </button>
                          </div>
                          <div className={`${css['ProfileTweet-action']} ${css['ProfileTweet-action--retweet']}`}>
                            <button className={`${css['ProfileTweet-actionButton']} ${css['u-textUserColorHover']}`}>
                              <div className={css.IconContainer}>
                                <div className={css.HeartAnimationContainer}>
                                  <div className={css.HeartAnimation}></div>
                                </div>
                              </div>
                              <div className={css.IconTextContainer}>
                                <span className={`${css['ProfileTweet-actionCount']}`}>
                                  <span className={css['ProfileTweet-actionCountForPresentation']}>{tweet.favorite_count}</span>
                                </span>
                              </div>
                            </button>
                          </div>
                          <div className={`${css['ProfileTweet-action']} ${css['ProfileTweet-action--retweet']}`}>
                            <button className={`${css['ProfileTweet-actionButton']} ${css['u-textUserColorHover']}`}>

                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <Editor stateOnly value={article.content} onChange={() => {}} formKey={article.id}/>
