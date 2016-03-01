import React, { Component, PropTypes } from 'react';
import { IframeLoader, MapChangeForm } from 'components';
import Helmet from 'react-helmet';
import Map from 'material-ui/lib/svg-icons/maps/map';
import RaisedButton from 'material-ui/lib/raised-button';


import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data
  }), {pushState})
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  componentWillMount() {
    this.setState({open: false});
  }


  render() {
    // require the logo image both from client and server
    const { open } = this.state;
    const { settings, user } = this.props;
    return (
      <div style={{height: '100%'}}>
      <Helmet title="Home"/>
        <div style={{height: '100%', position: 'relative'}} className="home">
        {user && user.globalPermissions && user.globalPermissions.admin &&

          <div style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            zIndex: 921,
            color: '#fff',
            verticalAlign: 'middle'
          }}>

          <RaisedButton
              label="Change Map"
              labelPosition="after"
              secondary
              icon={<Map />}
              onTouchTap={() => {this.setState({open: true}); }}
              type="submit" />

          </div>
          }
          {settings.maLocation ?
            <IframeLoader src={settings.mapLocation} style={{width: '100%', height: '100%', border: 0, margin: 0}}/>
          : <div>The Map is not configured.</div>}
          {user && user.globalPermissions && user.globalPermissions.admin &&
            <MapChangeForm
              open={open}
              formKey={'map'}
              key={'map'}
              initialValues={settings}
              onChange={() => { this.setState({open: false}); }}/>
          }
        </div>
      </div>
    );
  }
}
