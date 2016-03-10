import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, addArrayValue} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as newsStoriesActions from 'redux/modules/newsstories';
import { Editor } from 'components';
// import TextField from 'material-ui/lib/text-field';
// import Save from 'material-ui/lib/svg-icons/content/save';
// import Add from 'material-ui/lib/svg-icons/content/add';

// import RaisedButton from 'material-ui/lib/raised-button';

@connect(
  state => ({
    user: state.auth.user,
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
export default class EditableNewsStoryElement extends Component {

  static propTypes = {
    addValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    updateTrendingStory: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    user: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    sKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    station: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object
  };

  constructor(params) {
    super(params);
    this.state = { editing: false };
  }

  _enableEdit() {
    this.setState({editing: true});
  }

  render() {
    // const { , values, key, handleSubmit, invalid, fields: {fields}, formKey, saveError: { [formKey]: saveError } } = this.props;
    // const { sKey, values, invalid, handleSubmit, pristine, save, fields, submitting } = this.props;
    const { sKey, submitting, fields, type, save, handleSubmit, user: { realName, globalPermissions: { admin }}, values, formKey, station } = this.props;
    const { editing } = this.state;
    const css = require('containers/NewsSite/Style.scss');
    // const styles = require('containers/NewsSite/Style.js');
    const csStyles = require('containers/Login/Login.scss');
    if (fields[sKey]) {
      if (type === 'text') {
        if (!admin) return (<div>{fields[sKey].value}</div>);
        return (<div className={submitting ? css.saving : ''}>
          {editing ? <div><input type="text"
                  className={csStyles.ipb}
                  {...fields[sKey]}
                />
            <i className={'material-icons'} style={{verticalAlign: 'sub'}} onTouchTap={handleSubmit(() => {
              const newValues = {
                title: typeof values.title !== 'undefined' ? values.title : 'Title',
                scheduledPostDate: typeof values.scheduledPostDate !== 'undefined' ? values.scheduledPostDate : Math.floor((new Date).getTime() / 1000),
                scheduled: typeof values.scheduled !== 'undefined' ? values.scheduled : false,
                postedByName: realName,
                htmlContent: typeof values.htmlContent !== 'undefined' ? values.htmlContent : '',
                meta: typeof values.meta !== 'undefined' ? values.meta : [],

                // 'title',
                // 'scheduledPostDate',
                // 'scheduled',
                // 'postedByName',
                // 'htmlContent',
                // 'meta[].title',
                // 'meta[].value'
              };
              this.setState({editing: false});
              save(station, formKey, newValues)
                          .then(result => {
                            if (result && typeof result.error === 'object') {
                              return Promise.reject(result.error);
                            }
                          });
            })}>save</i></div>
            :
            <div className={css.hoverEdit} onTouchTap={this._enableEdit.bind(this, null)}>
            {fields[sKey].value}
            <i className={'material-icons ' + css.editPen}>edit</i>
            </div>
          }
        </div>);
      } else if (type === 'textblock') {
        // if (!admin) return (<div dangerouslySetInnerHTML={{__html: fields[sKey].value}}></div>);
        return (<div className={submitting ? css.saving : ''}>
          {editing && admin ? <div><Editor
                  className={csStyles.ipb}
                  {...fields[sKey]}
                />
            <i className={'material-icons'} style={{verticalAlign: 'sub'}} onTouchTap={handleSubmit(() => {
              const newValues = {
                title: typeof values.title !== 'undefined' ? values.title : 'Title',
                scheduledPostDate: typeof values.scheduledPostDate !== 'undefined' ? values.scheduledPostDate : Math.floor((new Date).getTime() / 1000),
                scheduled: typeof values.scheduled !== 'undefined' ? values.scheduled : false,
                htmlContent: typeof values.htmlContent !== 'undefined' ? values.htmlContent : '',
                postedByName: realName,
                meta: typeof values.meta !== 'undefined' ? values.meta : [],

                // 'title',
                // 'scheduledPostDate',
                // 'scheduled',
                // 'postedByName',
                // 'htmlContent',
                // 'meta[].title',
                // 'meta[].value'
              };
              this.setState({editing: false});
              save(station, formKey, newValues)
                          .then(result => {
                            if (result && typeof result.error === 'object') {
                              return Promise.reject(result.error);
                            }
                          });
            })}>save</i></div>
            :
            <div>
              <div>{admin && <div onTouchTap={this._enableEdit.bind(this, null)}>

              <i className={'material-icons '}>edit</i>
              </div>}</div>
              <Editor stateOnly
                      className={csStyles.ipb}
                      {...fields[sKey]}
                    />
            </div>

          }
        </div>);
      }
    }
    return (<div className={submitting ? css.saving : ''}>
      {sKey}
    </div>);
  }
}

// <div style={styles.gridDouble}>
//
//   <div style={{
//     position: 'absolute',
//     bottom: 30,
//     left: 20,
//     zIndex: 921,
//     color: '#fff',
//     verticalAlign: 'middle'
//   }}>
//
//   <RaisedButton
//       label="Save"
//       labelPosition="after"
//       secondary
//       icon={<Save />}

//       disabled={pristine || invalid || submitting}
//       type="submit" />
//
//   </div>
// </div>
