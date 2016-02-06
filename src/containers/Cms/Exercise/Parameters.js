import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import * as exerciseActions from 'redux/modules/exercises';
import {isLoaded, loadSingle as loadExercise} from 'redux/modules/exercises';

import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import Paper from 'material-ui/lib/paper';

import { SettingsForm } from 'components';

function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  const state = getState();
  if (!isLoaded(state)) {
    promises.push(dispatch(loadExercise(state.router.params.id)));
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    exercise: state.exercises.current,
    error: state.exercises.error,
    loading: state.exercises.loading
  }),
  {...exerciseActions, initializeWithKey })
export default class Parameters extends Component {
  static propTypes = {
    exercise: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }


  render() {
    // const handleEdit = (widget) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(widget.id));
    // };
    // const {users, error, editing, loading, load} = this.props;
    const { error, exercise } = this.props;
    // let refreshClassName = 'fa fa-refresh';
    // if (loading) {
    //   refreshClassName += ' fa-spin';
    // }
    const styles = require('containers/Login/Login.scss');

    return ( exercise &&
      <div className={styles.widgets + ' container'}>
        <Helmet title="Change Exercise Settings" />
        <div style={{marginLeft: 340, height: '100%'}} className={styles.formatting}>

          {error &&
          <div className="alert alert-danger" role="alert">
            {' '}
            {error.message}
          </div>}

          <Paper zDepth={1} rounded={false}>
            <div className={styles.padding}>
              <h3>Change Exercise {exercise.name}</h3>
              <p>You can change various exercise parameters, using the input fields below.
              Hit save when you are done to save your changes.</p>
            </div>
          </Paper>
          <Paper zDepth={1} rounded={false}>
            <div className={styles.padding}>
              <SettingsForm formKey={'exercise'} key={'exercise'} initialValues={exercise}/>
            </div>
          </Paper>

        </div>
      </div>
    );
  }
}
