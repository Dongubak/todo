import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Link, Switch, Router, useHistory, useParams } from 'react-router-dom'
import data from './data.js';
import profileImg from './기본프로필이미지.jfif';
import { faBars, faPlus, faCircleDot, faPenToSquare, faTrashCan, faWrench, faCheck, faHouse, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  let [todos, todosEdit] = useState(data);
  let [text, textEdit] = useState('');
  let [todosCount, todosCountEdit] = useState(0);
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <Link to="/" className="navBar_header">
              React TodoList
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/">
          <Main todos={ todos } todosEdit={ todosEdit } textEdit={ textEdit } text={ text } todosCount={todosCount} todosCountEdit={todosCountEdit}>
          </Main>
        </Route>
      </Switch>
    </div>
  );
}

function Main(props) {
  let history = useHistory();
  let { id } = useParams();
  let todos = props.todos;
  let todosEdit = props.todosEdit;
  let text = props.text;
  let textEdit = props.textEdit;
  let todosCount = props.todosCount;
  let todosCountEdit = props.todosCountEdit;
  let [onOff, onOffEdit] = useState(false);
  let [deleteIndex, deleteIndexEdit] = useState(0);
  let [checkIndex, checkIndexEdit] = useState(0);
  return(
    <>
      <div className="container_main">
        <nav className="nav">
          <div className="icons_left">
            <FontAwesomeIcon icon={ faBars }/>
            <FontAwesomeIcon icon={ faHouseUser } className="home" onClick={ () => {
              history.push('/');
            } }/>
          </div>
          <div className="icons_right">
            {
              onOff ? 
              <>
                <FontAwesomeIcon icon={ faWrench } onClick={ () => {
                  console.log(todos);
                }}/>
                <FontAwesomeIcon icon={ faCheck } onClick={ () => {
                  let copy = [...todos];
                  copy[checkIndex].completed = true;
                  todosEdit(copy);
                } }/>
                <FontAwesomeIcon icon={ faPenToSquare } className="pen"/>
                <FontAwesomeIcon icon={ faTrashCan } className="trash" onClick={ () => {
                  let copy = [...[...todos].slice(0, deleteIndex), ...[...todos].slice(deleteIndex + 1)];
                  todosEdit(copy);
                  history.push('/')
                }}/>
              </> : 
              <>
                <div style={ { width: '25px', height: '25px'} }></div>
                <div style={ { width: '25px', height: '25px'} }></div>
                <div style={ { width: '25px', height: '25px'} }></div>
                <div style={ { width: '25px', height: '25px'} }></div>
              </>
            }
            <FontAwesomeIcon icon={ faPlus } onClick={ () => {
              history.push('/Upload');
            } } className="plus"/>
          </div>
        </nav>

        <section className="profile_img">
          <img src={ profileImg } alt="profileImage">
          </img>
        </section>
        <section className="profile_info">
          <h2 style={ { margin: 0 } }>
            Dongubak
          </h2>
          <p style={ { margin: 0 } }>
            Dongubak.github
          </p>
        </section>
        
        <Switch>
          <Route path="/Upload">
            <Upload todosEdit={ todosEdit } todos={ todos } text={text} textEdit={textEdit} todosCount={todosCount} todosCountEdit={todosCountEdit}></Upload>
          </Route>

          <Route path="/detail/:id">
            <Detail todosEdit={ todosEdit } todos={ todos } text={text} textEdit={textEdit} onOff={onOff} onOffEdit={onOffEdit} deleteIndexEdit={deleteIndexEdit} checkIndexEdit={ checkIndexEdit }>           
            </Detail>
          </Route>
          

          <Route path="/">
            <main className="todos">
              {
                todos.map( (e, i) => {
                  return(
                    <div className="element" onClick={ () => {
                      history.push(`/detail/${ e.id }`);
                    } } key={ i }>
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
          </Route>
        </Switch>

      </div>
    </>
  )
}

function Upload(props) {
  let todosEdit = props.todosEdit;
  let todos = props.todos;
  let text = props.text;
  let textEdit = props.textEdit;
  let todosCount = props.todosCount;
  let todosCountEdit = props.todosCountEdit;
  return(
    <UploadForm todosEdit={ todosEdit } todos={ todos } text={text} textEdit={textEdit} todosCount={todosCount} todosCountEdit={todosCountEdit}></UploadForm>
  )
}

function UploadForm(props) {
  let todosEdit = props.todosEdit;
  let todos = props.todos;
  let text = props.text;
  let textEdit = props.textEdit;
  let todosCount = props.todosCount;
  let todosCountEdit = props.todosCountEdit;
  let history = useHistory();
  function uploadSubmit(e) {
    e.preventDefault();
    let uploadData = {
      id: todosCount,
      content: text,
      completed: false,
    };
    let copy = [...todos, uploadData];
    todosEdit(copy);
    todosCountEdit(todosCount + 1);
    history.push('/');
  }
  return(
    <form onSubmit={ uploadSubmit } className="upload_container">
      <input type="text" onChange={ e => {
        textEdit(e.target.value);
      }} placeholder="할일 입력하기" autoFocus></input>
      <button type="submit">Add</button>
    </form>
  )
}

function Detail(props) {
  let { id } = useParams();
  let history = useHistory();
  let todosEdit = props.todosEdit;
  let todos = props.todos;
  let text = props.text;
  let textEdit = props.textEdit;
  let onOff = props.onOff;
  let onOffEdit = props.onOffEdit;
  let deleteIndexEdit = props.deleteIndexEdit;
  let checkIndexEdit = props.checkIndexEdit;
  let index = todos.findIndex( e => e.id === Number(id));
  let item = todos.find( e => e.id === Number(id));

  useEffect(() => {
    onOffEdit(true);
    deleteIndexEdit(index);
    checkIndexEdit(index);
    return () => { onOffEdit(false) }
  },[])

  return(
    <div className="detail">
      <h2>{ item.content }</h2>
      {
        item.completed ? 
        <h3 className="completed">완료!</h3> :
        <h3 className="uncompleted">미완료!</h3>
      }
    </div>
  )
}

export default App;
