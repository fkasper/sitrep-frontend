/* global CKEDITOR */
import React, {Component, PropTypes} from 'react';
import { uploadFile } from 'redux/modules/uploads';
import {connect} from 'react-redux';
import Cookie from 'js-cookie';
import config from '../../config';
@connect(
  state => ({
    settings: state.permissions.data,
    success: state.uploads.success,
    error: state.uploads.error,
  }),
  {uploadFile})
export default class Editor extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    stateOnly: PropTypes.bool,
    value: PropTypes.string.isRequired,
    uploadFile: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this._editor = null;
  }

  componentDidMount() {
    this.editorState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.editorState(nextProps);
  }
  
  onChangeEventTrigger() {
    if (this._editor) {
      let data = this._editor.getData();
      if (data === '') {
        data = 'placeholder';
      }
      const synthEvent = {
        value: data
      };
      this.props.onChange(synthEvent);
    }
  }

  setEditorEvents() {
    const changeEventsMech = () => {
      if (this._editTimeout) {
        clearTimeout(this._editTimeout);
      }
      this._editTimeout = setTimeout(() => {
        this.onChangeEventTrigger();
      }, 100);
    };
    this._editor.on('change', changeEventsMech);
    this._editor.on('blur', changeEventsMech);
    this._editor.on( 'fileUploadRequest', (evt) => {
      const xhr = evt.data.fileLoader.xhr;
      const file = evt.data.fileLoader.file;
      const bearer = Cookie.get('sid');
      xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
      xhr.setRequestHeader( 'X-File-Name', file.name );
      xhr.setRequestHeader( 'X-File-Preview', file.preview );
      xhr.setRequestHeader( 'X-File-LastModified', file.lastModified );
      xhr.setRequestHeader( 'Authorization', `Bearer ${bearer}` );
      xhr.send( file );
      evt.stop();
    });
  }

  editorState(props) {
    if (!props.stateOnly) {
      this.initEditor();
    } else {
      this.destroyEditor();
    }
  }

  initEditor() {
    if (!this._editor) {
      this._editor = CKEDITOR.replace( this.refs.editor, {
        extraPlugins: 'uploadimage,imageresize',
        imageUploadUrl: `${config.apiBaseUrl}/apis/authentication/uploads`,
        imageResize: { maxWidth: 400, maxHeight: 400},
      });
      this._editor.setData(this.props.value);
      this.setEditorEvents();
    }
  }

  destroyEditor() {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  // 2 states: readOnly and write.
  render() {
    const { stateOnly, value } = this.props;
    return (<div>
      {
        stateOnly ? <div dangerouslySetInnerHTML={{__html: value}}></div> :
        <div>
          <div ref="editor"></div>
        </div>
      }
    </div>);
  }
}
