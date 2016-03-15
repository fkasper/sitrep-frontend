import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as usersActions from 'redux/modules/auth';
import Save from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';
@connect(
  state => ({
    saveError: state.auth.saveError
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: [
    'globalPermissions',
    'realName',
    'twitterName',
    'fields',
    'email',
    'userSettings'
  ],
  validate: widgetValidation
})
export default class UserHandleEditorForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onEditingDone: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    update: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    saveError: PropTypes.object
  };


  render() {
    const { submitting, handleSubmit, update, values, fields: {twitterName}, saveError } = this.props;
    const styles = require('containers/Login/Login.scss');
    return (
      <div className={submitting ? styles.saving : ''} style={{marginBottom: 20, padding: '40px 40px 0px 40px'}}>
        {saveError && <div className={styles.error}>{saveError.message} </div>}
          <input
            type="text"
            placeholder="Handle"
            className={styles.input}
            required
            {...twitterName} />
          <RaisedButton
              label="Save Handle"
              labelPosition="after"
              secondary
              icon={<Save />}
              type="submit"
              onTouchTap={
                handleSubmit(() => {
                  update(values).then(result => {
                    if (result && typeof result.error === 'object') {
                      return Promise.reject(result.error);
                    }
                    this.props.onEditingDone();
                  });
                })
              }
              style={styles.button} />
      </div>
    );
  }
}
