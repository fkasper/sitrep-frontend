import { Styles } from 'material-ui';
const Colors = Styles.Colors;
export default {
  singleTitle: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: '1px solid #e5e5e5',
    fontSize: 30,
    fontWeight: 'normal',
    color: '#333333',
    lineHeight: '1.3'
  },
  singleTitleA: {
    color: '#333333',
    textDecoration: 'none'
  },
  singleInfo: {
    marginBottom: 30
  },
  singleInfoLeft: {
    color: '#aaaaaa',
    fontStyle: 'italic',
    fontSize: 12,
    marginBottom: 10
  },
  mainNews: {
    color: '#737373',
    fontSize: 15,
    lineHeight: '1.7',
    textAlign: 'justify'
  },
  flexWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  flexLayoutWrapper: {
    width: 1100
  },
  flexSpace: {
    justifyContent: 'space-between',
    display: 'flex'
  },
  topBar: {
    backgroundColor: '#f1f1f1',
    height: 35
  },
  info: {
    marginTop: 15,
    fontSize: 13
  },
  breadcrumbs: {
    color: '#333'
  },
  socialLink: {
    padding: '3px 10px',
    lineHeight: '18px',
    display: 'inline-block',
    backgroundColor: '#e8e8e8',
    color: '#737373',
    marginRight: 1,
    transition: '0.2s background-color'
  },
  logo: {
    paddingTop: 30,
    height: 130
  },
  menuBar: {

  },
  menu: {
    paddingLeft: 0,
    marginBottom: 0,
    listStyle: 'none',
    display: 'flex'
  },
  menuItem: {
    flex: 1,
    backgroundColor: '#555555',
  },
  adminMenuItem: {
    backgroundColor: Colors.amber700
  },
  menuLink: {
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: '21px',
    padding: '8px 10px',
    borderRadius: 0,
    width: '100%',
    display: 'block',
    textDecoration: 'none'
  },
  sectionCategory: {
    marginBottom: 40,
  },
  sliderNews: {
    width: '100%',
    marginBottom: 40,
  },
  sectionName: {
    borderTop: '2px solid #000000',
    paddingTop: 10,
    marginBottom: 25,
    fontFamily: '"Roboto", serif',
    fontSize: '18',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  pullLeft: {
    float: 'left'
  },
  pullRight: {
    float: 'right'
  },

  caption: {
    position: 'relative',
    height: 355,
    padding: 30,
    backgroundColor: '#000000',
    color: '#ffffff',
    zIndex: 2
  },
  captionTitle: {
    fontSize: 30,
    fontWeight: 300,
    lineHeight: '1.2',
    marginBottom: 10
  },
  captionInfo: {
    color: '#8d8d8d',
    fontStyle: 'italic',
    fontSize: 11,
    marginBottom: 10
  },
  newsImage: {
    display: 'block',
    maxWidth: '100%',
    height: 355,
    width: '100%',
    transition: 'transform 0.5s cubic-bezier(0.49, -0.01, 0.42, 0.81)'
  },
  margTop: {
    marginTop: 20
  },
  gridOneThird: {
    width: '33.333333333%',
    paddingLeft: 30
  },
  unstyledList: {
    paddingLeft: 0,
    listStyle: 'none',
  },
  latestNewsTitle: {
    fontSize: 16,
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500'
  },
  latestNewsInfo: {
    color: '#aaaaaa',
    fontStyle: 'italic',
    fontSize: 11,
    marginTop: 6
  },
  actions: {
    backgroundColor: Colors.amber700
  },
  carouselItems: {
    marginTop: 5
  },
  carouselItem: {
    width: '33.333333333333333333%',
    padding: 0,
    paddingRight: 5
  },
  carouselThumb: {
    position: 'relative',
    float: 'left',
    width: '100%',
    cursor: 'pointer',
    height: 154,
    paddingLeft: 0,
    marginBottom: 0,
    overflow: 'hidden'
  },
  carouselCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'bold',
    color: '#fff',
    transition: 'all 0.25s'
  },
  latestNewsItem: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottom: '1px solid #e5e5e5'
  }

};
