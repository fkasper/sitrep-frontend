import React, {Component, PropTypes} from 'react';

export default class StyleButton extends Component {
  static propTypes = {
    onToggle: PropTypes.func,
    style: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    icon: PropTypes.string,
    key: PropTypes.string
  }

  constructor() {
    super();
    this.onToggle = (evt) => {
      evt.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <div key={this.props.key} style={{
        padding: '5px 10px',
        cursor: 'pointer'}} onMouseDown={this.onToggle}>
        {(this.props.icon ? <i style={{verticalAlign: 'bottom'}} className="material-icons">{this.props.icon}</i> : <span style={{verticalAlign: 'middle' }}> {this.props.label}</span>)}
      </div>
    );
  }
}
