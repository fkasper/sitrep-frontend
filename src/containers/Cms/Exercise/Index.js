import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import connectData from 'helpers/connectData';
import Helmet from 'react-helmet';
import {isLoaded, load as loadExercises} from 'redux/modules/exercises';
import { pushState } from 'redux-router';
// import Cookie from 'js-cookie';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadExercises());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
    state => ({
      user: state.auth.user,
      exercises: (state.exercises.data ? state.exercises.data : {})
    }),
    {authActions, pushState})
export default
class Index extends Component {
  static propTypes = {
    user: PropTypes.object,
    exercises: PropTypes.object,
    logout: PropTypes.func,
    pushState: PropTypes.func.isRequired
  }

  storeExId = (exId) => {
    if (exId) {
      this.props.pushState(null, `/cms/exercises/maintain/${exId}`);
    }
  }

  render() {
    const {user, exercises} = this.props;
    const styles = require('containers/Login/Login.scss');
    const exKeys = Object.keys(exercises);
    // if (exKeys.length === 1) {
    //   this.storeExId(exKeys[0]);
    //   return <div></div>;
    // }

    return (user && <div>
      <Helmet title="Select an exercise" />
            <div style={{width: 220, margin: '20px auto'}}>
              <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '100%'}} />
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
              Select an Exercise
              </h2>
            </div>
            <div className={styles.card + ' ' + styles.card2} style={{position: 'relative'}}>
              <div className={styles.boxTop} ></div>
              <div className={styles.select}>
              { (exercises && exKeys.length) ? exKeys.map((name) => {
                return (
                  <a className={styles.option} onClick={this.storeExId.bind(this, name)}>
                    <div className={styles.info}>
                      <div className={styles.name}>{exercises[name]}</div>
                    </div>
                  </a>
                );
              }) : <div className={styles.option}>
                    <div className={styles.info}>
                      <div className={styles.name}>There are no active exercises</div>
                    </div>
                  </div>
              }
              {user.globalPermissions && user.globalPermissions.admin &&
                <form className="login-form form-inline" style={{padding: '40px 40px 0px 40px'}}>
                  <a href="/cms/exercises/create" style={{fontSize: 13, cursor: 'pointer', color: '#427fed'}}>Start an exercise</a>
                </form>
              }


              </div>
            </div>

          </div>);
  }
}
