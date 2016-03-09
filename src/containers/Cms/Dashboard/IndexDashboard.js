import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import Helmet from 'react-helmet';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { pushState } from 'redux-router';
import { PieChart } from 'react-d3';
import Paper from 'material-ui/lib/paper';

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
    loadArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }


  render() {
    const pieData = [
      {label: 'Margarita', value: 20.0},
      {label: 'John', value: 55.0},
      {label: 'Tim', value: 25.0 }
    ];
    const css = require('./Style.scss');
    return (<div style={{ display: 'flex' }} className={css.mobaFlex}>
      <Helmet title="Trainer Dashboard"/>
      <Paper zDepth={1} style={{position: 'relative', minWidth: '33.333%'}}>
        <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 12, fontWeight: 500}}>USER ACTIVITY (percentage)</div>
        <PieChart
          data={pieData}
          width={400}
          height={400}
          radius={100}
          innerRadius={20}
        />
      </Paper>
      <Paper zDepth={1} style={{position: 'relative', minWidth: '33.333%'}}>
        <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 12, fontWeight: 500}}>LABEL</div>
        <PieChart
          data={pieData}
          width={400}
          height={400}
          radius={100}
          innerRadius={20}
        />
      </Paper>
      <Paper zDepth={1} style={{position: 'relative', minWidth: '33.333%'}}>
        <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 12, fontWeight: 500}}>LABEL</div>
        <PieChart
          data={pieData}
          width={400}
          height={400}
          radius={100}
          innerRadius={20}
        />
      </Paper>
    </div>);
  }
}

// <Editor stateOnly value={article.content} onChange={() => {}} formKey={article.id}/>
