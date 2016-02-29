import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, addArrayValue} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as biographiesActions from 'redux/modules/biographies';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {UploadBlob, Editor } from 'components';
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
  dispatch => bindActionCreators(biographiesActions, dispatch),
)
@reduxForm({
  form: 'settings',
  fields: [
    'biometrics',
    'fields[].title',
    'fields[].value',
    'name',
    'description',
    'geoZoom',
    'geoArea',
    'documents[].title',
    'documents[].value'
  ],
  validate: widgetValidation
})
export default class BioEditForm extends Component {
  static propTypes = {
    addValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onEditingDone: PropTypes.func.isRequired,
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
    const { sKey, values, invalid, onEditingDone, handleSubmit, pristine, save, fields: {description, geoZoom, geoArea, biometrics, fields, name}, submitting } = this.props;
    const css = require('containers/Biographies/Bio.scss');
    const styles = require('containers/Biographies/Biographies.js');
    const csStyles = require('containers/Login/Login.scss');
    return (
      <div className={submitting ? styles.saving : ''} style={{height: '100%'}}>
      <div style={styles.root} className={css.flexMobile}>
        <div style={styles.gridSingle}>
          <div style={styles.horizontalGridElement}>
            <Tabs style={styles.tab}>
              <Tab label="Images" value="images" >
                <div>
                  {biometrics && <div style={styles.root} className={css.flexMobile}>
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="left_portrait" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="128px" dimensionsH="128px" events={biometrics} fileKey="center_portrait" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="right_portrait" />
                  </div>}
                </div>
              </Tab>
              <Tab label="GEO Location" value="geo_location">
                <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>GEO Boundary Box</div>
                <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="GEO Boundary Box"
                          {...geoArea}
                        /></div>
                <div style={{padding: 5, fontSize: 14, textTransform: 'uppercase'}}>GEO center</div>
                <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="GEO Center"
                          {...geoZoom}
                        /></div>
              </Tab>
            </Tabs>
          </div>
          <div style={styles.horizontalGridElement}>
          documents
          </div>
        </div>
        <div style={styles.gridDouble}>
          <Tabs>
            <Tab label="About" value="center_tags" style={styles.userDescription}>
              <div style={styles.flexTags}>
                <div><strong style={{verticalAlign: 'bottom'}}>Name</strong></div>
                <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="Name"
                          {...name}
                        /></div>
              </div>
              {!fields.length && <div>No Fields defined</div>}
              {fields.map((child, index) => <div style={styles.flexTags}>
                <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="Tag"
                          {...child.title}
                        /></div>
                <div><input type="text"
                          className={csStyles.ipb}
                          placeholder="Value"
                          {...child.value}
                        /></div>
                <div type="button" style={styles.button} disabled={index === 0} onClick={() => {
                  fields.swapFields(index, index - 1);  // swap field with it's predecessor
                }}><i className="material-icons">keyboard_arrow_up</i>
                </div>
                <div type="button" style={styles.button} disabled={index === fields.length - 1} onClick={() => {
                  fields.swapFields(index, index + 1);  // swap field with it's successor
                }}><i className="material-icons">keyboard_arrow_down</i>
                </div>
                <div type="button" style={styles.button} onClick={() => {
                  fields.removeField(index);  // remove from index
                }}><i className="material-icons">remove_circle</i>
                </div>
                </div>
              )}

              <div type="button" style={styles.button} onClick={() => {
                fields.addField();  // pushes empty award field onto the end of the array
              }}><i className="material-icons">add_circle</i>
              </div>
              {biometrics && biometrics.fields && Object.keys(biometrics.fields).map((fieldObj) => <div key={fieldObj} style={styles.flexTags}>
              <div><strong>{fieldObj}</strong></div>
              <div>{biometrics.fields[fieldObj]}</div>
              </div>)}
            </Tab>
            <Tab label="Overview" value="center_overview" >
              <Editor {...description} />
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
                              } else if (result) {
                                onEditingDone();
                              }
                            })
                          )}
              disabled={pristine || invalid || submitting}
              type="submit" />

          </div>
        </div>
        <div style={styles.gridSingle}>
          <Tabs>
            <Tab label="fingers" value="fingers" >
              <div style={styles.gridSingle}>

                <div style={styles.horizontalGridElement}>
                  <div style={styles.root} className={css.flexMobile}>
                    <p style={styles.fixedTitle}>Left Hand</p>
                      <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="one_left" />
                      <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="two_left" />
                      <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="three_left" />
                      <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="four_left" />
                      <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="five_left" />
                  </div>
                </div>
                <div style={styles.horizontalGridElement}>
                  <div style={styles.root} className={css.flexMobile}>
                    <p style={styles.fixedTitle}>Right Hand</p>
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="one_right" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="two_right" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="three_right" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="four_right" />
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="64px" dimensionsH="64px" events={biometrics} fileKey="five_right" />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab label="eyes" value="eyes" >
              <div style={styles.gridSingle}>

                <div style={styles.horizontalGridElement}>
                  <div style={styles.root} className={css.flexMobile}>
                    <p style={styles.fixedTitle}>Left Eye</p>
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="128px" dimensionsH="128px" events={biometrics} fileKey="left_eye_image" />
                  </div>
                </div>
                <div style={styles.horizontalGridElement}>
                  <div style={styles.root} className={css.flexMobile}>
                    <p style={styles.fixedTitle}>Right Eye</p>
                    <UploadBlob accept=".jpg,.png,.jpeg,.gif" dimensionsW="128px" dimensionsH="128px" events={biometrics} fileKey="right_eye_image" />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      </div>
    );
  }
}
