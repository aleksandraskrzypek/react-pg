import React from 'react'
import "./ToDoList.css"
import logout from "./Vector.svg"
import logoutArrow from "./Vector2.svg"
import {useState, useEffect} from "react"
import axios from "axios"
import Form from "./Form.jsx";
import {token2} from "./Login";
//import { useHistory } from 'react-router-dom'


function ToDoList() {

const [showText, setShowText] = useState(false);
const [showTextEdit, setShowTextEdit] = useState(false)
const onClick = () => setShowText(true);
const onClickClose = () => setShowText(false); 
const onClickCloseEdit = () => setShowTextEdit(false)
const [todos, setTodos] = useState([]);
const [lists, setLists] = useState({listName: "", task: [{nametask: "", isDone: false}]});
const [id, setId] = useState();
const [listImport, setListImport] = useState([]);
const [dynamic, setDynamic] = useState("")
const [nameListImport, setNameListImport] = useState('')
const [taskImport, setTaskImport]= useState([])
//let history=useHistory();
// console.log({token2})

const toggleComplete = i =>
  setTodos(
    todos.map(
      (todo, k) =>
        k === i
          ? {
            ...todo,
            isDone: !todo.isDone
           }
          : todo,
    )
  );

const handleChangeListName = e => {
  const {name, value} = e.target;
    setLists(prevState => ({
      ...prevState,
      [name]: value
    }));
};

const handleChangeIsDone = (isDone) => {
  //   lists.task.isDone = isDone;

  console.log(lists.task.isDone)
};

const handleChangeTaskName = (name) => {
  // lists.task[0].nametask = text;

  console.log(lists.task.nametask)
  console.log(lists.task.isDone)

  console.log(lists.task)
  console.log(todos)
}

const handleSave = () => {

  axios.defaults.headers.common={'Authorization': `bearer ${token2}`}
  axios.post('https://recruitment.ultimate.systems/to-do-lists',{
    name: lists.listName,
    task: todos
  })
  .then(function (response) {
    console.log(response);
    console.log(response.status);
  })
  .catch(function (error) {
    console.log(error);
  });
}


useEffect (() => {
  loadDataOnlyOnce();
},[] );

const loadDataOnlyOnce = () => {
  
  axios.defaults.headers.common={'Authorization': `bearer ${token2}`}
  axios.get('https://recruitment.ultimate.systems/to-do-lists',{


  })
  .then(function (response) {
          
    console.log(response)
    console.log(response.data.length)

    setListImport(response.data)
    console.log(listImport)
   })
    .catch(function (error) {
      console.log(error);
    });
}
    

const loadDataOnlyOnce2 = () => {
  axios.defaults.headers.common={'Authorization': `bearer ${token2}`}
  axios.get('https://recruitment.ultimate.systems/to-do-lists/' + `${id}`,{
})
  .then(function (response) {
    //   console.log(response.data);
    setNameListImport(response.data.name);

    setTaskImport(response.data.task);
    //    console.log(taskImport)
    //    console.log(response.data.task[0].name);
  })
  .catch(function (error) {
    console.log(error);
  });
}
      


const handleEdit = (result) => {

  setId(result)
  setShowTextEdit(true);
  console.log(id);
  loadDataOnlyOnce2()
}

const handleUpdate = () => {
  axios.defaults.headers.common={'Authorization': `bearer ${token2}`}
  axios.put('https://recruitment.ultimate.systems/to-do-lists/' + `${id}`,{
    name: nameListImport,
    task: todos
    })
    .then(function (response) {
          
      console.log(response);
      setNameListImport(response.data.name);
      //    console.log(response.data.task[0].name);

      })
      .catch(function (error) {
        console.log(error);
      });
}

const handleDelete = () => {
  axios.defaults.headers.common={'Authorization': `bearer ${token2}`}
  axios.delete('https://recruitment.ultimate.systems/to-do-lists/' + `${id}`,{
    name: nameListImport,
    task: todos
    })
    .then(function (response) {
          
    console.log(response);
    setNameListImport(response.data.name);
    //    console.log(response.data.task[0].name);

    })
    .catch(function (error) {
      console.log(error);
    });
}
     










/////////////

      //div, ktory obsluguje edytowanie listy

  const TextEdit = () =>  
    <div>
      <div className="blurowanie">
      </div>
      <div className="add-new-list">
        <input 
          className="input-list-name"
          placeholder="List name"
          type="text"
          value={nameListImport}
          onChange={e => setNameListImport(e.target.value)}
          name="listName"
          autoFocus
        />

          <div className="add-new-list-line">
          </div>

          <div className="place-for-new-tasks">
 
            <div>
              {todos.map(({ name, isDone }, i) => (
                <div
                  key={name}
                  onClick={() => toggleComplete(i)}
                  className="checkbox-text"
                >
                  <div className="new-task-input">
                    <input 
                      className="input-checked"
                      type="checkbox"
                      checked = {isDone}
                      onChange = {handleChangeIsDone(isDone)}
                      readOnly
                    />
                    <span className="checkmark"></span>
                  </div>
                    <div className="place-for-new-task">
                      {handleChangeTaskName(name)} 
                      {name}
                    </div>
                </div>
              ))}


              {taskImport.map((anObjectTask, i) => (

                <div className="checkbox-text">
                  <div className="new-task-input">
                    <input 
                      key={`${anObjectTask.isDone}`}
                      className="input-checked"
                      type="checkbox"
                      checked = {anObjectTask.isDone}
                      // onChange = {handleChangeIsDone(isDone)}
                      readOnly
                    />
                    <span className="checkmark"></span>
                  </div>
                  <div className="place-for-new-task">
                    <p key={`${anObjectTask.name}`}>{anObjectTask.name}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="new-todos">
            <Form
              onSubmit={name => setTodos([{ name, isDone: false }, ...todos])}
            />
          </div>
    
          <div className="buttons-add-cancel">
            <button onClick={handleDelete} type="button" className="button-cancel-from-task"><p>CANCEL</p></button>
            <button  type="submit" className="button-add-from-task"><p>ADD</p></button>
          </div>

          <div className="buttons-add-new-list">
            <button type="button" className="button-cancel" onClick={onClickCloseEdit}><p>CANCEL</p></button>
            <button type="button" className="button-save" onClick={handleUpdate}><p>SAVE</p></button>
          </div>
      </div>
    </div>

///////////////
      




    //div, ktory obsluguje dodawanie nowej listy
  const Text = () =>  
    <div>
      <div className="blurowanie">
      </div>
      <div className="add-new-list">
        <input 
          className="input-list-name"
          placeholder="List name"
          type="text"
          value={lists.listName}
          onChange={handleChangeListName}
          name="listName"
          autoFocus
        />

        <div className="add-new-list-line">
        </div>

        <div className="place-for-new-tasks">
 
          <div>
            {todos.map(({ name, isDone }, i) => (
              <div
                key={name}
                onClick={() => toggleComplete(i)}
                className="checkbox-text"
              >
                <div className="new-task-input">
                  <input 
                    className="input-checked"
                    type="checkbox"
                    checked = {isDone}
                    onChange = {handleChangeIsDone(isDone)}
                    readOnly
                  />
                  <span className="checkmark"></span>
                </div>
                <div className="place-for-new-task">
                  {handleChangeTaskName(name)} 
                  {name}
                </div>
              </div>
            ))}
          </div>


        </div>


        <div className="new-todos">
          <Form
            onSubmit={name => setTodos([{ name, isDone: false }, ...todos])}
          />
        </div>
    
        <div className="buttons-add-cancel">
          <button onClick={() => setTodos([])} type="button" className="button-cancel-from-task"><p>CANCEL</p></button>
          <button  type="submit" className="button-add-from-task"><p>ADD</p></button>
        </div>

        <div className="buttons-add-new-list">
          <button type="button" className="button-cancel" onClick={onClickClose}><p>CANCEL</p></button>
          <button type="button" className="button-save" onClick={handleSave}><p>SAVE</p></button>
        </div>
      </div>
    </div>

  return (
    <div>
      <div className="wylogowanie">
        <div className="logout-door">
          <img src={logout} alt="Logout"/>
        </div>
        <div className="logout-arrow">
            <img src={logoutArrow} alt="LogoutArrow"/>
        </div>
      </div>
        {showText ? <Text /> : null }
        {showTextEdit ? <TextEdit /> : null}
        <div className="todo-list">
          <form className='search'>
            <input 
              type="text"
              className='search-input'
              placeholder="Search"
              value={dynamic}
              onChange={e => setDynamic(e.target.value)}
            />
            <select 
              className='select-input'
              placeholder="Sort By"
              name= "sortBy"
            >
              <option>Sort By</option>
              <option value="aToZ">A to Z</option>
              <option value="zToA">Z to A</option>
            </select>
          </form>

          {listImport.filter((anObject) => {
            if(dynamic === "") {
              return anObject
            }else if (anObject.name.toLowerCase().includes(dynamic.toLowerCase())){
              return anObject
            }
            }).map((anObject, i) => (
              <div className="todo-element" onClick={() => handleEdit(anObject.id)} >
                <div className="todo-element-name">
                  <p key={`${anObject.name}`}>{anObject.name}</p>
                </div>
                <div className="todo-element-created">
                  <p key={`${anObject.created_at}`}>{anObject.created_at}</p>
                </div>
                <div className="todo-element-complated">
                  <p key={`${anObject.task.length}`}>
                  All:{anObject.task.length}</p>
                </div>
                
              </div>
           ))}
        
          <div className="new-todo" onClick={onClick}>
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
          anObject.id
        </div>
      </div>
    )
}






export default ToDoList
