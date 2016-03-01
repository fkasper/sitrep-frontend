import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as usersActions from 'redux/modules/auth';
import Save from 'material-ui/lib/svg-icons/action/pan-tool';
import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.auth.saveError
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)
@reduxForm({
  form: 'user',
  fields: ['email', 'name', 'encryptedPassword', 'fields'],
  validate: widgetValidation
})
export default class CreateUserForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    createUser: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    saveError: PropTypes.object
  };


  render() {
    const { submitting, pristine, createUser, values, handleSubmit, invalid, fields: {email, name, fields, encryptedPassword}, saveError } = this.props;
    const styles = require('containers/Login/Login.scss');

    return (
      <form onSubmit={handleSubmit(() => {
        createUser({
          fields: values.fields,
          encryptedPassword: values.encryptedPassword,
          jwtEncryptionKey: '',
          exercises: [],
          globalPermissions: {},
          userSettings: {},
          realName: values.name,
          email: values.email
        }).then(result => {
          if (result && typeof result.error === 'object') {
            return Promise.reject(result.error);
          }});
      })}
        className={submitting ? styles.saving : ''} style={{padding: '40px 40px 0px 40px'}}>
        {saveError && <div className={styles.error}>{saveError.message} </div>}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          required
          {...email} />
        <div>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          required
          {...name} />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
          {...encryptedPassword} />
        {fields && fields.initialValue && fields.initialValue.length && fields.initialValue.map((field) => <input
          type="text"
          key={field}
          placeholder={field}
          className={styles.input}
          required
          onChange={(evt) => {
            const val = evt.target.value;
            // update value at index
            // const index =
            fields.onChange({value: {
              ...fields.value,
              [field]: val
            }});
          }} />)}
      <RaisedButton
          label="Sign up"
          labelPosition="after"
          secondary
          icon={<Save />}
          type="submit"
          style={styles.button}

          disabled={pristine || invalid || submitting} />
      </div>
      <a href="/auth/login" style={{fontSize: 13, marginTop: 20, cursor: 'pointer', color: '#427fed'}}>Or Sign in</a>

      </form>
    );
  }
}
