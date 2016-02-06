import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import * as widgetActions from 'redux/modules/widgets';
import {isLoaded, load as loadArticle} from 'redux/modules/likes';
// import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import Helmet from 'react-helmet';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  if (!isLoaded(state) && state.router.params.article !== 'undefined') {
    return dispatch(loadArticle(state.router.params.article));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    user: state.auth.user,
    counts: state.likes,
    article: state.likes.data.story
  })
)
export default class Article extends Component {

  static propTypes = {
    user: PropTypes.object,
    routeParams: PropTypes.object,
    article: PropTypes.object,
    counts: PropTypes.object // https://graph.facebook.com/fql?q=select%20%20like_count%20from%20link_stat%20where%20url=%22http://yoast.com%22
  };

  state = {
    message: '',
    story: {},
    loading: true,
    counts: {
      fbLikeCount: '-',
      twitterLikeCount: '-',
      hackerNewsCount: '-',
      googleLikeCount: '-'
    }
  };

  componentDidMount() {
    if (socket && this.props) {
      const { article } = this.props.routeParams;
      socket.on('likeCount', this.onLikeUpdate);
      setTimeout(() => {
        socket.emit('getLikeCount', { name: article });
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('likeCount', this.onLikeUpdate);
    }
  }

  onLikeUpdate = (data) => {
    const merge = this.state.counts;
    this.setState({counts: Object.assign(merge, data.counts)});
  }

  render() {
    const styles = require('./Article.scss');
    // const {user} = this.props;
    // console.log(this.props.)
    const { title, content, authorName, subtitle, image, published } = this.props.article;
    // const fbLikeCount = 1;
    const { counts: { fbLikeCount, twitterLikeCount, hackerNewsCount, googleLikeCount }, loading } = this.state;
    return (
      <div>
      <Helmet title={title} description={subtitle} meta={[
        {'property': 'og:type', 'content': 'article'}
      ]}/>
      <header className={styles.hasImage} style={{ backgroundImage: `url(${image})` }} title={title}>
        <div className={styles.heroContent} >
          { title ? <h1 className={styles.postTitle} >{title}</h1> : '' }
  		  	{ subtitle ? <h2 className={styles.postSubtitle} >{subtitle}</h2> : '' }
        </div>

        <div className={styles.attribution}>
          <div className={styles.author} >
            <a className={`${styles.name} ${styles.inverse}`} rel="author" href="#">{authorName}</a>
          </div>
          <div className={styles.metadata} ><span>Published</span> {published} </div>
        </div>
      </header>
      <div className={styles.wrapperContent}>
        <div className={`${styles.entry} ${styles.formatting}`}>
          {content ? <div className={`${ loading ? 'loading' : 'loaded' }`} dangerouslySetInnerHTML={{__html: content}}></div> :
          <div className={styles.loading}>Loading story...</div>
        }
        </div>
      </div>
      <section className={`${styles.section}`}>
        <div className={`${styles.social} ${styles.socialFacebook}`}>
          <h1 className={`${styles.name}`}>
          Facebook
          </h1>
          <div className={`${styles.count}`}>{fbLikeCount}</div>
        </div>
        <div className={`${styles.social} ${styles.socialTwitter}`}>
          <h1 className={`${styles.name}`}>
          Twitter
          </h1>
          <div className={`${styles.count}`}>{twitterLikeCount}</div>
        </div>
        <div className={`${styles.social} ${styles.socialEmail}`}>
          <h1 className={`${styles.name}`}>
          Hacker News
          </h1>
          <div className={`${styles.count}`}>{hackerNewsCount}</div>
        </div>
        <div className={`${styles.social} ${styles.socialGooglePlus}`}>
          <h1 className={`${styles.name}`}>
          Google Plus
          </h1>
          <div className={`${styles.count}`}>{googleLikeCount}</div>
        </div>

      </section>
      <footer>© 2014—2016 <a href="http://xpandmmi.com">XPANDMMI</a></footer>
      </div>
    );
  }
}
