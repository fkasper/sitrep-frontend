import React, {Component} from 'react';
// import {connect} from 'react-redux';

// @connect(state => ({ time: state.info.data.time }))
export default class Footer extends Component {
  // static propTypes = {
  //   time: PropTypes.number
  // }

  render() {
    // const {time} = this.props;
    return (
      <div className={styles.mbrFooter}>
        <div></div>
        <div>
        <a href="http://vatcinc.com" target="_blank">&copy; VATC, INC.</a> | <a href="#">Logout</a>
        </div>
      </div>
    );
  }
}
