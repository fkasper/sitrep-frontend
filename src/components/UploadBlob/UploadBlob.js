import React, {Component, PropTypes} from 'react';
import { pushState } from 'redux-router';
import {connect} from 'react-redux';
import { notify } from 'redux/modules/notifications';
import { uploadFile } from 'redux/modules/uploads';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/lib/circular-progress';

// @connect(state => ({ time: state.info.data.time }))
@connect(
  state => ({
    settings: state.permissions.data,
    success: state.uploads.success,
    error: state.uploads.error,
  }),
  {pushState, notify, uploadFile})
export default class RequireAccessLevel extends Component {
  static propTypes = {
    notify: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    events: PropTypes.object,
    fileKey: PropTypes.string,
    accept: PropTypes.string,
    success: PropTypes.bool,
    error: PropTypes.object,
    dimensionsW: PropTypes.string,
    dimensionsH: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.props.notify('image was successfully uploaded', true, false);
    }
    if (nextProps.error) {
      this.props.notify(nextProps.error.message, true, false);
    }
  }

  onDrop(_$, fileSrc) {
    const { events: { onChange, value }, fileKey } = this.props;
    this.props.notify('uploading image', true, false);
    this.setState({loading: true, preview: fileSrc[0].preview});
    this.props.uploadFile(fileSrc).then((action) => {
      this.setState({loading: false});
      const syntheticEvent = {
        value: {
          ...value,
          [fileKey]: action.result && `${action.result.absRedirectTarget}`
        }
      };
      onChange(syntheticEvent);
    });
  }

  render() {
    const styles = require('containers/Biographies/Biographies.js');
    const placeholder = require('containers/Biographies/placeholder.png');
    const { accept, dimensionsH, dimensionsW, fileKey, events: { value } } = this.props;
    const { loading, preview } = this.state;

    let defaultValue = placeholder;
    if (value && value[fileKey]) {
      defaultValue = value[fileKey];
    }

    const style = {
      ...styles.image,
      width: dimensionsW,
      height: dimensionsH,
      position: 'relative',
      backgroundImage: loading || 'url(' + ( preview || defaultValue || placeholder) + ')'
    };
    return (<div style={{ width: dimensionsW, height: dimensionsH}}>
      <Dropzone onDrop={this.onDrop.bind(this, null)} style={style} accept={accept}>
        {(loading) && <img src={preview} style={{maxWidth: '100%', maxHeight: '100%'}} />}
        {(loading) && <div style={{position: 'absolute', top: 20, left: 20}}><CircularProgress /></div>}
      </Dropzone>
    </div>);
  }
}
