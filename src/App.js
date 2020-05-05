import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/auth/layout/NavBar";
import Dashboard from "../src/components/profile/Dashboard";
import ViewConnection from "./components/connections/ViewConnection";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile/CreateProfile";
import UserProfile from "./components/profile/UserProfile";
import Admin from "./components/admin/AdminPage";
// import Admin2 from "./components/admin/AdminPage2";

// import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/profile/:id" component={ViewConnection} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/create" component={CreateProfile} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/admin" component={Admin} />
            {/* <Route path="/admin2" component={Admin2} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
