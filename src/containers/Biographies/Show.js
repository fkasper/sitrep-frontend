import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {loadSingle as loadBiography} from 'redux/modules/biographies';
import {changeMenuMode} from 'redux/modules/menu';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/lib/raised-button';
// import Add from 'material-ui/lib/svg-icons/content/add';


// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
// import IconButton from 'material-ui/lib/icon-button';
// import Paper from 'material-ui/lib/paper';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { IframeLoader, BioEditForm, Editor } from 'components';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true)));
  if (typeof state.router.params.id !== 'undefined') {
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

  componentWillMount() {
    this.setState({editing: false});
  }


  render() {
    const { settings, biography, user, user: {globalPermissions: { admin } } } = this.props;
    const { editing } = this.state;
    const css = require('./Bio.scss');
    const placeholder = require('./placeholder.png');
    const styles = require('./Biographies.js');

    return (
      <div style={{height: '100%', flex: 1, position: 'relative'}}>
      <Helmet title={`Biography: ${biography && biography.name}`}/>
      {user && biography && <div style={styles.rootBlock}>
        {(editing ? <BioEditForm formKey={'map'} onEditingDone={() => this.setState({editing: false}) } sKey={biography && biography.id} initialValues={biography} /> : <div style={{height: '100%'}}>
        {biography && <div style={styles.root} className={css.flexMobile + ' ' + css.flexRoot}>
          <div style={styles.gridSingle} className={css.flexGrid}>
            <div style={styles.horizontalGridElement}>
              <Tabs style={styles.tab}>
                <Tab label="Images" value="images" >
                  <div>
                    {biography && <div style={styles.root} className={css.flexMobile}>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.left_portrait || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.center_portrait || placeholder) + ')'}, styles.image, styles.largeImage)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.right_portrait || placeholder) + ')'}, styles.image)}></div>
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
          <div style={styles.gridDouble} className={css.flexGrid}>
            <Tabs>
              <Tab label="About" value="center_tags" style={styles.userDescription}>
              <div style={styles.flexTags}>
                <div><strong>Name</strong></div>
                <div>{biography && biography.name}</div>
              </div>
                {biography && biography.fields && biography.fields.map((fieldObj) => <div key={fieldObj.title} style={styles.flexTags}>
                <div><strong>{fieldObj.title}</strong></div>
                <div>{fieldObj.value}</div>
                </div>)}
              </Tab>
              <Tab label="Overview" value="center_overview" >
                <Editor stateOnly value={biography.description} onChange={() => {}}/>

                <p style={styles.userDescription}>{biography && biography.description}</p>
              </Tab>
            </Tabs>
            {admin && <div style={{
              position: 'absolute',
              bottom: 30,
              left: 20,
              zIndex: 921,
              color: '#fff',
              verticalAlign: 'middle'
            }}>

            <RaisedButton
                label="Edit"
                labelPosition="after"
                secondary
                icon={<Edit />}
                onTouchTap={() => {this.setState({editing: !editing}); }}
                type="submit" />

            </div>}
          </div>
          <div style={styles.gridSingle} className={css.flexGrid}>
            <Tabs>
              <Tab label="fingers" value="right_eyes" >
                <div style={styles.gridSingle}>

                  <div style={styles.horizontalGridElement}>
                    <div style={styles.root} className={css.flexMobile}>
                      <p style={styles.fixedTitle}>Left Hand</p>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.one_left || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.two_left || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.three_left || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.four_left || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.five_left || placeholder) + ')'}, styles.image)}></div>

                    </div>
                  </div>
                  <div style={styles.horizontalGridElement}>
                    <div style={styles.root} className={css.flexMobile}>
                      <p style={styles.fixedTitle}>Right Hand</p>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.one_right || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.two_right || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.three_right || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.four_right || placeholder) + ')'}, styles.image)}></div>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.biometrics.five_right || placeholder) + ')'}, styles.image)}></div>

                    </div>
                  </div>
                </div>
              </Tab>
              <Tab label="eyes" value="right_fingers" >
                <div style={styles.gridSingle}>

                  <div style={styles.horizontalGridElement}>
                    <div style={styles.root} className={css.flexMobile}>
                      <p style={styles.fixedTitle}>Left Eye</p>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.left_eye_image || placeholder) + ')'}, styles.image, styles.largeImage)}></div>
                    </div>
                  </div>
                  <div style={styles.horizontalGridElement}>
                    <div style={styles.root} className={css.flexMobile}>
                      <p style={styles.fixedTitle}>Right Eye</p>
                      <div style={Object.assign({backgroundImage: 'url(' + ( biography.right_eye_image || placeholder) + ')'}, styles.image, styles.largeImage)}></div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>}
      </div> )}</div>}

      </div>
    );
  }
}
