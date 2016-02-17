import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadBiographies} from 'redux/modules/biographies';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/lib/raised-button';
import Add from 'material-ui/lib/svg-icons/content/add';


import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import {changeMenuMode} from 'redux/modules/menu';


function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];
  promises.push(dispatch(changeMenuMode(true)));
  if (!isLoaded(state)) {
    return dispatch(loadBiographies());
  }
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    biographies: state.biographies.data
  }),
  {pushState}
)
export default class Index extends Component {
  static propTypes = {
    user: PropTypes.object,
    biographies: PropTypes.array,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {}

  adminToolbar() {
    return (<div style={{
      position: 'absolute',
      bottom: 30,
      left: 20,
      zIndex: 921,
      color: '#fff',
      verticalAlign: 'middle'}}>
      <RaisedButton
        label="Add Biography"
        labelPosition="after"
        primary
        icon={<Add />}
        onTouchTap={() => this.props.pushState(null, '/biographies/new')}
        type="submit" />{ '  ' }
    </div>);
  }

  render() {
    const { biographies, user: {globalPermissions: { admin } } } = this.props;
    const css = require('./Bio.scss');
    // require the logo image both from client and server
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '80%',
        height: 400,
        overflowY: 'auto',
        marginBottom: 24,
      },

    };
    return (
      <div style={{height: '100%', flex: 1, position: 'relative'}}>
      {(admin) && this.adminToolbar()}

      <Helmet title="Biographies"/>
        <div>
          <div className={css.root + ' ' + css.formatting}>
            <Paper zDepth={2} className={css.header}>
              <h1>Biographies</h1>
            </Paper>
          </div>
          <div style={styles.root} className={css.flexMobile}>

            <GridList
              cellHeight={200}
              style={styles.gridList}>
              {biographies && biographies.map(tile => (
                <GridTile
                  key={tile.id}
                  title={tile.name}
                  subtitle={<span>details for user: <b>{tile.name}</b></span>}
                  actionIcon={<IconButton onTouchTap={() => this.props.pushState(null, `/biographies/${tile.id}`)}><ArrowForward color="white"/></IconButton>}
                >
                  <img src={tile.biometrics.leftImage} />
                </GridTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}
