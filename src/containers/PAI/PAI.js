import React, { Component, PropTypes } from 'react';
import { MapChangeForm } from 'components';
import Helmet from 'react-helmet';
import Pencil from 'material-ui/lib/svg-icons/editor/mode-edit';
// import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import IconButton from 'material-ui/lib/icon-button';

@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data
  }), {pushState})
export default class Pai extends Component {
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
    const styles = require('./PAI.scss');
    const inputStyles = require('containers/Login/Login.scss');
    return (
      <div style={{height: '100%', flex: 1}}>
      <Helmet title="Publicly Available Information"/>
        <div style={{height: '100%', position: 'relative'}} className={styles.formatting}>
          <div style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            zIndex: 921,
            color: '#fff',
            verticalAlign: 'middle'
          }}>


          </div>
          <Paper zDepth={2} className={styles.header}>
            <h1>Publicly Available Information</h1>
          </Paper>
          <div className={styles.cellPad}>
            <Paper zDepth={2} className={styles.cell}>
              <div>
                <h3>News <IconButton tooltip={"edit mode"}><Pencil /></IconButton></h3>
              </div>
              <div className={styles.flexCell}>
                <div className={styles.paperCell}>
                  <div className={styles.front}>
                    <img src="http://sitrep-vatcinc.com/api/v2/img/ASTV_logo" style={{
                      width: '100%'
                    }} />
                  </div>
                  <div className={styles.back}>
                    <p className={styles.description}>Atropian State Television</p>
                    <a className={inputStyles.signInButton} style={{width: '80%', margin: '0 auto'}}>Visit</a>
                  </div>
                </div>
                <div className={styles.paperCell}>
                  <img src="http://sitrep-vatcinc.com/assets/gallery/arns_tile.jpg" style={{
                    width: '100%'
                  }} />
                </div>
              </div>
            </Paper>
          </div>
          {user && user.globalPermissions && user.globalPermissions.admin &&
            <MapChangeForm
              open={open}
              formKey={'map'}
              key={'map'}
              initialValues={settings}
              onChange={() => { this.setState({open: false}); }}/>
          }
          {user && user.globalPermissions && (user.globalPermissions.admin || user.globalPermissions.oc) &&
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
