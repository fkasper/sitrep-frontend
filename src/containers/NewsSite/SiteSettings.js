import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import ColorPicker from 'react-color';
// import { EditNewsStoriesForm } from 'components';
// import moment from 'moment';
import Checkbox from 'material-ui/lib/checkbox';

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
    const styles2 = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    const colorItems = [
      {label: 'Menu bar color', name: 'menuBarColor'},
      {label: 'Menu bar Text color', name: 'menuBarTextColor'},
      {label: 'Page background color', name: 'pageBackgroundColor'},
      {label: 'Text color', name: 'textColor'},
    ];
    const settingsItems = [
      {label: 'Page title', name: 'pageTitle'},
    ];
    const checkboxitems = [
      {label: 'Enable the searchbar', name: 'pageSearchEnabled'},
      {label: 'Bad-guy page layout', name: 'newsStyle'}
    ];
    return (<div>
      <Helmet title="Site Settings" />
      {user && admin && <div style={{ ...styles.margTop}}>
        <div style={{...styles.sectionCategory, width: '100%'}}>
          <div style={styles.sectionName}>
            <div style={{color: '#333'}}>Settings</div>
          </div>
          {settingsItems && settingsItems.map((item) => <div>
            <span style={{fontSize: 10, fontWeight: '500'}}>{item.label}</span>
            <div><input type="text"
                    className={csStyles.ipb}
                    onBlur={(ev) => this.props.updateSettings(this.settingsKey(item.name), ev.target.value)}
                    placeholder={item.label}
                    value={settings[this.settingsKey(item.name)]}
                  /></div>
          </div>)}<hr />
          <div>
            {(checkboxitems.map(item => <div key={item.name}>
              <Checkbox
                label={item.label}
                onCheck={(ev) => this.props.updateSettings(this.settingsKey(item.name), (ev.target.checked === true) ? 'true' : 'false')}
                defaultChecked={settings[this.settingsKey(item.name)] === 'true'}
                style={styles2}
              />
            </div>))}
          </div>
          <hr />
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {(colorItems.map(item => <div key={item.name} style={{minWidth: '40%', maxWidth: '100%'}}>
              <span style={{fontSize: 10, fontWeight: '500'}}>{item.label}</span>
              <ColorPicker
                type="sketch"
                onChangeComplete={(ev) => this.props.updateSettings(this.settingsKey(item.name), `rgba(${ev.rgb.r},${ev.rgb.g},${ev.rgb.b},${ev.rgb.a})`)}
                color={settings[this.settingsKey(item.name)]}
              />
            </div>))}
          </div>

        </div>
      </div>}
    </div>);
  }
}
