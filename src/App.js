import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

import Root from './containers/Root';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container id="app-container">
        <Root />
      </Container>
    );
  }
}

export default App;
