import React from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import HomePage from './HomePage'
import Login from './Login'
import Register from './Register'
import RestaurantManage from './RestaurantManage'
import LandingPage from './LandingPage'
function App() {
  return (
    <HashRouter>
      <Route path='/' exact component={HomePage}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path="/landing/r/:rid/d/:did" component={LandingPage}></Route>
    </HashRouter>
  );
}
export default App;
