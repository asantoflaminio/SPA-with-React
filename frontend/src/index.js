import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import WebFont from 'webfontloader';

ReactDOM.render(<App/>, document.getElementById('root'));

WebFont.load({
  google: {
    families: ['Rubik']
  }
});