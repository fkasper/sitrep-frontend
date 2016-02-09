import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as permissionsActions from 'redux/modules/permissions';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

@connect(
  state => ({
    saveError: state.permissions.saveError
  }),
  dispatch => bindActionCreators(permissionsActions, dispatch)
)
@reduxForm({
  form: 'map',
  fields: ['mapLocation'],
  validate: widgetValidation
})
export default class MapChangeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    updateMapLocation: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    saveError: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { onChange, open, submitting, pristine, updateMapLocation, values, handleSubmit, invalid, fields: {mapLocation}, saveError } = this.props;
    // const { onChange, open } = this.props;
    const styles = require('containers/Login/Login.scss');
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={onChange} />,
      <FlatButton
        label="Save"
        primary
        onTouchTap={handleSubmit(() => updateMapLocation(values)
                               .then(result => {
                                 if (result && typeof result.error === 'object') {
                                   return Promise.reject(result.error);
                                 }
                                 onChange();
                               })
                             )}
        disabled={pristine || invalid || submitting} />
    ];
    return (
      <Dialog
        title="Change Map Settings"
        actions={actions}
        modal
        open={open} >
        <div className={submitting ? styles.saving : ''} style={{padding: '40px 40px 0px 40px'}}>
        {saveError && <div className={styles.error}>{saveError.message} </div>}
        <input
          type="text"
          placeholder="Map URL"
          className={styles.input}
          required
          {...mapLocation} />
        </div>
      </Dialog>
    );
  }
}
