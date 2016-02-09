import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import * as exerciseActions from 'redux/modules/exercises';

import {initializeWithKey} from 'redux-form';

import { CreateExerciseForm } from 'components';
import { pushState } from 'redux-router';


/* Cases:
 * - Admin creates an exercise with just a name!
 * - Users cannot create exercises
 * - If the name already exists there should be an error
 * - If not he should be redirected to that exercise
 */
@connect(
  state => ({
    exercise: state.exercises.newExercise,
    error: state.exercises.error,
    data: state.exercises.data,
    user: state.auth.user,
    loading: state.exercises.loading
  }),
  {...exerciseActions, initializeWithKey, pushState })
export default class Create extends Component {
  static propTypes = {
    exercise: PropTypes.object,
    error: PropTypes.string,
    user: PropTypes.object,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    data: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.data.applied) {
      this.props.pushState(null, '/cms/exercises');
    }
  }

  render() {
    // const handleEdit = (widget) => {
    //   const {editStart} = this.props; // eslint-disable-line no-shadow
    //   return () => editStart(String(widget.id));
    // };
    // const {users, error, editing, loading, load} = this.props;
    const { error, exercise, user } = this.props;
    // let refreshClassName = 'fa fa-refresh';
    // if (loading) {
    //   refreshClassName += ' fa-spin';
    // }
    const styles = require('containers/Login/Login.scss');

    return ( user && <div style={{flex: 1}}>
        <Helmet title="Create an exercise" />
              <div style={{width: 220, margin: '20px auto'}}>
                <img src="https://storage.googleapis.com/sitrep-static-assets/assets/components/sitrep-logo-dark.png" style={{width: '100%'}} />
              </div>
              <div style={{textAlign: 'center'}}>
                <h2 style={{fontSize: 18, fontWeight: 400, marginBottom: 20}}>
                Create an Exercise
                </h2>
              </div>
              <div className={styles.card + ' ' + styles.card2} style={{position: 'relative'}}>
                <div className={styles.boxTop} ></div>
                <div className={styles.select}>
                {error &&
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  {' '}
                  {error}
                </div>}
                {user.globalPermissions && user.globalPermissions.admin &&
                  <CreateExerciseForm formKey={'exercise'} key={'exercise'} initialValues={exercise}/>
                }
                </div>
              </div>

            </div>);
  }
}
