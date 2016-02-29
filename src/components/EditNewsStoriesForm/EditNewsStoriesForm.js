import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, addArrayValue} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as newsStoriesActions from 'redux/modules/newsstories';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {Editor} from 'components';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';
// import Add from 'material-ui/lib/svg-icons/content/add';

import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    saveError: state.exercises.saveError,
    addValue: addArrayValue,
    settings: state.permissions.data
  }),
  dispatch => bindActionCreators(newsStoriesActions, dispatch),
)
@reduxForm({
  form: 'newsstories',
  fields: [
    'title',
    'scheduledPostDate',
    'scheduled',
    'postedByName',
    'htmlContent',
    'meta[].title',
    'meta[].value'
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
    const { sKey, values, invalid, handleSubmit, pristine, save, fields: {title, htmlContent}, submitting } = this.props;
    const css = require('containers/Biographies/Bio.scss');
    const styles = require('containers/Biographies/Biographies.js');
    const csStyles = require('containers/Login/Login.scss');
    return (
      <div className={submitting ? styles.saving : ''} style={{height: '100%'}}>
      <div style={styles.root} className={css.flexMobile}>
        <div style={styles.gridSingle}>
          <div style={styles.horizontalGridElement}>
            <Tabs style={styles.tab}>
              <Tab label="Story" value="story" >
                <div>
                  <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>Story title</div>
                  <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="Title"
                          {...title}
                        /></div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div style={styles.gridDouble}>
          <Tabs>
            <Tab label="Editor" value="center_overview" >
              <Editor {...htmlContent} />
              <div></div>
            </Tab>
          </Tabs>
          <div style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            zIndex: 921,
            color: '#fff',
            verticalAlign: 'middle'
          }}>

          <RaisedButton
              label="Save"
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
      </div>
      </div>
    );
  }
}
