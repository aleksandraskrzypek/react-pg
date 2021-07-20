import './App.css';
import Login from "./Login.js"
import NewAccount from "./NewAccount"
import ToDoList from "./ToDoList.js"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <div className="app">
      <div className="logo">
        <p>ToDo-List</p>
      </div>
      <Router basename={window.location.pathname || ''}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/newAccount' component={NewAccount} />
          <Route exact path='/todoList' component={ToDoList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
