import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, addArrayValue} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as groupsActions from 'redux/modules/groups';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';
import Add from 'material-ui/lib/svg-icons/content/add';

import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.exercises.saveError,
    addValue: addArrayValue
  }),
  dispatch => bindActionCreators(groupsActions, dispatch),
)
@reduxForm({
  form: 'settings',
  fields: [
    'fields[]'
  ],
  validate: widgetValidation
})
export default class SettingsForm extends Component {
  static propTypes = {
    addValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    saveItems: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    key: PropTypes.number.isRequired,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { submitting, pristine, saveItems, values, key, handleSubmit, invalid, fields: {fields}, formKey, saveError: { [formKey]: saveError } } = this.props;
    // const { editStop, fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
    //   pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Login/Login.scss');
    // const style = {
    //   fontWeight: 500,
    //   fontSize: 11,
    //   letterSpacing: '.02em',
    //   lineHeight: '12px',
    //   color: 'rgb(0,0,0)',
    //   textTransform: 'inherit',
    //   bottom: -7,
    //   margin: '-10px 0 12px'
    // };
    return (
      <div className={submitting ? styles.saving : ''}>
        {saveError && <div className="text-danger">{saveError}</div>}
        <RaisedButton
            label="Add Field"
            labelPosition="after"
            secondary
            icon={<Add />}
            onTouchTap={() => { fields.addField(); }}
            style={styles.button} /><br /><br />
        {!fields.length && <div>No Children</div>}
        {fields.map((child, index) => <div key={index} className={styles.textField}>
        <input type="text"
          className={styles.ipb}
          placeholder="Name"
          {...child}
        />
        <div>
          <button type="button" disabled={index === 0} onClick={() => {
            fields.swapFields(index, index - 1);
          }}><i className="material-icons">expand_less</i>
          </button>
          <button type="button" disabled={index === fields.length - 1} onClick={() => {
            fields.swapFields(index, index + 1);
          }}><i className="material-icons">expand_more</i>
          </button>
          <button type="button" onClick={() => {
            fields.removeField(index);  // remove from index
          }}><i/> <i className="material-icons">remove</i>
          </button>
        </div>

        </div>
        )}

        <div className={styles.flexBox}>
          <div className={styles.flex} style={{marginTop: 20}}>
          <RaisedButton
              label="Save changes"
              labelPosition="after"
              primary
              icon={<Save />}
              style={styles.button}
              onTouchTap={handleSubmit(() => saveItems(key, formKey, values)
                            .then(result => {
                              if (result && typeof result.error === 'object') {
                                return Promise.reject(result.error);
                              }
                            })
                          )}
              disabled={pristine || invalid || submitting} />
          </div>
        </div>
      </div>
    );
  }
}
