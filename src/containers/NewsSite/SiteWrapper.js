import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { loadSearch } from 'redux/modules/search';
import {Link} from 'react-router';
import {UploadBlob} from 'components';
import moment from 'moment';
import Draggable from 'react-draggable'; // Both at the same time

function fetchDataDeferred(getState, dispatch) {
  getState();
  return dispatch(changeMenuMode(true, true));
}
@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    biography: state.biographies.single,
    settings: state.permissions.data,
    params: state.router.params,
    search: state.search.data,
    loading: state.search.loading
  }),
  {updateSettings, pushState, loadSearch}
)
export default class SiteWrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    loadSearch: PropTypes.func.isRequired,
    settings: PropTypes.object,
    search: PropTypes.object,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    params: PropTypes.object
  }

  constructor(params) {
    super(params);
    this.state = {menuMobaOpen: false, searching: false};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search && nextProps.search) {
      console.log(nextProps.search);
    }
  }

  onLogoChange(none, location) {
    const { params: { siteId } } = this.props;
    const key = 'newsSite' + siteId + 'logoUrl';
    this.props.updateSettings(key, location.value.logo);
  }
  onStop(evt, evt2) {
    const { params: { siteId } } = this.props;
    const key = 'newsSite' + siteId + 'logoPosX';
    this.props.updateSettings(key, (evt2.offsetX - 100).toString());
  }

  onStart() {
    this.setState({dragSet: true});
    console.log('onStart');
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

  generateLink() {

  }
  changeLink(target, event) {
    const { params: { siteId } } = this.props;
    this.props.pushState(null, `/news-site/${siteId}/${target}`);
    event.preventDefault();
    this.setState({searching: false});
    return false;
  }
  generateUUID() {
    let da = new Date().getTime();
    // if (window && window.performance && typeof window.performance.now === 'function') {
    //   da += performance.now(); // use high-precision timer if available
    // }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (cs) => {
      const ar = (da + Math.random() * 16) % 16 | 0;
      da = Math.floor(da / 16);
      return (cs === 'x' ? ar : (ar & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  search(__, evnt) {
    const { params: { siteId } } = this.props;
    const val = evnt.target.value;

    if (this._search) {
      clearTimeout(this._search);
    }
    this._search = setTimeout(() => {
      this.props.loadSearch(siteId, {
        query: {
          bool: {
            must: [
              {
                match: {
                  'info.queryType': 'newsStory'
                }
              },
              {
                multi_match: {
                  query: val,
                  fields: ['meta.title']
                }
              }
            ]
          }
        }
      });
    }, 200);
    this.setState({searching: true});
  }

  closeSearch() {
    this.setState({searching: false});
  }

  render() {
    const { settings, user, params: { siteId }, loading, search } = this.props;
    const { menuMobaOpen, searching, dragSet } = this.state;
    const css = require('./Style.scss');
    const styles = require('./Style.js');
    const drags = {onStart: this.onStart.bind(this, null), onStop: this.onStop.bind(this, null)};
    const menuItems = [
      {title: 'Home', link: ''},
      {title: 'Archive', link: 'archive'},
      {title: 'About', link: 'about'},
      {title: 'Contact', link: 'contact'}
    ];
    const twitterLogo = require('./twitter.svg');
    return (
      <div style={{minHeight: '100%', backgroundColor: this.setting('pageBackgroundColor', 'transparent')}}>
      <div style={{...styles.flexWrapper, ...styles.topBar}}>
        <div style={{...styles.flexLayoutWrapper, ...styles.flexSpace}} className={css.changeWidthMobile}>
          <div>
            <a href="#" style={styles.socialLink}><img src={twitterLogo} width={25} height={25} /></a>
            {(user && user.globalPermissions.admin) && <a href="#" onTouchTap={this.changeLink.bind(this, 'settings')} style={styles.socialLink}><i className="material-icons">settings_applications</i></a>}
          </div>

          {this.setting('pageSearchEnabled', 'false') === 'true' &&
            <div style={{position: 'relative'}}>
              <input type="text" placeholder="Search here..." style={styles.search} onChange={this.search.bind(this, null)} className={css.searchBar} />
              {searching && <div>
                {loading && <div>loading</div>}
                { !loading && <div style={{background: '#fff', border: '1px solid #ccc', height: 200, width: '100%', overflowY: 'auto'}}> {(search && search[siteId] && search[siteId].length ? <div style={{fontSize: 10, padding: 10, fontWeight: '500'}}>
                {search[siteId].map((result, index) =>
                <Link to={`/news-site/${siteId}/${result._id}/`} key={index} style={{borderBottom: '1px solid #ccc', cursor: 'pointer', display: 'block', margin: 5, padding: 5, textDecoration: 'none'}}>{result._source.meta.title}
                </Link>)}
                </div> : <div>no results</div>)} </div>}
              </div>}
            </div>}
        </div>
      </div>
      <div style={{...styles.flexWrapper}}>

        <div style={styles.flexLayoutWrapper} className={css.changeWidthMobile}>
            <div style={{...styles.logo, minWidth: 183, minHeight: 30, position: 'relative'}}>
              {(user && user.globalPermissions.admin) ?
                <Draggable axis="x" {...drags}>
                <div style={{position: 'absolute', left: dragSet || this.setting('logoPosX', 0)}}>
                <UploadBlob
                  accept=".jpg,.png,.jpeg,.gif"
                  dimensionsW={'183px'}
                  dimensionsH={'30px'}
                  events={{onChange: this.onLogoChange.bind(this, null), value: { logo: settings['newsSite' + siteId + 'logoUrl'] }}}
                  fileKey="logo" />
                  </div>
                  </Draggable>
               : <div style={{position: 'absolute', left: this.setting('logoPosX', 0)}}>
                  <img src={`${settings['newsSite' + siteId + 'logoUrl']}`} alt="logo"/>
                </div>}
            </div>
          <div style={styles.menuBar}>
            <ul style={{...styles.menu}}>
              <li
                className={css.menuOpen}
                onTouchTap={() => this.setState({menuMobaOpen: (menuMobaOpen ? false : true)})}
                style={{backgroundColor: this.setting('menuBarColor', '#555')}}>
                <i style={{color: this.setting('menuBarTextColor', 'rgba(255, 255, 255, 0.6)')}} className="material-icons" >menu</i>
              </li>
              {menuItems && menuItems.map((item) => <li style={{...styles.menuItem, backgroundColor: this.setting('menuBarColor', '#555') }} className={`${css.hoverLinkMenu} ${(menuMobaOpen) && css.open}`} key={item.title}>
                <Link to={`/news-site/${siteId}/${item.link}`} style={{...styles.menuLink, color: this.setting('menuBarTextColor', 'rgba(255, 255, 255, 0.6)')}}>{item.title}</Link>
              </li>)}
              {user && user.globalPermissions.admin && <li style={{...styles.menuItem, ...styles.adminMenuItem}} className={css.hoverLinkMenu}>
                <Link to={`/news-site/${this.generateUUID()}/`} style={{...styles.menuLink}}>Generate News Site</Link>
              </li>}

            </ul>
          </div>
          <div style={{...styles.flexSpace, ...styles.info}}>
            <div style={styles.breadcrumbs}>
              <i className="material-icons" style={{verticalAlign: 'top'}}>remove</i>{'   '}Home
            </div>
            <div style={styles.locality}>
              <i className="material-icons" style={{verticalAlign: 'top'}}>access_time</i>{'   '}{moment().format('MMM, Do, YYYY')}
            </div>
          </div>
          <div className={css.bodyContent}>{this.props.children}</div>
        </div>
      </div>
      </div>
    );
  }
}
