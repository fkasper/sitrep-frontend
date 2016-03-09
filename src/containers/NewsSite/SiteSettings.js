import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
// import { EditNewsStoriesForm } from 'components';
// import moment from 'moment';

function fetchDataDeferred(getState, dispatch) {
  return (dispatch(changeMenuMode(true, true)));
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data,
    params: state.router.params
  }),
  {updateSettings, pushState}
)
export default class SiteSettings extends Component {
  static propTypes = {
    user: PropTypes.object,
    stories: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object,
    updateSettings: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  settingsKey(item) {
    const { params: { siteId } } = this.props;
    return 'newsSite' + siteId + item;
    // this.props.updateSettings(key, location.value.logo);
  }

  render() {
    const { settings, user, user: {globalPermissions: { admin } } } = this.props;
    const csStyles = require('containers/Login/Login.scss');

    // const { editing, stories, params: { siteId } } = this.props;
    // const { editing } = this.state;
    // const css = require('./Style.scss');
    const styles = require('./Style.js');
    const settingsItems = [
      {label: 'Menu Bar Color', name: 'menuBarColor'},
      {label: 'Menu Bar Text Color', name: 'menuBarTextColor'},
      {label: 'Page Background Color', name: 'pageBackgroundColor'},
      {label: 'Page Title', name: 'pageTitle'},
      {label: 'Search enabled (y/n)', name: 'pageSearchEnabled'},
      {label: 'News Site Style (new/alternative)', name: 'newsStyle'}
    ];
    return (<div>
      <Helmet title="Site Settings" />
      {user && admin && <div style={{ ...styles.margTop}}>
        <div style={{...styles.sectionCategory, width: '66.666%'}}>
          <div style={styles.sectionName}>
            <div style={{color: '#333'}}>Settings</div>
          </div>
          {settingsItems && settingsItems.map((item) => <div>
            <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>{item.label}</div>
            <div><input type="text"
                    className={csStyles.ipb}
                    onBlur={(ev) => this.props.updateSettings(this.settingsKey(item.name), ev.target.value)}
                    placeholder={item.label}
                    value={settings[this.settingsKey(item.name)]}
                  /></div>
          </div>)}

        </div>
      </div>}
    </div>);
  }
}
