import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Link, Switch, Router, useHistory, useParams } from 'react-router-dom'
import data from './data.js';
import profileImg from './기본프로필이미지.jfif';
import { faBars, faPlus, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  let [todos, todosEdit] = React.useState(data); 
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          React TodoList
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/Upload">
          <Upload></Upload>
        </Route>
        <Route path="/detail/:id">
          <Detail></Detail>
        </Route>
        <Route path="/">
          <Main todos={ todos }>
          </Main>
        </Route>
      </Switch>
    </div>
  );
}

function Main(props) {
  let history = useHistory();
  return(
    <>
      <div className="container_main">
        <nav className="nav">
          <FontAwesomeIcon icon={ faBars }/>
          <FontAwesomeIcon icon={ faPlus } />
        </nav>

        <section className="profile_img">
          <img src={ profileImg }>
          </img>
        </section>
        <section className="profile_info">
          <h2 style={ { margin: 0 } }>
            KIM HYUK JOONG
          </h2>
          <p style={ { margin: 0 } }>
            Dongubak.github
          </p>
        </section>
          
        <main className="todos">
          {
            props.todos.map( e => {
              return(
                <div className="element" onClick={ () => {
                  history.push(`/detail/${ e.id }`)
                } }>
                  <div className="circle">
                    <FontAwesomeIcon icon={ faCircleDot } />
                  </div>
                  <div className="content">
                    { e.content }
                  </div>
                </div>
              )
            })
          }
        </main>
      </div>
    </>
  )
}

function Upload(props) {
  return(
    <div>
      업로드 페이지
    </div>
  )
}

function Detail(props) {
  let { id } = useParams();
  return(
    <div className="detail">
      
    </div>
  )
}

export default App;
