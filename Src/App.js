import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Firebase from './Firebase/firebase';
import FirebaseContext from './Firebase/context';

import { Footer, Container, Copyright } from './Theme/theme';
import { Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap';

import SignIn from './Authentication/signin';
import SignUp from './Authentication/signup';
import Reset_pwd from './Authentication/Reset_pwd';

import { ProtectedRoutes } from './Components/ProtectedRoute';

import Console from './Admin/console';
import Customer from './Customer/Customer';
import Home from './Public/Home';
import HomeMenu from './Public/Menu/HomeMenu';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";



export default class App extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);

    this.state = {
      access_admin: localStorage.getItem('access_admin') ? localStorage.getItem('access_admin') : false,
      access_customer: localStorage.getItem('access_customer') ? localStorage.getItem('access_customer') : false,
      user_profile: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : [],
      user_profile_uid: localStorage.getItem('user_info_uid') ? localStorage.getItem('user_info_uid') : '',
      show_page: localStorage.getItem('show_page') ? localStorage.getItem('show_page') : '',
      First_user_info: [],
    }

    this.fireb = new Firebase()

    this.handleAdminLogin = this.handleAdminLogin.bind(this);
    this.handleCustomerLogin = this.handleCustomerLogin.bind(this);
    this.SignOut_handle = this.SignOut_handle.bind(this);
    this.changepage_handle = this.changepage_handle.bind(this);
    this.Order_change_page = this.Order_change_page.bind(this);

  }


  handleAdminLogin(user_profile) {
    localStorage.setItem('user_info_uid', user_profile[0]);
    localStorage.setItem('user_info', JSON.stringify(user_profile[1]));
    localStorage.setItem('access_admin', true);
    this.setState({ access_admin: true, show_page: '', First_user_info: user_profile }, () => { });

  }

  handleCustomerLogin(user_profile) {
    localStorage.setItem('user_info_uid', user_profile[0]);
    localStorage.setItem('user_info', JSON.stringify(user_profile[1]));
    localStorage.setItem('access_customer', true);
    this.setState({ access_customer: true, show_page: '', First_user_info: user_profile }, () => { });
  }


  changepage_handle(event) {

    event.persist();
    this.setState({
      show_page: event.target.name
    });
    localStorage.setItem('show_page', event.target.name);
  }

  SignOut_handle() {
    localStorage.clear();
  }

  Order_change_page() {
    localStorage.setItem('show_page', 'UserHistory');
    this.setState({
      show_page: 'UserHistory',
    });
  }

  render() {
    let { access_admin, access_customer, user_profile, show_page, user_profile_uid, First_user_info } = this.state;

    //console.log("version:1.0.1");

    //console.log("user_profile", user_profile);
    //console.log("user_profile_uid", user_profile_uid);

    let combine_user_info = [user_profile_uid, user_profile];
    if (user_profile_uid === '' || user_profile_uid === null) {
      combine_user_info = First_user_info;
    }


    return (
      <FirebaseContext.Provider>

        {access_admin || access_customer ? null : null}

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={Navbar_style} fixed="top">
          <Navbar.Brand href="/">
            <h3><Badge variant="secondary">EggRollChen</Badge></h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" name="HomePage" >Home</Nav.Link>
              <Nav.Link href="/homemenu" name="Menu" >Menu</Nav.Link>

              {access_admin ?
                <Nav.Link href="/console" name="Orders" onClick={this.changepage_handle}>Orders</Nav.Link>
                : null}

              {access_admin ?
                <Nav.Link href="/console" name="Setting" onClick={this.changepage_handle}>Setting</Nav.Link>
                : null}

              {access_admin ?
                <NavDropdown title="Customer View" id="collasible-nav-dropdown" >
                  <NavDropdown.Item href="/console" name="UserOrder" onClick={this.changepage_handle}>Customer Order Page</NavDropdown.Item>
                  <NavDropdown.Item href="/console" name="UserHistory" onClick={this.changepage_handle}>Customer History</NavDropdown.Item>

                </NavDropdown>
                : null}

              {access_customer ?
                <Nav.Link href="/customer" name="UserOrder" onClick={this.changepage_handle}>Order</Nav.Link>
                : null}
              {access_customer ?
                <Nav.Link href="/customer" name="UserHistory" onClick={this.changepage_handle}>History</Nav.Link>
                : null}


            </Nav>

            {access_admin || access_customer ?
              <Nav>
                <Nav.Link href="/" name="SignOut" onClick={this.SignOut_handle} >Sign Out</Nav.Link>
              </Nav> :
              <Nav>
                <Nav.Link href="/signin" name="SignIn" >Sign In</Nav.Link>
                <Nav.Link href="/signup" name="SignUp" >Sign Up</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>


        <BrowserRouter>
          <Switch>

            <Route exact path="/" render={
              (routeProps) => <Home {...routeProps} show_homepage={show_page} firebase={this.fireb} />}>
            </Route>
            <Route path="*" render={
              (routeProps) => <Home {...routeProps} show_homepage={show_page} firebase={this.fireb} />}>
            </Route>

            <Route exact path="/homemenu" render={
              (routeProps) => <HomeMenu {...routeProps} show_homepage={show_page} firebase={this.fireb} />}>
            </Route>
            <Route exact path="/resetpwd" render={(routeProps) => <Reset_pwd {...routeProps} firebase={this.fireb} />}></Route>
            <Route exact path="/signup" render={(routeProps) => <SignUp {...routeProps} firebase={this.fireb}
              handleAdminLogin={this.handleAdminLogin} handleCustomerLogin={this.handleCustomerLogin} />}></Route>
            <Route exact path="/signin" render={(routeProps) => <SignIn {...routeProps} firebase={this.fireb}
              handleAdminLogin={this.handleAdminLogin} handleCustomerLogin={this.handleCustomerLogin} />}></Route>
            {/*<Route render={() => <Redirect to="/" />} />*/}

            <ProtectedRoutes path='/console' component={Console} firebase={this.fireb} user_profile={combine_user_info}
              auth={access_admin} show_page={show_page} change_page={this.Order_change_page} />
            <ProtectedRoutes path='/customer' component={Customer} firebase={this.fireb} user_profile={combine_user_info}
              auth={access_customer} show_page={show_page} change_page={this.Order_change_page} />

          </Switch>
        </BrowserRouter>


        <Footer>
          <Container>
            <Copyright>EggRollChen. 715 Crowson Rd, Columbia, SC (803) 787-6820 <br /> Version 1.0.0 </Copyright>
          </Container>
        </Footer>


      </FirebaseContext.Provider>
    );








  }
}

const Navbar_style = {
  position: 'sticky',
  top: '0',
  fontSize: '1.5em',

}

//<Route path="/home/:id" render={(routeProps) => <Dailyform {...routeProps} db={this.fireb} />}></Route>
//<Route path="/qr" render={(routeProps) => <Test {...routeProps}  />}></Route>
//<Route path="/console" render={(routeProps) => <Console {...routeProps} db={this.fireb} />}></Route>
