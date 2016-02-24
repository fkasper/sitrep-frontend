const bgCenter = require('./bg_center.png');

export default {
  root: {
    height: '100%',
    display: 'flex',
  },
  gridList: {
    width: '100%',
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
  gridSingle: {
    maxWidth: '300px',
    minWidth: '250px',
    minHeight: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ebebeb'
  },
  gridDouble: {
    position: 'relative',
    boxShadow: `inset 0 0 2px`,
    minHeight: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(' + bgCenter + ')'
  },
  horizontalGridElement: {
    flex: 1
  },
  image: {
    width: 80,
    height: 80,
    margin: 2,
    marginTop: 5,
    display: 'block',
    boxShadow: '0 0 10px rgba(28,36,43,.2)',
    borderRadius: 5,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  smallImage: {
    maxWidth: '25%',
    margin: 2,
    marginTop: 5,
    display: 'block',
    boxShadow: '0 0 10px rgba(28,36,43,.2)',
    borderRadius: 5
  },
  largeImage: {
    width: 120,
    height: 120,
  },
  imageStyle: {
    width: '100%'
  },
  iframe: {
    width: '100%',
    height: 200
  },
  flexTags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5,
    borderBottom: '1px solid #dedede',
    margin: 5
  },
  userDescription: {
    padding: 10
  },
  tab: {
  },
  fixedTitle: {
    display: 'block',
    width: '100%',
    padding: '9px 0 0 0',
    textAlign: 'center',
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: 13
  },
  rootBlock: {
    height: '100%'
  },
  button: {
    cursor: 'pointer'
  }
};
