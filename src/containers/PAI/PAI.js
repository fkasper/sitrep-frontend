import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
// import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import {load as loadPAI, isLoaded as isPAILoaded} from 'redux/modules/pai';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import {changeMenuMode} from 'redux/modules/menu';
import connectData from 'helpers/connectData';
import CircularProgress from 'material-ui/lib/circular-progress';

function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));

  if (!isPAILoaded(getState())) {
    promises.push(dispatch(loadPAI()));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data,
    pai: state.pai.data,
    loading: state.pai.loading
  }), {pushState})
export default class Pai extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object,
    pai: PropTypes.array,
    loading: PropTypes.bool
  }

  componentWillMount() {
    this.setState({open: false});
  }


  render() {
    // require the logo image both from client and server
    const { pai, loading } = this.props;
    const styles = require('./PAI.scss');
    const inputStyles = require('containers/Login/Login.scss');
    const validPAI = {};
    if (pai && pai.length) {
      pai.map((info) => {
        if (!validPAI[info.categoryName]) {
          validPAI[info.categoryName] = [];
        }
        validPAI[info.categoryName].push(info);
      });
    }
    const validPAIKeys = Object.keys(validPAI);
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
          {loading && <CircularProgress /> }
            {validPAI && validPAIKeys.length && validPAIKeys.map((key) => <Paper zDepth={2} className={styles.cell}>
              <div>
                <h3>{key}</h3>
              </div>
              <div className={styles.flexCell}>
                {validPAI[key].map((cell) =><div className={styles.paperCell}>
                  <div className={styles.front}>
                    <img src={cell.image} style={{
                      width: '100%'
                    }} />
                  </div>
                  <div className={styles.back}>
                    <p className={styles.description}>{cell.backTitle}</p>
                    <a className={inputStyles.signInButton} href={cell.target} target="_blank" style={{width: '80%', margin: '0 auto'}}>Visit</a>
                  </div>
                </div>)}
              </div>
            </Paper>)}
          </div>
        </div>
      </div>
    );
  }
}
