import React from 'react';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'format_bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'format_italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'format_underline'},
  {label: 'LeftAlign', style: 'LEFTALIGN', icon: 'format_align_left'},
  {label: 'RightAlign', style: 'RIGHTALIGN', icon: 'format_align_right'},
  // {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (pp) => {
  if (!pp || !pp.editorState) return (<div></div>);
  const currentStyle = pp.editorState.getCurrentInlineStyle();
  const styles = require('./Style.js');
  const css = require('./Editor.scss');
  return (
    <div style={{...styles.inlineControls}}>
      <div className={css.inlineWrapper}>
        <div className={css.inlineLift}>
          <div className={css.inlinePlaceholder}>
            <div style={{display: 'flex'}}>
              {INLINE_STYLES.map(type =>
                <StyleButton
                  active={currentStyle.has(type.style)}
                  label={type.label}
                  key={type.label}
                  onToggle={pp.onToggle}
                  style={type.style}
                  icon={type.icon}
                />
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InlineStyleControls;
