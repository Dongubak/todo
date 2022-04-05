import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Link, Switch, Router } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={ logo }
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/">
          <Main></Main>
        </Route>
        <Route path="/Upload">
          
        </Route>
        <Route path="/:detail">
          
        </Route>
      </Switch>
      
    </div>
  );
}

function Main(props) {
  return(
    <div>
      메인페이지
    </div>
  )
}

export default App;
