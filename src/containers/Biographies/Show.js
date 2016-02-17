import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {isSingleLoaded, loadSingle as loadBiography} from 'redux/modules/biographies';
import {changeMenuMode} from 'redux/modules/menu';

import Helmet from 'react-helmet';
// import RaisedButton from 'material-ui/lib/raised-button';
// import Add from 'material-ui/lib/svg-icons/content/add';


// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';
// import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
// import IconButton from 'material-ui/lib/icon-button';
// import Paper from 'material-ui/lib/paper';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { IframeLoader } from 'components';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true)));
  if (!isSingleLoaded(state) && typeof state.router.params.id !== 'undefined') {
    promises.push(dispatch(loadBiography(state.router.params.id)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    biography: state.biographies.single,
    settings: state.permissions.data
  }),
  {pushState}
)
export default class Show extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  componentWillMount() {}


  render() {
    const { settings, biography, user: {globalPermissions: { admin } } } = this.props;
    const css = require('./Bio.scss');
    // require the logo image both from client and server
    const styles = {
      root: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        height: 400,
        overflowY: 'auto',
        marginBottom: 24,
      },
      gridSingle: {
        maxWidth: '300px',
        minWidth: '250px',
        minHeight: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
      gridDouble: {
        minHeight: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
      horizontalGridElement: {
        flex: 1
      },
      smallImage: {
        maxWidth: '33%',
        marginTop: 10,
        display: 'block'
      },
      largeImage: {
        marginTop: 10,
        display: 'block'
      },
      imageStyle: {
        width: '100%'
      },
      iframe: {
        width: '100%',
        height: 200
      },
      flexTags: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 5,
        borderBottom: '1px solid #dedede'
      },
      userDescription: {
        padding: 10
      }
    };
    return (
      <div style={{height: '100%', flex: 1, position: 'relative'}}>
      <Helmet title="Biographies"/>
      {admin && <div style={{height: '100%'}}>
        <div style={styles.root} className={css.flexMobile}>
          <div style={styles.gridSingle}>
            <div style={styles.horizontalGridElement}>
              <Tabs>
                <Tab label="Images" value="images" >
                  <div>
                    {biography && <div style={styles.root} className={css.flexMobile}>
                      <div style={styles.smallImage}><img src={(biography.biometrics && biography.biometrics.left_portrait) || 'https://yt3.ggpht.com/-sMYM2bHyA9o/AAAAAAAAAAI/AAAAAAAAAAA/E42HtKlAI-Y/s88-c-k-no/photo.jpg'} style={styles.imageStyle}/></div>
                      <div style={styles.largeImage}><img src={(biography.biometrics && biography.biometrics.frontal_portait) || 'https://yt3.ggpht.com/-sMYM2bHyA9o/AAAAAAAAAAI/AAAAAAAAAAA/E42HtKlAI-Y/s88-c-k-no/photo.jpg'} style={styles.imageStyle}/></div>
                      <div style={styles.smallImage}><img src={(biography.biometrics && biography.biometrics.right_portrait) || 'https://yt3.ggpht.com/-sMYM2bHyA9o/AAAAAAAAAAI/AAAAAAAAAAA/E42HtKlAI-Y/s88-c-k-no/photo.jpg'} style={styles.imageStyle}/></div>
                    </div>}
                  </div>
                </Tab>
                <Tab label="GEO Location" value="geo_location">
                  <IframeLoader src={settings.mapLocation} style={styles.iframe} />
                </Tab>
              </Tabs>
            </div>
            <div style={styles.horizontalGridElement}>
            documents
            </div>
          </div>
          <div style={styles.gridDouble}>
            <Tabs>
              <Tab label="About" value="center_tags" >
              <div style={styles.flexTags}>
                <div><strong>Name</strong></div>
                <div>{biography && biography.name}</div>
              </div>
                {biography && biography.fields && Object.keys(biography.fields).map((fieldObj) => <div style={styles.flexTags}>
                <div><strong>{fieldObj}</strong></div>
                <div>{biography.fields[fieldObj]}</div>
                </div>)}
              </Tab>
              <Tab label="Overview" value="center_overview" >
                <p style={styles.userDescription}>{biography && biography.description}</p>
              </Tab>
            </Tabs>
          </div>
          <div style={styles.gridSingle}>
            <Tabs>
              <Tab label="EYES" value="right_eyes" >
              ezes
              </Tab>
              <Tab label="FINGERS" value="right_fingers" >
              Fingers
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>}

      </div>
    );
  }
}
