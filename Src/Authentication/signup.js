import React, { Component } from "react";
//import * as action from './action';
import * as firebase_users_action from '../Firebase/users';
import { Redirect } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
import Phone_Auth from './phone_auth';

//import { Form, FormAction, FormSubmit } from '../Theme/theme';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.NewUserInfo = new firebase_users_action.UserInformation();

    this.state = {
      redirect: null,
      userinfo: this.NewUserInfo,
      error: null,
      method: 'signupemail',
      show_phone_auth: false,
      confirmation: null,

    }

    this.createUserWithEmailAndPasswordHandler = this.createUserWithEmailAndPasswordHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this._handle_signin = this._handle_signin.bind(this);
    this.signup_method_change = this.signup_method_change.bind(this);
    this.SignUp_Handle = this.SignUp_Handle.bind(this);
    this.Verify_Process = this.Verify_Process.bind(this);
    this.Check_Input = this.Check_Input.bind(this);
    this.createUserWithPhone = this.createUserWithPhone.bind(this);



  }

  Check_Input() {
    let { method } = this.state;
    let { email, password, phone, Fname, Lname } = this.state.userinfo;

    if (Fname.length < 1 || Lname.length < 1) {
      this.setState({ error: 'First name and last name are required' });
      return false;
    }

    if (method === 'signupemail') {

      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        this.setState({ error: 'Incorrect Email Format' });
        return false;
      }
      if (phone.toString().length < 10 && phone.toString().length > 0) {
        this.setState({ error: 'Phone number should be 10 digits or none' });
        return false;
      }
      if (password.toString().length < 6) {
        this.setState({ error: 'Password should be at least 6 digits' });
        return false;
      }
    }
    else {
      if (phone.toString().length < 10) {
        this.setState({ error: 'Phone number is required and should be 10 digits' });
        return false;
      }
    }
    return true;
  }

  SignUp_Handle(event) {
    event.preventDefault();

    let { phone } = this.state.userinfo;
    if (this.Check_Input()) {
      if (this.state.method === 'signupphone') {
        //phone exist in firebase?
        firebase_users_action.Firebase_Contain_Phone(this.firebase, phone, (err, contain) => {
          if(err){

          }
          else{
            if(contain){
              //redirect to sign in page
              alert("The phone number has been signed up, please sign in with your phone");
              this.setState({redirect: '/signin'});
            }
            else{
              this.Verify_Process();
            }
          }
        })
        
      }
      else {
        this.createUserWithEmailAndPasswordHandler();
      }
    }
  }


  Verify_Process() {

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

  createUserWithPhone(event) {

    let { phone, email, method } = this.state.userinfo;
    email = '';
    method = 'phone';

    firebase_users_action.AddUser(this.firebase, this.state.userinfo, (err, user_email) => {
      if (err) {
        alert('Please Call EggRollChen to activate your account');
      }
      else {

        //Login directly
        firebase_users_action.Get_Admin_Phone(this.firebase, phone, (err, data) => {
          //console.log("Admin? ", data);
          if (data) {
            firebase_users_action.GetUser_Profile_Phone(this.firebase, phone, (err, data) => {
              //console.log("Get Admin data profile", data);
              this.props.handleAdminLogin(data);
              this.setState({redirect: '/console'});
            })

          }
          else {
            firebase_users_action.GetUser_Profile_Phone(this.firebase, phone, (err, data) => {
              //console.log("Get Customer data profile", data);
              if(data[0]){
                this.props.handleCustomerLogin(data);
                this.setState({redirect: '/customer'});
              }
              else{
                alert("Cannot find user information. Please sign up first!");
                this.setState({ redirect: "/signup" });
              }
              
            })
          }

        });


      }
    })
  }


  createUserWithEmailAndPasswordHandler(event) {
    //console.log("CreateUseremailpassword");
    //event.preventDefault();
    let { email, password } = this.state.userinfo;
    let { method } = this.state;


    if (method === "signupemail") {
      this.state.userinfo["status"] = 'inactive';
    }

    firebase_users_action.SignUpUser(this.firebase, email, password, (err, user) => {
      if (err) {
        alert('Cannot Add Account: ' + err);
      }
      else {
        //console.log("Add User Info: ", this.state.userinfo);
        //send auth email
        if (method === "signupemail") {
          firebase_users_action.loginUser(this.firebase, email, password, (err, user) => {
            if (err) {
              if (err === "Email need verify") {
                if (method === "signupemail") {
                  alert("Please go to your email and activate your account by the link");
                }
              }
              else {
                alert("Our system has problem sending you verification email. Please wait later and sign in again: ", err)
              }
            }
          })
        }


        firebase_users_action.AddUser(this.firebase, this.state.userinfo, (err, user_email) => {
          if (err) {
            alert('Please Call EggRollChen to activate your account');
          }
          else {
            console.log("Going to _handle_signin")
            this._handle_signin();
          }
        })
      }
    });

  };



  onChangeHandler(event) {

    const { name, value } = event.target;

    let { userinfo } = this.state;

    if (name === 'FName') {
      userinfo.Fname = value;
      this.setState({ userinfo: userinfo });
    }

    if (name === 'LName') {
      userinfo.Lname = value;
      this.setState({ userinfo: userinfo });
    }

    if (name === 'phone') {
      let digit_check = /^[0-9]+$|^$/;
      if (value.toString().length <= 10 && digit_check.test(value)) {
        userinfo.phone = value
        this.setState({ userinfo: userinfo });
      }
    }

    if (name === 'userEmail') {
      userinfo.email = value;
      this.setState({ userinfo: userinfo });
    }
    else if (name === 'userPassword') {
      userinfo.password = value;
      this.setState({ userinfo: userinfo });
    }

  };

  _handle_signin(event) {
    console.log("_handle_signin")
    //event.preventDefault();
    let { method } = this.state;
    if (method === "signupemail") {
      this.setState({ redirect: "/" });
    }
  }

  signup_method_change(e) {
    console.log(e.target);
    const { id } = e.target;
    let {userinfo} = this.state;

    if (id === 'signupemail') {
      userinfo.phone = '';
      userinfo.method = 'email';
      this.setState({ method: id, show_phone_auth: false, userinfo: userinfo });
    }
    else {
      userinfo.email = '';
      userinfo.method = 'phone';
      this.setState({ method: id, userinfo: userinfo });
    }
  }

  componentDidMount() {
    window.recaptchaVerifier = new this.firebase.auth_.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        //this.Verify_Process();
        //console.log(response);
      },
      'expired-callback': function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        console.log("expired-callback")
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

    let { email, password, FName, LName, phone } = this.state.userinfo;
    let { method, error, show_phone_auth, confirmation } = this.state;

    return (
      <div className="mt-8">


        <div id="recaptcha-container"></div>
        <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
        <div style={{ margin: '20px 30px', padding: '30px', border: '2px solid #9ECEE9', borderRadius: '10px', }}>
          <Form>
            {show_phone_auth ? <Phone_Auth phone={phone} confirmation={confirmation} Add_user={this.createUserWithPhone} /> : null}
            <Form.Group>
              <Form.Label as="legend" sm={5}>Sign Up Method</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Email"
                    name="method"
                    id="signupemail"
                    onClick={this.signup_method_change}
                    defaultChecked
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Cell Phone"
                    name="method"
                    id="signupphone"
                    onClick={this.signup_method_change}
                  />
                </Col>
                <Col></Col><Col></Col><Col></Col><Col></Col>
              </Form.Row>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicFName" >
                  <Form.Label >* First name</Form.Label>
                  <Form.Control type="text" name="FName" value={FName} onChange={this.onChangeHandler} placeholder="First name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicLName" >
                  <Form.Label >* Last name</Form.Label>
                  <Form.Control type="text" name="LName" value={LName} onChange={this.onChangeHandler} placeholder="Last name" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone {method === "signupemail" ? `${'  (optional)'}` : null} </Form.Label>
              <Form.Control type="number" placeholder="XXXXXXXXXX" name="phone" value={phone} onChange={this.onChangeHandler} />
              <Form.Text className="text-muted">
                {method === "signupphone" ? `${'You will receive an SMS message for verification and standard rates may apply.'}` : null}
              </Form.Text>
            </Form.Group>

            {method === "signupemail" ?
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address {method === "signupphone" ? `${'  (optional)'}` : null} </Form.Label>
                <Form.Control type="email" placeholder="youremail@gmail.com" name="userEmail" value={email} onChange={this.onChangeHandler} />
                <Form.Text className="text-muted">
                  {method === "signupemail" ? `${'We will send a verification email link to your email account.'}` : null}
                </Form.Text>
              </Form.Group> : null}

            {method === "signupemail" ?
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="userPassword" value={password} onChange={this.onChangeHandler} />
                <Form.Text className="text-muted">
                  At least 6 digit
              </Form.Text>
              </Form.Group> : null}

            {error ? <p style={{ color: 'red' }}>{error}</p> : null}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" type="submit" onClick={this.SignUp_Handle}>
                Submit
          </Button>
            </div>
          </Form>

        </div>

      </div>
    );

  }



}

const  get_admin_account_list_by_phone = async (firebase, phone) => {
  const result = await firebase_users_action.Get_Admin_Phone(firebase, phone).then((err, bool_result) => {
    console.log("Here");
    return bool_result
  })
  return result
}
