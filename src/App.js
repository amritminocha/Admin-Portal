import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Header from './components/Header/Header';
import Login from './containers/Login/Login';
import AdminAdd from './containers/AdminAdd/AdminAdd';
import Verify from './components/Verify';
import Home from './containers/Home/Home';
import Authenticate from './components/Authenticate/Authenticate';
import Test from './server/testPostAxios';
import Upload from './containers/Upload/Upload';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <Header />
            <Route exact path="/" component={Login} />
            <Route exact path="/Admin" component={AdminAdd} />
            <Route exact path="/send"><h1>Please go to your inbox to verify email</h1></Route>
            <Route exact path="/verify/:email/:id" component={Verify} />
            <Route exact path="/authentication/:phonenumber" component={Authenticate} />
            <Route exact path="/email-verification"><h1 Please firstly verify your email which has already been sent to your inbox /></Route>
            <Route exact path="/verifyPhone"><h1 Done /></Route>
            <Route exact path="/test" component={Test} />
          </div>
          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path="/home/upload" component={Upload} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
