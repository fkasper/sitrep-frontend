import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as paiActions from 'redux/modules/pai';
// import TextField from 'material-ui/lib/text-field';
// import Save from 'material-ui/lib/svg-icons/content/save';
// import Add from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import { UploadBlob } from 'components';
// import RaisedButton from 'material-ui/lib/raised-button';
import { generateUUID } from 'utils/uuidutil';
@connect(
  state => ({
    saveError: state.exercises.saveError,
    settings: state.permissions.data
  }),
  dispatch => bindActionCreators(paiActions, dispatch),
)
@reduxForm({
  form: 'settings',
  fields: [
    'title',
    'target',
    'backTitle',
    'image'
  ],
  validate: widgetValidation
})
export default class PAIForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    create: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object
  };

  generateUUID() {
    let da = new Date().getTime();
    // if (window && window.performance && typeof window.performance.now === 'function') {
    //   da += performance.now(); // use high-precision timer if available
    // }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (cs) => {
      const ar = (da + Math.random() * 16) % 16 | 0;
      da = Math.floor(da / 16);
      return (cs === 'x' ? ar : (ar & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  render() {
    const { isOpen, label, create, submitting, pristine, handleSubmit, invalid, values, fields: { image, title, target, backTitle } } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Add"
        primary
        onTouchTap={handleSubmit(() => create({
          ...values,
          id: generateUUID(),
          categoryName: label
        }).then(result => {
          if (result && typeof result.error === 'object') {
            return Promise.reject(result.error);
          }
          this.props.onClose();
        })
      )}
      disabled={pristine || invalid || submitting} />
    ];
    const csStyles = require('containers/Login/Login.scss');
    if (label === 'News Sites') {
      target.value = `/news-site/${this.generateUUID()}/`;
    }
    // const { , values, key, handleSubmit, invalid, fields: {fields}, formKey, saveError: { [formKey]: saveError } } = this.props;
    return (<Dialog
      title={`Add site to category ${label}`}
      actions={actions}
      open={isOpen}>
      <div style={{display: 'flex'}}>
        <div style={{maxWidth: '25%', minWidth: '25%'}}>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Image</div>
          <div>
            <UploadBlob accept=".png,.jpg,.jpeg,.gif,.svg" dimensionsW="80%" dimensionsH="100px" events={{value: image.value, onChange: (vals) => {
              image.onChange({value: vals.value.image});
            }}} fileKey="image" />
          </div>
        </div>
        <div>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Title</div>
          <div>
            <input type="text"
              className={csStyles.ipb}
              placeholder="Title"
              {...title} />
          </div>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Target URL</div>
          <div>
            <input type="text"
              className={csStyles.ipb}
              placeholder="Target URL"
              {...target} />
          </div>
          <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Text on the back of the tile</div>
          <div>
            <input type="text"
              className={csStyles.ipb}
              placeholder="Tile text"
              {...backTitle} />
          </div>
        </div>
      </div>
    </Dialog>);
    // const { isOpen, values, invalid, handleSubmit, pristine, save, fields: {subject, message}, submitting } = this.props;
    // const css = require('containers/Biographies/Bio.scss');
    // const styles = require('containers/Biographies/Biographies.js');
    // const csStyles = require('containers/Login/Login.scss');
    // return (
    //   <div className={submitting ? styles.saving : ''} style={{height: '100%'}}>
    //     <div style={{width: '100%'}} className={css.flexMobile}>
    //     <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Subject</div>
    //       <div><input type="text"
    //                 className={csStyles.ipb}
    //                 placeholder="Subject"
    //                 {...subject}
    //               /></div>
    //       <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Message</div>
    //       <div><textarea
    //                 style={{width: '100%', height: 200}}
    //                 className={csStyles.ipb}
    //                 placeholder="Message"
    //                 {...message}
    //               /></div>
    //       <RaisedButton
    //           label="Send"
    //           labelPosition="after"
    //           secondary
    //           icon={<Save />}
    //           onTouchTap={handleSubmit(() => save(sKey, values)
    //                         .then(result => {
    //                           if (result && typeof result.error === 'object') {
    //                             return Promise.reject(result.error);
    //                           }
    //                         })
    //                       )}
    //           disabled={pristine || invalid || submitting}
    //           type="submit" />
    //
    //     </div>
    //   </div>
    // );
  }
}
