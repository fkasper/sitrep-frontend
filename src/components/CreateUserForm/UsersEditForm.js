import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './editValidation';
import * as usersActions from 'redux/modules/users';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';
// import Add from 'material-ui/lib/svg-icons/content/add';
import PermissionCheckbox from './PermissionCheckbox';
import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.users.saveError,
    saving: state.users.saving,
    settings: state.permissions.data
  }),
  dispatch => bindActionCreators(usersActions, dispatch),
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
export default class UsersEditForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saving: PropTypes.bool,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object
  };


  render() {
    // const { , values, key, handleSubmit, invalid, fields: {fields}, formKey, saveError: { [formKey]: saveError } } = this.props;
    const { formKey, values, saving, invalid, handleSubmit, pristine, save, fields: {globalPermissions, realName}, submitting } = this.props;
    const css = require('containers/Biographies/Bio.scss');
    const styles = require('containers/Biographies/Biographies.js');
    const csStyles = require('containers/Login/Login.scss');
    const permissions = [
      'admin',
      'trainer',
      'member',
      'staff'
    ];
    return (
      <div className={submitting ? styles.saving : ''} style={{height: '100%'}}>
        <div style={{width: '100%'}} className={css.flexMobile}>
        <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Name</div>
          <div><input type="text"
                    className={csStyles.ipb}
                    placeholder="Name"
                    {...realName}
                  /></div>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Message</div>
          <div>{permissions && permissions.length && permissions.map((perm, index) => <div key={index}>
            <PermissionCheckbox {...globalPermissions} permission={perm} />
          </div>)}</div>
          <RaisedButton
              label={saving ? 'Saving' : 'Save'}
              labelPosition="after"
              secondary
              icon={<Save />}
              onTouchTap={handleSubmit(() => save(formKey, values)
                            .then(result => {
                              if (result && typeof result.error === 'object') {
                                return Promise.reject(result.error);
                              }
                            })
                          )}
              disabled={pristine || invalid || submitting}
              type="submit" />

        </div>
      </div>
    );
  }
}
