import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as contactActions from 'redux/modules/contact';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';
// import Add from 'material-ui/lib/svg-icons/content/add';

import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.exercises.saveError,
    settings: state.permissions.data
  }),
  dispatch => bindActionCreators(contactActions, dispatch),
)
@reduxForm({
  form: 'settings',
  fields: [
    'subject',
    'message'
  ],
  validate: widgetValidation
})
export default class BioEditForm extends Component {
  static propTypes = {
    addValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    sKey: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object
  };


  render() {
    // const { , values, key, handleSubmit, invalid, fields: {fields}, formKey, saveError: { [formKey]: saveError } } = this.props;
    const { sKey, values, invalid, handleSubmit, pristine, save, fields: {subject, message}, submitting } = this.props;
    const css = require('containers/Biographies/Bio.scss');
    const styles = require('containers/Biographies/Biographies.js');
    const csStyles = require('containers/Login/Login.scss');
    return (
      <div className={submitting ? styles.saving : ''} style={{height: '100%'}}>
        <div style={{width: '100%'}} className={css.flexMobile}>
        <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Subject</div>
          <div><input type="text"
                    className={csStyles.ipb}
                    placeholder="Subject"
                    {...subject}
                  /></div>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Message</div>
          <div><textarea
                    style={{width: '100%', height: 200}}
                    className={csStyles.ipb}
                    placeholder="Message"
                    {...message}
                  /></div>
          <RaisedButton
              label="Send"
              labelPosition="after"
              secondary
              icon={<Save />}
              onTouchTap={handleSubmit(() => save(sKey, values)
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
