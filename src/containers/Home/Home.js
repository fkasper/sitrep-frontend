import React, { Component } from 'react';
import { IframeLoader } from 'components';
import Helmet from 'react-helmet';

export default class Home extends Component {


  render() {
    // require the logo image both from client and server
    return (
      <div style={{height: '100%', flex: 1}}>
      <Helmet title="Home"/>
        <div style={{height: '100%'}} className="home">
          <IframeLoader src="https://vatc.maps.arcgis.com/apps/webappviewer/index.html?id=6baf8f96bb71483095cc3d810c8fc293" style={{width: '100%', height: '100%', border: 0, margin: 0}}/>
        </div>
      </div>
    );
  }
}
