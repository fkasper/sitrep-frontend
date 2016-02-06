import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as exerciseActions from 'redux/modules/exercises';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.exercises.saveError
  }),
  dispatch => bindActionCreators(exerciseActions, dispatch)
)
@reduxForm({
  form: 'settings',
  fields: ['name', 'contactEmail', 'sprocketCount', 'owner'],
  validate: widgetValidation
})
export default class SettingsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { submitting, pristine, save, values, handleSubmit, invalid, fields: {contactEmail, name}, formKey, saveError: { [formKey]: saveError } } = this.props;
    // const { editStop, fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
    //   pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Login/Login.scss');
    const style = {
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '.02em',
      lineHeight: '12px',
      color: 'rgb(0,0,0)',
      textTransform: 'inherit',
      bottom: -7,
      margin: '-10px 0 12px'
    };
    return (
      <div className={submitting ? styles.saving : ''}>
      {saveError && <div className="text-danger">{saveError}</div>}

        <div className={styles.flexBox}>
          <div className={styles.flex}>
          <div style={style}>Exercise Name</div>
          <input type="text"
            className={styles.ipb}
            placeholder="Exercise Name"
            {...name}
          /></div>
          <div className={styles.flex}>
          <div style={style}>Contact Email</div>
          <input type="text"
            className={styles.ipb}
            placeholder="Contact Email"
            {...contactEmail}
          /></div>
        </div>

        <div className={styles.flexBox}>
          <div className={styles.flex} style={{marginTop: 20}}>
          <RaisedButton
              label="Save changes"
              labelPosition="after"
              secondary
              icon={<Save />}
              style={styles.button}
              onTouchTap={handleSubmit(() => save(values)
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
    //
    //   <tr className={submitting ? styles.saving : ''}>
    //     <td className={styles.idCol}>{id.value}</td>
    //     <td className={styles.colorCol}>
    //       <select name="color" className="form-control" {...color}>
    //         {colors.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
    //       </select>
    //       {color.error && color.touched && <div className="text-danger">{color.error}</div>}
    //     </td>
    //     <td className={styles.sprocketsCol}>
    //       <input type="text" className="form-control" {...sprocketCount}/>
    //       {sprocketCount.error && sprocketCount.touched && <div className="text-danger">{sprocketCount.error}</div>}
    //     </td>
    //     <td className={styles.ownerCol}>
    //       <input type="text" className="form-control" {...owner}/>
    //       {owner.error && owner.touched && <div className="text-danger">{owner.error}</div>}
    //     </td>
    //     <td className={styles.buttonCol}>
    //       <button className="btn btn-default"
    //               onClick={() => editStop(formKey)}
    //               disabled={submitting}>
    //         <i className="fa fa-ban"/> Cancel
    //       </button>
    //       <button className="btn btn-success"
    //               onClick={handleSubmit(() => save(values)
    //                 .then(result => {
    //                   if (result && typeof result.error === 'object') {
    //                     return Promise.reject(result.error);
    //                   }
    //                 })
    //               )}
    //               disabled={pristine || invalid || submitting}>
    //         <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
    //       </button>
    //       {saveError && <div className="text-danger">{saveError}</div>}
    //     </td>
    //   </tr>
    // );
  }
}
