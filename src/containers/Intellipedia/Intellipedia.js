import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {isLoaded, load as loadArticle} from 'redux/modules/intellipedia';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/lib/raised-button';
import Add from 'material-ui/lib/svg-icons/content/add';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import { IntellipediaPagesEditForm } from 'components';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  if (!isLoaded(state) && typeof state.router.params.subject !== 'undefined') {
    return dispatch(loadArticle(state.router.params.subject));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    article: state.intellipedia.data
  })
)
export default class Intellipedia extends Component {
  static propTypes = {
    user: PropTypes.object,
    article: PropTypes.object
  }

  componentWillMount() {

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
        label="Add Page"
        labelPosition="after"
        primary
        icon={<Add />}
        onTouchTap={() => {this.setState({open: true}); }}
        type="submit" />{ '  ' }
      <RaisedButton
        label="Edit Page"
        labelPosition="after"
        secondary
        icon={<Edit />}
        onTouchTap={() => {this.setState({open: true}); }}
        type="submit" />
    </div>);
  }
  editor() {
    const editPage = true;
    return (<div style={{overflowY: 'auto'}}>
      {(editPage) ? <div>
        <IntellipediaPagesEditForm
        formKey={'map'}
        key={'map'}
        initialValues={{}}/>
      </div> : <div></div>}
    </div>);
  }
  article() {
    return (<div style={{overflowY: 'auto'}}> </div>);
  }
  render() {
    const { article, user: {globalPermissions: { admin } } } = this.props;
    const styles = require('./Intellipedia.scss');
    // require the logo image both from client and server
    return (
      <div style={{height: '100%', flex: 1, position: 'relative'}}>
      {(admin) && this.adminToolbar()}

      <Helmet title="Intellipedia"/>
        <div>
          {article ? this.article() : <div className={styles.noSuchPageFound}>{this.editor()}</div>}
        </div>
      </div>
    );
  }
}
