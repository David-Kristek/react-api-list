import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { useGlobalContext } from './context';

import AppContainer from "./components/AppContainer";
import Home from "./pages/Home";
import Add from "./pages/tasks/Add";
import Edit from "./pages/tasks/Edit";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/admin/AdminPage"; 
import UserInfo from "./pages/admin/UserInfo";

function App() {
  const { title, token } = useGlobalContext(); 
  const [redirect, setRedirect] = useState("");
  const guest = () => {
    console.log("ahoj");
  }
  return (
    <Router>
        <Switch>
      <AppContainer title={title} >
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/edit/:id">
            <Edit />
          </Route>

          <Route exact path="/login" render={guest()}>
            <Login />
          </Route>
          <Route exact path="/register" render={guest()}>
            <Register />
          </Route>

          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route path="/admin/user/:id">
            <UserInfo />
          </Route>
      </AppContainer>
      
          <Route path="*">
            <p className="text-danger">Nothings!</p>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
