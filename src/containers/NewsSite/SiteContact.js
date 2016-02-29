import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
// import colors from 'material-ui/lib/styles/colors';
import Helmet from 'react-helmet';
import { ContactForm } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    settings: state.permissions.data,
  }),
  {pushState}
)
export default class SiteContact extends Component {
  static propTypes = {
    user: PropTypes.object,
    biography: PropTypes.object,
    stories: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    switchTrending: PropTypes.func.isRequired,
    settings: PropTypes.object,
    editing: PropTypes.object,
    params: PropTypes.object
  }

  render() {
    // const { settings, biography, user, user: {globalPermissions: { admin } } } = this.props;
    // const { editing, stories} = this.props;
    // const { editing } = this.state;
    // const css = require('./Style.scss');
    const styles = require('./Style.js');
    // const validStories = stories && stories.filter((item) => (!item.scheduled || (item.scheduled && (item.scheduledPostDate * 1000 < (new Date()).getTime()))) ).sort((ab, ba) => ba.scheduledPostDate - ab.scheduledPostDate);

    return (<div>
      <div style={styles.bodyContentInner}>
        <Helmet title={`Contact`}/>

        <div style={{...styles.flexWrapper, ...styles.margTop}}>
          <div style={{...styles.sectionCategory, width: '100%'}}>
            <div style={styles.sectionName}>
              <div style={{color: '#333'}}>Contact</div>
            </div>
            <div style={styles.sectionContent}>
              <ContactForm formKey={'contact'} sKey={''} initialValues={{}} />
            </div>
          </div>
        </div>

      </div></div>
    );
  }
}

// <Link to={`/news-site/${siteId}/${item.id}`} style={{...styles.latestNewsTitle}}>{item.title}</Link>
// <div style={styles.latestNewsInfo}>Posted {moment(item.scheduledPostDate * 1000).fromNow()}</div>
