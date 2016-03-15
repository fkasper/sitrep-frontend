import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
// import {isLoaded, load as loadArticles, loadSingle as loadArticle} from 'redux/modules/intellipedia';
import Helmet from 'react-helmet';
// import RaisedButton from 'material-ui/lib/raised-button';
// import Add from 'material-ui/lib/svg-icons/content/add';
// import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
// import { IntellipediaPagesEditForm } from 'components';
import {changeMenuMode} from 'redux/modules/menu';
import { updateSettings } from 'redux/modules/permissions';
import { pushState } from 'redux-router';
import { UserHandleEditorForm } from 'components';
// import colors from 'material-ui/lib/styles/colors';
// import Add from 'material-ui/lib/svg-icons/content/add';


// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';
// import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
// import IconButton from 'material-ui/lib/icon-button';
// import Paper from 'material-ui/lib/paper';


function fetchDataDeferred(getState, dispatch) {
  const promises = [];
  promises.push(dispatch(changeMenuMode(true, false)));
  return Promise.all(promises);
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data
  }),
  {updateSettings, pushState}
)
export default class New extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateSettings: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    settings: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.touchTimer = null;
  }


  render() {
    // const { article, user: {globalPermissions: { admin } } } = this.props;
    // const { articles, article, settings } = this.props;
    const {user} = this.props;
    const css = require('./Intellipedia.scss');
    // require the logo image both from client and server
    return (
      <div style={{height: '100%'}}>
        <Helmet title="Create Twitter Handle"/>
        <div style={{overflowY: 'auto'}} className={css.formatting}>
          <p style={{padding: '40px 40px 0px 40px'}}>You have to create a twitter alias before you can start using twitter!</p>
          <UserHandleEditorForm formKey="user" key="user" initialValues={user} onEditingDone={() => this.props.pushState(null, `/twitter`)}/>
        </div>
      </div>
    );
  }
}

// <Editor stateOnly value={article.content} onChange={() => {}} formKey={article.id}/>
