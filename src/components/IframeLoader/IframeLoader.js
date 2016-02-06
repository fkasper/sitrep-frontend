import React, {Component} from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

// import {connect} from 'react-redux';

// @connect(state => ({ time: state.info.data.time }))
export default class IframeLoader extends Component {
  // static propTypes = {
  //   time: PropTypes.number
  // }
  static propTypes = {
    src: React.PropTypes.string.isRequired
  }

  componentWillMount() {
    this.setState({loading: true});
  }

  componentDidMount() {
    this.refs.iframe.addEventListener('load', this.onLoad.bind(this, null));
  }

  onLoad() {
    this.setState({loading: false});
  }

  render() {
    // const {time} = this.props;
    const { loading } = this.state;
    const styles = require('./Loader.scss');
    return (<div {...this.props}>
      <CircularProgress style={{display: loading ? 'block' : 'none', margin: 'auto'}}/>
      <iframe ref="iframe" {...this.props} styles={{border: 0, margin: 0}} className={`${styles.loader} ${loading ? styles.isLoading : styles.loaded}`} />
    </div>);
  }
}
