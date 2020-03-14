import React from "react";
import NavBar from "./components/NavBar";
import LNav from "./Logged/LNav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Welcome from "./views/Welcome";
import Expenses from "./Logged/Expenses";
import AddExp from "./Logged/AddExp";
import Profile from "./Logged/Profile";
import About from "./views/About";
import Register from "./views/Register";
import Style from "./StyledComponents/CenterStyle";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Style>
          <Switch>
            <Route
              className="sticky-top"
              exact
              path="/"
              component={NavBar}
            ></Route>
            <Route
              className="sticky-top"
              path="/views"
              component={NavBar}
            ></Route>
            <Route
              className="fixed-top"
              path="/Logged"
              component={LNav}
            ></Route>
          </Switch>
          <Switch>
            <Route exact path="/" component={Welcome}></Route>
            <Route path="/views/Welcome" component={Welcome}></Route>
            <Route path="/views/About" component={About}></Route>
            <Route path="/views/Login" component={Login}></Route>
            <Route path="/views/Register" component={Register}></Route>
            <Route path="/Logged/Profile" component={Profile}></Route>
            <Route path="/Logged/Expenses" component={Expenses}></Route>
            <Route path="/Logged/AddEx" component={AddExp}></Route>
          </Switch>
        </Style>
      </div>
    </BrowserRouter>
  );
}

export default App;
