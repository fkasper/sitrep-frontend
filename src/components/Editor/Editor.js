/* global CKEDITOR */
import React, {Component, PropTypes} from 'react';
// import ReactDOM from 'react-dom';
// import BlockStyleControls from './BlockStyleControls';
// import InlineStyleControls from './InlineStyleControls';
// // EDITOR
// // import Dialog from 'material-ui/lib/dialog';
// // import FlatButton from 'material-ui/lib/flat-button';
// import { insertMedia } from './insertMedia';
// import MediaSelect from './MediaSelect';
// // import config from '../../config';
//
// import {
//   convertFromRaw,
//   convertToRaw,
//   ContentState,
//   CompositeDecorator,
//   Editor,
//   Entity,
//   EditorState,
//   RichUtils
// } from 'draft-js';
//
//
// const styles1 = {
//   root: {
//     fontFamily: '\'Georgia\', serif',
//     padding: 20,
//     width: 600,
//   },
//   buttons: {
//     marginBottom: 10,
//   },
//   editor: {
//     border: '1px solid #ccc',
//     cursor: 'text',
//     minHeight: 80,
//     padding: 10,
//   },
//   button: {
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   link: {
//     color: '#3b5998',
//     textDecoration: 'underline',
//   },
// };
//
// class MediaComponent extends Component {
//   static propTypes = {
//     block: PropTypes.object,
//     blockProps: PropTypes.object
//   }
//
//   constructor() {
//     super();
//     this.state = { menuShown: false };
//     this.showMenu = () => this.setState({menuShow: true});
//     this.hideMenu = () => this.setState({menuShow: false});
//     this._finishEdit = () => {
//       this.props.blockProps.onFinishEdit(this.props.block.getKey());
//     };
//   }
//
//   _getValue() {
//     const val = this.props.block.getEntityAt(0);
//     if (!val) return null;
//     return Entity.get(val).getData();
//   }
//
//
//   handleClose() {
//   }
//
//   alignImage() {
//     const css1 = {clear: 'both', float: 'left', margin: '20px'};
//     this.setState({internalCss: css1});
//     const entityKey = this.props.block.getEntityAt(0);
//     Entity.mergeData(entityKey, {css: css1});
//   }
//
//
//   render() {
//     const { internalCss, internalImage } = this.state;
//     const data = this._getValue();
//     const css = require('./Editor.scss');
//     const styles = require('./Style.js');
//     if (this.props.blockProps.viewMode) {
//       return (<figure style={(data && data.css)}>
//               <img className={css.image} src={`${data && data.content}`} />
//               <div className={css.caption}>{data && data.caption}</div>
//             </figure>);
//     }
//     return (<div contentEditable={false}>{(data && data.content) ?
//         <figure style={internalCss || (data && data.css)}>
//           <div style={{...styles.inlineControls}}>
//             <div className={css.inlineWrapper}>
//               <div className={css.inlineLift}>
//                 <div className={css.inlinePlaceholder}>
//                   <div style={{display: 'flex'}}>
//             <span className={' ' + css.menuIcon} onTouchTap={() => {
//               const css1 = {clear: 'both', float: 'left', margin: '20px'};
//               this.setState({internalCss: css1});
//               const entityKey = this.props.block.getEntityAt(0);
//               Entity.mergeData(entityKey, {css: css1});
//             }} style={styles.menuIcon}>left</span>
//             <span className={' ' + css.menuIcon} onTouchTap={() => {
//               const css1 = {clear: 'both', float: 'right', margin: '20px'};
//               this.setState({internalCss: css1});
//               const entityKey = this.props.block.getEntityAt(0);
//               Entity.mergeData(entityKey, {css: css1});
//             }} style={styles.menuIcon}>right</span>
//             </div>
//             </div>
//             </div>
//             </div>
//           </div>
//           <img className={css.image} src={`${internalImage || (data && data.content)}`} />
//           <div className={`${css.editCaption} ${css.caption}`}>{data.caption || <span>change caption</span>}</div>
//         </figure>
//       : <div>
//       <MediaSelect onSelect={(val) => {
//         const entityKey = this.props.block.getEntityAt(0);
//         this.setState({internalImage: val});
//         Entity.mergeData(entityKey, {content: val});
//         this._finishEdit();
//       }}/>
//     </div> }</div>);
//
//     //   <figure onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} style={{...styles.embeddableImage, ...data.css}} contentEditable={false}>
//     //     <div className={menuShow ? css.fadeInMenu : css.menu} style={styles.menu}>
//     //       <i className={'material-icons ' + css.menuIcon} style={styles.menuIcon}>format_align_left</i>
//     //       <i className={'material-icons ' + css.menuIcon} style={styles.menuIcon}>format_align_center</i>
//     //       <i className={'material-icons ' + css.menuIcon} style={styles.menuIcon}>format_align_right</i>
//     //     </div>
//     //     img!!!
//     //     <img src={data.content} style={{width: '100%', height: '100%'}} />
//     //     <div className={menuShow ? css.fadeInMenu : css.menu} style={styles.menu}>Replace image (click here!)</div>
//     //   </figure>
//     // );
//   }
// }

export default class Editor extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    stateOnly: PropTypes.bool,
    value: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this._editor = null;
  }

  componentDidMount() {
    this.editorState(this.props);
  }

  componentDidReceiveProps(nextProps) {
    this.editorState(nextProps);
  }

  editorState(props) {
    if (!props.stateOnly) {
      this.initEditor();
    } else {
      this.destroyEditor();
    }
  }

  initEditor() {
    CKEDITOR.replace( this.refs.editor, {
      extraPlugins: 'uploadimage,imageresize,doksoft_backup',
      toolbar_name: 'doksoft_backup_save,doksoft_backup_load',
      imageUploadUrl: 'UploadImage.aspx?max=1200',
      imageResize: { maxWidth: 400, maxHeight: 400},
    });
    // this._editor = ;
  }

  destroyEditor() {
    console.log('destroying editor');
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
    // const {editorState, readOnly, inlineStylesMenu, addBlocksMenu, Ltop, Lleft} = this.state;
    // const { stateOnly } = this.props;
    // const customStyleMap = {
    //   'LEFTALIGN': {
    //     float: 'left',
    //     clear: 'both',
    //     margin: '0 0 40px 40px'
    //   },
    //   'CENTERALIGN': {},
    //   'RIGHTALIGN': {
    //     clear: 'both',
    //     float: 'right',
    //     margin: '0 0 40px 40px'
    //   },
    //   'ALIGNED_IMAGE': {
    //     maxHeight: 400,
    //     maxWidth: 400
    //   },
    //   'IMAGE_CAPTION': {
    //     width: 'auto',
    //     margin: '0 auto',
    //     paddingTop: 16,
    //     fontFamily: `'Georgia', serif`
    //   },
    //   'HRULE': {
    //     height: 0,
    //     borderTop: '1px solid #ccc',
    //     borderBottom: '1px solid #eee'
    //   }
    // };
    // const css = require('./Editor.scss');

    // return (<div>
    //   <div style={{
    //     margin: 5,
    //     maxWidth: '100%',
    //     background: '#ccc',
    //     padding: '0',
    //     display: 'flex'}}>
    //
    //
    //   </div>
    //     <div style={stateOnly ? {minHeight: 200, marginBottom: 20, margin: 5,
    //     fontSize: 17,
    //     WebkitFontSmoothing: 'antialiased',
    //     lineHeight: '28px',
    //     paddingBottom: 60,
    //     position: 'relative'} : {minHeight: 200, marginBottom: 20, margin: 5,
    //     backgroundColor: '#fff', padding: '5px 10px', border: '1px solid #ccc',
    //     fontSize: 17,
    //     WebkitFontSmoothing: 'antialiased',
    //     lineHeight: '28px',
    //     paddingBottom: 60,
    //     position: 'relative'
    //   }}
    //   className={css.editor}
    //   onMouseUp={this._mouseUp.bind(this)}
    //   onTouchTap={this.focus}>
    //   {!(readOnly || stateOnly) && addBlocksMenu && <div style={{...styles1.inlineControls, position: 'absolute', top: Ltop, right: Lleft}}><BlockStyleControls
    //       editorState={editorState}
    //       onImageAdd={() => {
    //         this.setState({
    //           editorState: insertMedia(this.state.editorState),
    //         });
    //       }}
    //       onToggle={this.toggleBlockType}
    //       /></div> }
    //   {!(readOnly || stateOnly) && inlineStylesMenu && <div style={{...styles1.inlineControls, position: 'fixed', bottom: 0, left: 0, right: 0}}><InlineStyleControls
    //     editorState={editorState}
    //     onToggle={this.toggleInlineStyle}
    //   /></div> }
    //       <Editor
    //         {...this.props}
    //         editorState={editorState}
    //         style={{}}
    //         readOnly={readOnly || stateOnly}
    //         placeholder={'Content'}
    //         ref="editor"
    //         spellCheck
    //         customStyleMap={customStyleMap}
    //         handleKeyCommand={this.handleKeyCommand}
    //         handlePastedFiles={this.handlePastedFiles}
    //         blockRendererFn={this.myBlockRenderer.bind(this, null)}
    //         blockStyleFn={this.blockStyleFn}
    //         onChange={this.onChange} />
    //     </div>
    //   </div>);
  }
}
