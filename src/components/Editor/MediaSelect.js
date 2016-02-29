import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {load as loadData, isLoaded} from 'redux/modules/uploads';
import * as uploadFuncs from 'redux/modules/uploads';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import config from '../../config';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import { UploadBlob } from 'components';
// import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
// import IconButton from 'material-ui/lib/icon-button';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  console.log('LOADING UPLOADS');
  if (!isLoaded(state)) {
    return dispatch(loadData());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    uploads: state.uploads.data,
    settings: state.permissions.data
  }), {
    ...uploadFuncs
  }
)
export default class MediaSelect extends Component {
  static propTypes = {
    component: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    uploads: PropTypes.array,
    load: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentWillMount() {
    this.props.load();
  }

  render() {
    const { uploads } = this.props;
    const { selectedUrl } = this.state;
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'auto'
      },
      gridList: {
        width: '100%',
        height: 400,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={() => {
          this.setState({open: false});
        }}
      />,
      <FlatButton
        label="Save"
        primary
        keyboardFocused
        onTouchTap={() => {
          this.props.onSelect(this.state.selectedUrl);
          this.setState({open: false});
        }}
      />,

    ];
    return (<div>
      <Dialog
          actions={actions}
          modal={false}
          style={{minWidth: '80%'}}
          title="Add Media"
          open={this.state.open}>
        <div style={styles.root}>
        <div style={{width: '100%', height: '30px'}}>
          <UploadBlob accept="*/*" dimensionsW="100%" dimensionsH="100%" fileKey="upload" events={{
            onChange: (evnt) => {
              this.props.onSelect(evnt.value.upload);
              this.setState({open: false});
            },
            value: {
              upload: null
            }
          }} /></div>
          <GridList
            style={styles.gridList}
            cols={6}
            cellHeight={120}
            padding={1}
          >
            {uploads && uploads.map(tile => (
              <div style={{border: ( (selectedUrl && selectedUrl === tile.extName) ? '3px solid #000' : '1px solid #333'), padding: 2, height: '100%'}}>
              <GridTile
                key={tile.extName}
                titlePosition="bottom"
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                title="Select"
                style={{cursor: 'pointer'}}
                onTouchTap={() => this.setState({selectedUrl: tile.extName})}
              >
                <div style={{width: '100%', height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundImage: `url(${config.apiProtocol}://${config.apiHost}:${config.apiPort}${config.apiPrefix}/uploads/${tile.extName})`}} />
              </GridTile>
              </div>
            ))}
          </GridList>
        </div>
      </Dialog>
    </div>);
  }
}

// <div style={{border: ('1px solid #333'), padding: 2, height: '100%'}}>
//   <GridTile
//     titlePosition="bottom"
//     titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
//     title="Drop to upload"
//     style={{cursor: 'pointer'}}
//   >
//     <div>

//     </div>
//   </GridTile>
// </div>


// <GridTile
//   titlePosition="bottom"
//   titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
//   title="Select"
//   style={{cursor: 'pointer'}}
// >
//   <UploadBlob accept="*/*" dimensionsW="100%" dimensionsH="100%" fileKey="upload" events={{
//     onChange: (evnt) => {
//       this.props.onSelect(evnt.value.upload);
//       this.setState({open: false});
//     },
//     value: {}
//   }} />
// </GridTile>
