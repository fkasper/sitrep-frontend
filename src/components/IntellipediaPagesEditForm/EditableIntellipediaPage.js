import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as intellipediaActions from 'redux/modules/intellipedia';
import { Editor } from 'components';
// import TextField from 'material-ui/lib/text-field';
import Save from 'material-ui/lib/svg-icons/content/save';

import RaisedButton from 'material-ui/lib/flat-button';

@connect(
  state => ({
    user: state.auth.user,
    saveError: state.exercises.saveError,
    settings: state.permissions.data
  }),
  dispatch => bindActionCreators(intellipediaActions, dispatch),
)
@reduxForm({
  form: 'intellipedia',
  fields: [
    'characteristics',
    'metadata',
    'content'
  ]
})
export default class EditableIntellipediaPage extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    user: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    sKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
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
    const { sKey, submitting, fields, type, save, handleSubmit, user: { globalPermissions: { admin }}, values, formKey } = this.props;
    const { editing } = this.state;
    const css = require('containers/NewsSite/Style.scss');
    // const styles = require('containers/NewsSite/Style.js');
    const csStyles = require('containers/Login/Login.scss');

    if (sKey.includes('.')) { // only text editing possible
      const parts = sKey.split('.');
      const resKey = parts[0];
      const subKey = parts[1];
      if (!fields[resKey].value) return (<div>Loading</div>);
      const fieldValue = fields[resKey].value[subKey];
      const change = (event) => {
        const preRes = fields[resKey];
        const syntheticEvent = {
          value: {
            ...preRes.values,
            [subKey]: event.target.value
          }
        };
        preRes.onChange(syntheticEvent);
      };
      if (!admin) return (<div>{fieldValue}</div>);
      return (<div className={submitting ? css.saving : ''}>
        {editing ? <div><input type="text"
                className={csStyles.ipb}
                onChange={change}
                value={fieldValue}
              />
          <i className={'material-icons'} style={{verticalAlign: 'sub'}} onTouchTap={handleSubmit(() => save(formKey, values)
                        .then(result => {
                          if (result && typeof result.error === 'object') {
                            return Promise.reject(result.error);
                          }
                          this.setState({editing: false});
                        })
          )}>save</i></div>
          :
          <div className={css.hoverEdit} onTouchTap={this._enableEdit.bind(this, null)}>
          {fieldValue}
          <i className={'material-icons ' + css.editPen}>edit</i>
          </div>
        }
      </div>);
    }

    if (fields[sKey]) {
      if (type === 'text') {
        if (!admin) return (<div>{fields[sKey].value}</div>);
        return (<div className={submitting ? css.saving : ''}>
          {editing ? <div><input type="text"
                  className={csStyles.ipb}
                  {...fields[sKey]}
                />
            <i className={'material-icons'} style={{verticalAlign: 'sub'}} onTouchTap={handleSubmit(() => save(formKey, values)
                          .then(result => {
                            if (result && typeof result.error === 'object') {
                              return Promise.reject(result.error);
                            }
                            this.setState({editing: false});
                          })
            )}>save</i></div>
            :
            <div className={css.hoverEdit} onTouchTap={this._enableEdit.bind(this, null)}>
            {fields[sKey].value}
            <i className={'material-icons ' + css.editPen}>edit</i>
            </div>
          }
        </div>);
      } else if (type === 'textblock' && fields[sKey].value) {
        // if (!admin) return (<div dangerouslySetInnerHTML={{__html: fields[sKey].value}}></div>);
        return (<div className={submitting ? css.saving : ''}>
          {editing && admin ? <div><Editor
                  className={csStyles.ipb}
                  {...fields[sKey]}
                />
                <div style={{
                  position: 'fixed',
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
                    onTouchTap={handleSubmit(() => save(formKey, values)
                                  .then(result => {
                                    if (result && typeof result.error === 'object') {
                                      return Promise.reject(result.error);
                                    }
                                    this.setState({editing: false});
                                  })
                    )}
                    type="submit" />

                </div>
              </div>
            :
            <div>
              <div>{admin && <div onTouchTap={this._enableEdit.bind(this, null)}>
              <RaisedButton
                  label="Edit"
                  labelPosition="after"
                  secondary
                  type="submit" />
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
