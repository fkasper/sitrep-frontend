import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import Helmet from 'react-helmet';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { pushState } from 'redux-router';
import { ContactForm } from 'components';

// require('inuit-defaults/_settings.defaults.scss');
// require('grommet/scss/hpe/index.scss');
// require('grommet/scss/grommet-core/index.scss');
function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    settings: state.permissions.data
  }),
  {updateSettings, pushState}
)
export default class IndexDashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    articles: PropTypes.array,
    article: PropTypes.object,
    updateSettings: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  render() {
    const css = require('./Users.scss');
    return (<div style={{ padding: 15 }} className={`${css.formatting}`}>
      <Helmet title="Exercise Support"/>
      <div className={css.flexBox}>
        <div style={{minWidth: '50%'}}>
        <div className={css.header}>
          <h1>Contact</h1>
        </div>
          <ContactForm formKey={'contact'} sKey={''} initialValues={{}} />
        </div>
        <div>
        <div className={css.header}>
          <h1>&copy; Copyright</h1>
        </div>
        <p style={{padding: 10}}>
         [2003] - [2016] Visual Awareness Technologies Incorporated
         All Rights Reserved.
         NOTICE:  All information contained herein is, and remains
         the property of Visual Awareness Technologies, Inc. (VATC) and its suppliers,
         if any.  The intellectual and technical concepts contained
         herein are proprietary to Visual Awareness Technologies Incorporated
         and its suppliers and may be covered by U.S. and Foreign Patents,
         patents in process, and are protected by trade secret or copyright law.
         Dissemination of this information or reproduction of this material
         is strictly forbidden unless prior written permission is obtained
         from VATC Incorporated.
         </p>
        </div>

      </div>
    </div>);
  }
}

// <Editor stateOnly value={article.content} onChange={() => {}} formKey={article.id}/>
