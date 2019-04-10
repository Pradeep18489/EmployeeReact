import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider as ReduxProvider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import reducer from "./reducers/index";
import './App.css';
import Employee from './components/Employee/employee';
import thunk from 'redux-thunk';
import EmployeeForm from './components/Employee/EmployeeForm';

let store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="container">
      <ReduxProvider store={store}>
      <Switch>
              <Route path="/add" component={EmployeeForm} />
              <Route path="/update/:id" component={EmployeeForm} />
              <Route path="/" component={Employee} />
            </Switch>  
      </ReduxProvider>  
      </div>
    );
  }
}

export default App;
