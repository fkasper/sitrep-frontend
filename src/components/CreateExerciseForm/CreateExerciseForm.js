import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as exerciseActions from 'redux/modules/exercises';
import Save from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    errors: state.exercises.error
  }),
  dispatch => bindActionCreators(exerciseActions, dispatch)
)
@reduxForm({
  form: 'exercise',
  fields: ['name', 'id'],
  validate: widgetValidation
})
export default class CreateExerciseForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object
  };

  render() {
    const { submitting, pristine, save, values, handleSubmit, invalid, fields: {name}, errors } = this.props;
    const styles = require('containers/Login/Login.scss');
    return (
      <form onSubmit={handleSubmit(() => save(values)
                              .then(result => {
                                if (result && typeof result.error === 'object') {
                                  return Promise.reject(result.error);
                                }
                              })
                            )}
                            className={submitting ? styles.saving : ''} style={{padding: '40px 40px 0px 40px'}}>
      {errors && <div className="text-danger">{errors.message}</div>}
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          {...name} />
      <RaisedButton
          label="Create exercise"
          labelPosition="after"
          secondary
          icon={<Save />}
          type="submit"
          style={styles.button}

          disabled={pristine || invalid || submitting} />


      </form>
    );
  }
}
