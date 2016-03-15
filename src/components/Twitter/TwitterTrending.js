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
export default class TwitterTrending extends Component {
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
    const { user } = this.props;
    const css = require('./twitter.scss');
    // const { articles, user: { globalPermissions: { admin } } } = this.props;
    // <div className={`${css.ProfileCardStats}`}>
    //   <ul className={`${css['ProfileCardStats-statList']} ${css.Arrange} ${css.Arrangebottom} ${css.Arrangeequal}`}>
    //     <li className={`${css['ProfileCardStats-stat']} ${css['Arrange-sizeFit']}`}>
    //       <a className={`${css['ProfileCardStats-statLink']} ${css['u-textUserColor']} ${css['u-linkClean']} ${css['js-nav']} ${css['u-link']}`} title="267 Tweets" href={user.twitterName} data-element-term="tweet_stats">
    //         <span className={`${css['ProfileCardStats-statLabel']} ${css['u-block']}`}>Tweets</span>
    //         <span className={`${css['ProfileCardStats-statValue']}`}>267</span>
    //       </a>
    //     </li>
    //     <li className={`${css['ProfileCardStats-stat']} ${css['Arrange-sizeFit']}`}>
    //       <a className={`${css['ProfileCardStats-statLink']} ${css['u-textUserColor']} ${css['u-linkClean']} ${css['js-nav']} ${css['u-link']}`} title="267 Tweets" href={user.twitterName} data-element-term="tweet_stats">
    //         <span className={`${css['ProfileCardStats-statLabel']} ${css['u-block']}`}>Tweets</span>
    //         <span className={`${css['ProfileCardStats-statValue']}`}>267</span>
    //       </a>
    //     </li>
    //     <li className={`${css['ProfileCardStats-stat']} ${css['Arrange-sizeFit']}`}>
    //       <a className={`${css['ProfileCardStats-statLink']} ${css['u-textUserColor']} ${css['u-linkClean']} ${css['js-nav']} ${css['u-link']}`} title="267 Tweets" href={user.twitterName} data-element-term="tweet_stats">
    //         <span className={`${css['ProfileCardStats-statLabel']} ${css['u-block']}`}>Tweets</span>
    //         <span className={`${css['ProfileCardStats-statValue']}`}>267</span>
    //       </a>
    //     </li>
    //   </ul>
    // </div>
    return (
      <div className={`${css.dashboard} ${css['dashboard-left']}`}>
        {user && <div className={`${css.DashboardProfileCard} ${css.module}`}>
          <div className={`${css['DashboardProfileCard-content']}`}>
          <a style={{display: 'block', marginTop: 60}} className={`${css['DashboardProfileCard-avatarLink']} ${css['u-inlineBlock']}`} href={user.twitterName} title="Fk-Consulting" tabIndex="-1" aria-hidden="true">
          </a>
          <div style={{top: 15, left: 20}} className={`${css['DashboardProfileCard-userFields']}`}>
            <div className={`${css['DashboardProfileCard-name']} ${css['u-textTruncate']}`}>
              <a className={`${css['u-textInheritColor']}`} href={`/twitter/user/${user.twitterName}`}>{user.realName}</a>
            </div>
            <span className={`${css['DashboardProfileCard-screenname']} ${css['u-inlineBlock']} ${css['u-dir']}`} dir="ltr">
              <a className={`${css['DashboardProfileCard-screennameLink']} ${css['u-linkComplex']} ${css['u-linkClean']}`} href={`/twitter/user/${user.twitterName}`}>@<span className={`${css['u-linkComplex-target']}`}>{user.twitterName}</span></a>
            </span>
          </div>

          <div id="dashboard-profile-prompt"></div>
        </div>
      </div>}
      {user && <div className={`${css.Trends} ${css.module} ${css.trends}`}>
        <div className={`${css['trends-inner']}`}>
          <div className={`${css['flex-module']} ${css['trends-container']}`}>
            <div className={`${css['flex-module-header']}`}>
              <h3><span className={`${css['trend-location']} ${css['js-trend-location']}`}>Trends</span></h3>
            </div>
            <div className={`${css['flex-module-inner']}`}>
              <ul className={`${css['trend-items']} ${css['js-trends']}`}>
                <li className={`${css['trend-item']} ${css['js-trend-item']}`} data-trend-name="#ExoMars">
                  <a className={`${css['js-nav']} ${css['trend-name']}`} dir="ltr" href="/hashtag/ExoMars?src=tren" data-query-source="trend_click">#ExoMars</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>}
    </div>
    );
  }
}
