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
export default class TwitterNavBar extends Component {
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
    // const css = require('./TwitterNavBar.scss');
    const css2 = require('./twitter.scss');
    // const { articles, user: { globalPermissions: { admin } } } = this.props;
    const styles = {
      fixedNav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        backfaceVisibility: 'hidden'
      },
      globalNav: {
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        height: 46,
        position: 'relative',
        width: '100%',
      },
      globalNavInner: {
        background: '#fff',
        height: 46,
        display: 'flex'
      },
      flexNav: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      twitterNav: {
        marginRight: 12,
        textAlign: 'left',
        listStyle: 'none'
      },
      navItem: {

      },
      navLink: {
        fontSize: 13,
        fontWeight: 500,
        height: 30,
        lineHeight: '1',
        padding: '0 14px 0 4px',
        textDecoration: 'none',
        color: '#666',
        borderBottom: '5px solid #2FC2EF',
        transition: 'all .15s ease-in-out',
        display: 'block'
      },
      navText: {
        marginLeft: 6,
        marginTop: 17,
        display: 'block',
        lineHeight: '1',
      },
      tweetButton: {
        color: '#fff',
        cursor: 'pointer',
        padding: '0 13px 0 14px',
        height: 32,
        marginTop: 7,
        marginRight: 0,
        opacity: 1,
        MsFilter: 'alpha(opacity=100)',
        transition: 'all .15s ease-in-out',
        display: 'block',
        fontSize: 13,
        fontWeight: 500,
        backgroundColor: '#2FC2EF',
        background: 'rgba(47,194,239,.8)',
        border: '1px solid transparent',
      },
      tweetButtonText: {
        padding: 0,
        border: 0,
        float: 'left',
        position: 'static',
        overflow: 'visible',
        width: 'auto',
        height: 'auto',
        clip: 'auto'
      }
    };
    return (
      <div className={css2.topbar}>
        <div className={css2['global-nav']}>
          <div className={css2['global-nav-inner']}>
            <div className={css2.container} style={styles.flexNav}>
              <div>
                <ul style={styles.twitterNav}>
                  <li style={styles.navItem}>
                    <a style={styles.navLink} href="#"><span style={styles.navText}>Home</span></a>
                  </li>
                </ul>
              </div>
              <div><svg version="1.1" id="Capa_1" x="0px" y="0px"
              	 width="30px" height="30px" viewBox="0 0 430.117 430.117" style={{marginTop: 7, stroke: '#1da1f2', fill: '#1da1f2'}}
              	 xmlSpace="preserve">
              <g>
              	<path id="Twitter__x28_alt_x29_" d="M381.384,198.639c24.157-1.993,40.543-12.975,46.849-27.876
              		c-8.714,5.353-35.764,11.189-50.703,5.631c-0.732-3.51-1.55-6.844-2.353-9.854c-11.383-41.798-50.357-75.472-91.194-71.404
              		c3.304-1.334,6.655-2.576,9.996-3.691c4.495-1.61,30.868-5.901,26.715-15.21c-3.5-8.188-35.722,6.188-41.789,8.067
              		c8.009-3.012,21.254-8.193,22.673-17.396c-12.27,1.683-24.315,7.484-33.622,15.919c3.36-3.617,5.909-8.025,6.45-12.769
              		C241.68,90.963,222.563,133.113,207.092,174c-12.148-11.773-22.915-21.044-32.574-26.192
              		c-27.097-14.531-59.496-29.692-110.355-48.572c-1.561,16.827,8.322,39.201,36.8,54.08c-6.17-0.826-17.453,1.017-26.477,3.178
              		c3.675,19.277,15.677,35.159,48.169,42.839c-14.849,0.98-22.523,4.359-29.478,11.642c6.763,13.407,23.266,29.186,52.953,25.947
              		c-33.006,14.226-13.458,40.571,13.399,36.642C113.713,320.887,41.479,317.409,0,277.828
              		c108.299,147.572,343.716,87.274,378.799-54.866c26.285,0.224,41.737-9.105,51.318-19.39
              		C414.973,206.142,393.023,203.486,381.384,198.639z"/>
              </g>
              </svg>
              </div>
              <div>
                <button style={styles.tweetButton}>
                  <span style={styles.tweetButtonText}>Tweet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
