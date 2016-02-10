import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as usersActions from 'redux/modules/auth';
import Save from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/lib/paper';

@connect(
  state => ({
    saveError: state.auth.saveError
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)
@reduxForm({
  form: 'intellipedia',
  fields: ['title', 'content', 'thumbnail'],
  validate: widgetValidation
})
export default class CreateUserForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    createUser: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    saveError: PropTypes.object
  };


  render() {
    const { submitting, pristine, createUser, values, handleSubmit, invalid, fields: {title, content, thumbnail}, saveError } = this.props;
    const styles = require('containers/Login/Login.scss');
    return (
      <form onSubmit={handleSubmit(() => createUser(values)
                              .then(result => {
                                if (result && typeof result.error === 'object') {
                                  return Promise.reject(result.error);
                                }
                              })
                            )}
                            className={submitting ? styles.saving : ''} style={{marginBottom: 20, padding: '40px 40px 0px 40px'}}>
        {saveError && <div className={styles.error}>{saveError.message} </div>}
        <RaisedButton
            label="Save Page"
            labelPosition="after"
            secondary
            icon={<Save />}
            type="submit"
            style={styles.button}
            disabled={pristine || invalid || submitting} />
        <Paper zDepth={2}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            required
            {...title} />
        </Paper>

        <div style={{display: 'flex'}}>
          <div style={{
            flex: 1,
            maxWidth: 200,
            marginRight: 15,
            fontSize: 12}}>
            <Paper zDepth={2}>
              <Dropzone onDrop={this.onDrop} style={{border: 0,
              padding: 40}}
              {...thumbnail}>
                <div><strong>drop a new thumbnail here</strong></div>
              </Dropzone>
            </Paper>
          </div>
          <div style={{flex: 1}}>
            <Paper zDepth={2}>
            <textarea
              type="text"
              placeholder="Content (EDITOR TBD)"
              className={styles.input}
              required
              {...content} />
            </Paper>
          </div>
        </div>
      </form>
    );
  }
}
