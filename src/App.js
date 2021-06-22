import './App.css';
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';
import UserInfo from './components/User/UserInfo.js';
import Booking from './components/Booking/Booking.js';
import Checkout from './components/Booking/Checkout.js';
import Login from './components/Login/Login.js';
import MyBookings from './components/Booking/MyBookings.js';

class App extends Component {

  onSubmit = (event) => {
    window.sessionStorage.setItem("bookingType", event);
    window.location.href = '/booking'
  };

  render() {
    const url = window.location.href
    const lastIndex = url.lastIndexOf('/')
    const isLoginPage = url.includes('login') || url.substring(lastIndex + 1) === '';
    return (
      <div>
        <BrowserRouter>
          {
            !isLoginPage &&
            <h1 style={{ textAlign: 'left', color: 'white', backgroundColor: 'black', marginBottom: '0' }}>
              Deloitte<text style={{ color: 'green', font: 'bold', marginLeft: '10' }}>.</text>
              <Link to='/home' style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>Home</Link>
              <Link to='/myInfo' style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>My Account</Link>
              <Link to='/myBookings' style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>My Booking</Link>
              <Link to='/booking' onClick={() => this.onSubmit('Event')} style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>Events</Link>
              <Link to='/booking' onClick={() => this.onSubmit('Play')} style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>Plays</Link>
              <Link to='/booking' onClick={() => this.onSubmit('Activity')} style={{ marginLeft: '20px', color: 'white', backgroundColor: 'black', fontSize: '20px', fontFamily: 'Times New Roman', fontSize: 'medium' }}>Activities</Link>
            </h1>
          }
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Layout} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact strict path="/myInfo" component={UserInfo} />
            <Route exact strict path="/booking" component={Booking} />
            <Route exact strict path="/checkout" component={Checkout} />
            <Route exact strict path="/myBookings" component={MyBookings} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
