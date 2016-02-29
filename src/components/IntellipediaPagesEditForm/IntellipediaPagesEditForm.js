import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as usersActions from 'redux/modules/intellipedia';
import Save from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';
import { Editor, UploadBlob } from 'components';
@connect(
  state => ({
    saveError: state.auth.saveError
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)
@reduxForm({
  form: 'intellipedia',
  fields: [
    'title',
    'preview',
    'content'
  ],
  validate: widgetValidation
})
export default class IntellipediaPagesEditForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onEditingDone: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    create: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    saveError: PropTypes.object
  };


  render() {
    const { submitting, handleSubmit, create, values, fields: {title, content, preview}, saveError } = this.props;
    const styles = require('containers/Login/Login.scss');
    return (
      <div className={submitting ? styles.saving : ''} style={{marginBottom: 20, padding: '40px 40px 0px 40px'}}>
        {saveError && <div className={styles.error}>{saveError.message} </div>}
        <RaisedButton
            label="Save Page"
            labelPosition="after"
            secondary
            icon={<Save />}
            type="submit"
            onTouchTap={
              handleSubmit(() => {
                create({
                  characteristics: {queryGroup: 'intellipedia'},
                  metadata: {
                    title: values.title,
                    preview: values.preview
                  },
                  content: values.content
                }).then(result => {
                  if (result && typeof result.error === 'object') {
                    return Promise.reject(result.error);
                  }
                  this.props.onEditingDone(result.result.id);
                });
              })
            }
            style={styles.button} />
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            required
            {...title} />

        <div style={{display: 'flex'}}>
          <div style={{
            flex: 1,
            maxWidth: 200,
            marginRight: 15,
            fontSize: 12}}>
            <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="128px" dimensionsH="128px" events={{value: {preview: preview.value}, onChange: (evt) => {
              console.log(evt.value.preview);
              preview.onChange({value: evt.value.preview});
              preview.onBlur({value: evt.value.preview});
              console.log(preview.value);
            }}} fileKey="preview" />
          </div>
          <div style={{flex: 1, maxWidth: 'calc(100% - 200px)'}}>
            <Editor
              type="text"
              className={styles.input}
              {...content} />
          </div>
        </div>
      </div>
    );
  }
}
