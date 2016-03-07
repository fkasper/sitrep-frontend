import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {changeMenuMode} from 'redux/modules/menu';
import Helmet from 'react-helmet';
import { BioEditForm } from 'components';
import { notify } from 'redux/modules/notifications';

function fetchDataDeferred(getState, dispatch) {
  return dispatch(changeMenuMode(true, false));
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user
  }),
  {pushState, notify}
)
export default class New extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  }

  render() {
    const { user, user: {globalPermissions: { admin } } } = this.props;
    const styles = require('./Biographies.js');

    return (
      <div style={{height: '100%', flex: 1, position: 'relative'}}>
      <Helmet title={`Create a new Biography`}/>
        {user && admin && <div style={styles.rootBlock}>
          <BioEditForm formKey={'map'} onEditingDone={(id) => {
            this.props.notify('Successfully saved. We will redirect you shortly.', true, false);
            setTimeout(() => {
              this.props.pushState(null, `/biographies/${id.result}`);
            }, 900);
          } } sKey={""} initialValues={{}} />
          </div>}
      </div>
    );
  }
}
