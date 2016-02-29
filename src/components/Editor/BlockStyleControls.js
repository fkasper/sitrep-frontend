import React from 'react';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: null},
  {label: 'HR', style: 'HRULE', icon: 'border_bottom'},
  {label: 'H2', style: 'header-two', icon: null},
  {label: 'Blockquote', style: 'blockquote', icon: 'format_quote'},
  {label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted'},
  {label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered'},
  // {label: 'Img', style: 'com.typhonapp.image', icon: 'photo_library'}
  // {label: 'Code Block', style: 'code-block', icon: ''},
];

const BlockStyleControls = (pp) => {
  const {editorState} = pp;
  if (!editorState) return (<div></div>);
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const styles = require('./Style.js');
  const css = require('./Editor.scss');
  return (
    <div style={{...styles.inlineControls}}>
      <div className={css.inlineWrapper}>
        <div className={css.inlineLift}>
          <div className={css.inlinePlaceholder}>
            <div style={{display: 'flex'}}>
              {BLOCK_TYPES.map((type) =>
                <StyleButton
                  active={type.style === blockType}
                  icon={type.icon}
                  label={type.label}
                  key={type.label}
                  onToggle={pp.onToggle}
                  style={type.style}
                />
              )}
              <StyleButton
                icon={'photo_library'}
                label={'PhotoLibrary'}
                key={'PhotoLibrary'}
                onToggle={pp.onImageAdd}
                style={'code-block'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockStyleControls;
