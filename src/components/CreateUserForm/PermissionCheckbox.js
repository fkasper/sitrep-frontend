import React, {Component, PropTypes} from 'react';
import Toggle from 'material-ui/lib/toggle';

export default class PermissionCheckbox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.object,
    permission: PropTypes.string.isRequired
  }
  onChange(__, evnt) {
    const { value, permission } = this.props;
    const checked = evnt.target.checked;
    const synthEvent = {
      value: {
        ...value,
        [permission]: checked
      }
    };
    this.props.onChange(synthEvent);
    this.props.onBlur(synthEvent);
  }

  render() {
    const { value, permission } = this.props;
    const styles = {
      block: {
        maxWidth: 250,
      },
      toggle: {
        marginBottom: 16,
      },
    };
    return (<div>
      <Toggle
        label={permission}
        defaultToggled={value && value[permission]}
        onToggle={this.onChange.bind(this, null)}
        style={styles.toggle}
      />
    </div>);
  }
}
