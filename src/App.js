import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useGlobalContext } from './context';

import AppContainer from "./components/AppContainer";
import Home from "./pages/Home";
import Add from "./pages/tasks/Add";
import Edit from "./pages/tasks/Edit";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { title } = useGlobalContext(); 
  return (
    <Router>
      <AppContainer title={title} >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <p className="text-danger">Nothings!</p>
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
