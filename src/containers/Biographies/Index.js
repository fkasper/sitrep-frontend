import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadBiographies} from 'redux/modules/biographies';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/lib/raised-button';
import Add from 'material-ui/lib/svg-icons/content/add';
import CircularProgress from 'material-ui/lib/circular-progress';


import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import IconButton from 'material-ui/lib/icon-button';
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
    biographies: state.biographies.data,
    loading: state.biographies.loading
  }),
  {pushState}
)
export default class Index extends Component {
  static propTypes = {
    user: PropTypes.object,
    biographies: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    loading: PropTypes.bool
  }

  constructor(params) {
    super(params);

    this.state = { mobaSize: 0 };
  }
  componentWillMount() {}

  componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.getHeight.bind(this, null));
      this.getHeight();
    }
  }

  componentWillUnmount() {
    if (window) window.removeEventListener('resize', this.getHeight.bind(this, null));
  }

  getHeight() {
    if (window) this.setState({mobaSize: (window.innerWidth > 768) ? 5 : 2});
  }

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
        secondary
        icon={<Add />}
        onTouchTap={() => this.props.pushState(null, '/biographies/new')}
        type="submit" />{ '  ' }
    </div>);
  }

  render() {
    const { mobaSize } = this.state;
    const { loading, biographies, user: {globalPermissions: { admin } } } = this.props;
    const css = require('./Bio.scss');
    const bgCenter = require('./bg_center.png');
    // require the logo image both from client and server
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundImage: 'url(' + bgCenter + ')'
      },
      gridList: {
        width: '100%',
        height: 'calc(100% - 89px)',
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
            <div className={css.header}>
              <h1>Biographies</h1>
            </div>
          </div>
          <div style={styles.root} className={css.flexMobile}>
          {loading && <CircularProgress />}
            <GridList
              cellHeight={200}
              cols={mobaSize}
              style={styles.gridList}>
              {biographies && biographies.map(tile => (
                <GridTile
                  key={tile.id}
                  title={tile.name}
                  className={css.moba}
                  subtitle={<span>details for user: <b>{tile.name}</b></span>}
                  actionIcon={<IconButton onTouchTap={() => this.props.pushState(null, `/biographies/${tile.id}`)}><ArrowForward color="white"/></IconButton>}
                >
                  <img src={tile.biometrics.center_portrait} />
                </GridTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}
