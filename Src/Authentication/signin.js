import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import * as firebase_users_action from '../Firebase/users';

import { Button, Form, Row, Col } from 'react-bootstrap';
import Phone_Auth from './phone_auth';


export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.NewUserInfo = new firebase_users_action.UserInformation();

    this.state = {
      redirect: null,
      userinfo: this.NewUserInfo,
      error: null,
      method: 'signinemail',
      show_phone_auth: false,
      confirmation: null,

    }

    //console.log(props.handleAdminLogin);

    this.signInWithEmailAndPasswordHandler = this.signInWithEmailAndPasswordHandler.bind(this);
    this.signInWithPhoneHandler = this.signInWithPhoneHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this._handle_signup = this._handle_signup.bind(this);
    this.signin_method_change = this.signin_method_change.bind(this);
    this.signIn_Handle = this.signIn_Handle.bind(this);
    this.Check_Input = this.Check_Input.bind(this);
 
    this.Verify_Process = this.Verify_Process.bind(this);


  }

  Check_Input() {
    let { method } = this.state;
    let { email, password, phone } = this.state.userinfo;

    if (method === 'signinemail') {

      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        this.setState({ error: 'Incorrect Email Format' });
        return false;
      }
      if (password.toString().length < 6) {
        this.setState({ error: 'Password should be at least 6 digits' });
        return false;
      }
    }
    else {
      //alert("Phone check");
      if (phone.toString().length < 10) {
        this.setState({ error: 'Phone number should be 10 digits' });
        return false;
      }
    }
    return true;
  }

  signIn_Handle(e) {
    e.preventDefault();
    //e.persist();
    if (this.Check_Input()) {
      let { method, userinfo } = this.state;
      if (method === 'signinemail') {
        this.signInWithEmailAndPasswordHandler();
      }
      else {
        //this.signInWithPhoneAAndPasswordHandler();
        //this.setState({ show_phone_auth: true, confirmation: confirmationResult });
        firebase_users_action.Firebase_Contain_Phone(this.firebase, userinfo.phone, (err, contain) => {
          if(err){

          }
          else{
            if(contain){
              this.Verify_Process();           
            }
            else{             
              alert("The phone number has not signed up yet, please sign up with your phone number first");
              this.setState({redirect: '/signup'});
            }
          }
        })
      }
    }

  }


  Verify_Process() {
    //e.preventDefault();

    let { phone } = this.state.userinfo;

    firebase_users_action.Verify_Phone(this.firebase, window.recaptchaVerifier, phone, (err, confirmationResult) => {
      if (err) {
        alert("Confirmation Error:", err);
      }
      else {
        //alert("Success");
        this.setState({ show_phone_auth: true, confirmation: confirmationResult });
      }
    })

  }



  signInWithPhoneHandler() {
    //e.preventDefault();
    let { phone } = this.state.userinfo;

    firebase_users_action.Get_Admin_Phone(this.firebase, phone, (err, data) => {
      if (data) {
        firebase_users_action.GetUser_Profile_Phone(this.firebase, phone, (err, data) => {
          this.props.handleAdminLogin(data);
          this.setState({redirect: '/console'})
        })
      }
      else {
        firebase_users_action.GetUser_Profile_Phone(this.firebase, phone, (err, data) => {
          if (data) {
            //console.log("User pone data: ", data);
            this.props.handleCustomerLogin(data);
            this.setState({redirect: '/customer'})
          }
          else {
            alert("Cannot find user information. Please sign up first!");
            this.setState({ redirect: "/signup" });
          }
        })
      }

    });


  }


  //https://stackoverflow.com/questions/49841855/how-check-if-the-email-in-firebase-is-verified-in-react-native
  signInWithEmailAndPasswordHandler() {
    //event.preventDefault();
    //event.persist();
    let { email, password } = this.state.userinfo;
    //console.log("Login...." + email + '   ' + password);
    firebase_users_action.loginUser(this.firebase, email, password, (err, user) => {
      if (err) {

        console.log('Cannot Sign In Account: ', email, ', Error: ', err);
        if (err === "Email need verify") {
          alert('The verify email link has been sent to your email address: ', email, ' Please click the link and login again');
        }
        else if (err === "Send Email Error") {
          alert('System having trouble sending verify email link, please try later');
        }
        else {
          alert('Cannot Sign In Account: ', email, ', Error: ', err);
        }
      }
      else {
        //console.log('Successful login user: ' + user);

        firebase_users_action.Get_Admin_Email(this.firebase, email, (err, data) => {
          //console.log("Admin? ", data);
          if (data) {
            firebase_users_action.GetUser_Profile_Email(this.firebase, email, (err, data) => {
              this.props.handleAdminLogin(data);
              //this.forceUpdate();
              //localStorage.setItem('user_info', data);
              //localStorage.setItem('access_admin', true);
              this.setState({redirect: '/console'})
            })

          }
          else {
            firebase_users_action.GetUser_Profile_Email(this.firebase, email, (err, data) => {
              this.props.handleCustomerLogin(data);
              //this.forceUpdate();
              //localStorage.setItem('user_info', data);
              //localStorage.setItem('access_customer', true);
              this.setState({redirect: '/customer'})
            })
          }

        });

      }
    });
  }

  onChangeHandler(event) {

    //event.preventDefault();
    const { name, value } = event.currentTarget;

    let { userinfo } = this.state;

    if (name === 'userEmail') {
      userinfo.email = value;
      this.setState({ userinfo: userinfo });
    }
    else if (name === 'userPassword') {
      userinfo.password = value;
      this.setState({ userinfo: userinfo });
    }
    else if (name === 'userPhone') {
      let digit_check = /^[0-9]+$|^$/;   //   /^[0-9\b]+$/
      if (value.toString().length <= 10 && digit_check.test(value)) {
        userinfo.phone = value;
        this.setState({ userinfo: userinfo });
      }
    }
  }

  _handle_signup(event) {
    event.preventDefault();
    this.setState({ redirect: "/signup" });
  }

  signin_method_change(e) {
    //console.log(e.target);
    let { userinfo } = this.state;
    const { id } = e.target;

    userinfo.email = '';
    userinfo.phone = '';
    userinfo.password = '';

    if (id === 'signinemail') {
      this.setState({ method: id, error: null, userinfo: userinfo });
    }
    else {
      this.setState({ method: id, error: null, userinfo: userinfo });
    }
  }

  componentDidMount() {
    window.recaptchaVerifier = new this.firebase.auth_.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (response) {
      },
      'expired-callback': function () {
        console.log("expired-callback");
        this.forceUpdate();
      }
    });

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });


  }


  render() {

    
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />
    }
    

    let { method, error, show_phone_auth, confirmation } = this.state;
    let { email, password, phone } = this.state.userinfo;
    return (
      <div className="mt-8">
        <div id="recaptcha-container"></div>
        <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
        <div style={{ margin: '20px 30px', padding: '30px', border: '2px solid #9ECEE9', borderRadius: '10px', }}>

          <Form>
            {show_phone_auth ? <Phone_Auth phone={this.state.userinfo.phone} confirmation={confirmation} Add_user={this.signInWithPhoneHandler} /> : null}

            <Form.Group>
              <Form.Label as="legend" sm={5}>Sign In Method</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Email"
                    name="method"
                    id="signinemail"
                    onClick={this.signin_method_change}
                    defaultChecked
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Cell Phone"
                    name="method"
                    id="signinphone"
                    onClick={this.signin_method_change}
                  />
                </Col>
                <Col></Col><Col></Col><Col></Col><Col></Col>
              </Form.Row>
            </Form.Group>




            <Row>
              <Col>
                {method === 'signinemail' ?
                  <Form.Group controlId="formBasicEmail" >
                    <Form.Label >Email</Form.Label>
                    <Form.Control type="email" placeholder="youremail@gmail.com" name="userEmail"
                      value={email} onChange={this.onChangeHandler} />
                  </Form.Group>
                  :
                  <Form.Group controlId="formBasicPhone" >
                    <Form.Label >Phone</Form.Label>
                    <Form.Control type="number" placeholder="XXXXXXXXXX" name="userPhone"
                      value={phone} onChange={this.onChangeHandler} />
                    <Form.Text className="text-muted">
                      You will receive an SMS message for verification and standard rates may apply.
                    </Form.Text>
                  </Form.Group>
                }


              </Col>
              {method === 'signinemail' ?
                <Col>
                  <Form.Group controlId="formBasicLName" >
                    <Form.Label >Password</Form.Label>
                    <Form.Control type="password" name="userPassword" placeholder="Your Password"
                      value={password} onChange={this.onChangeHandler} />
                  </Form.Group>
                  {/*<Button variant="outline-light" size="sm" onClick={this.redirect_resetpwd} style={{ color: 'blue' }}> </Button>*/}
                  <Link to='/resetpwd'>Forgot Password ?</Link>
                </Col>
                : <Col></Col>}
            </Row>
            {error ? <p style={{ color: 'red' }}>{error}</p> : null}

            <div style={{ display: 'flex', justifyConten: 'flex-end' }}>
              {method === 'signinemail' ?
                <Button variant="primary" type="submit" onClick={this.signIn_Handle} >
                  Sign In
              </Button> :
                <Button variant="primary" type="submit" onClick={this.signIn_Handle}  >
                  Get Verification Code
              </Button>
              }
            </div>

          </Form>
        </div>
      </div >
    );
  }



}