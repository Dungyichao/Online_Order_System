import React, { Component } from "react";
import * as firebase_users_action from '../Firebase/users';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

export default class Reset_pwd extends Component {

    constructor(props) {
        super(props);
        this.firebase = props.firebase;
        this.NewUserInfo = new firebase_users_action.UserInformation();

        this.state = {
            redirect: null,
            userinfo: this.NewUserInfo,
            error: null,
        }

        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.Reset_pwd_handle = this.Reset_pwd_handle.bind(this);
        
    }

    Reset_pwd_handle(e) {
        e.preventDefault();


        let { userinfo } = this.state;


        //console.log("Reset Email Password");
        firebase_users_action.Firebase_sent_resetpwd_email(this.firebase, userinfo.email, (err, result) => {
            if (err) {
                alert("We cannot send a password reset email to your account. Please contact Eggrollchen")
            }
            else {
                alert("Please go to your email account and click on the link in the email we just sent you. Provide the new password and click continue");
                this.setState({ redirect: "/" });
            }
        })



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


    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }

        let { error, } = this.state;
        let { email} = this.state.userinfo;
        return (
            <div>
                <div className="mt-8">


                    <div id="recaptcha-container"></div>
                    <h1 className="text-3xl mb-2 text-center font-bold">Reset Email Password</h1>
                    <div style={{ margin: '20px 30px', padding: '30px', border: '2px solid #9ECEE9', borderRadius: '10px', }}>
                        <Form>
                            <Row>
                                <Col>

                                    <Form.Group controlId="formBasicEmail" >
                                        <Form.Label >Email</Form.Label>
                                        <Form.Control type="email" placeholder="youremail@gmail.com" name="userEmail"
                                            value={email} onChange={this.onChangeHandler} />
                                    </Form.Group>



                                </Col>
                            </Row>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <Button variant="primary" type="submit" onClick={this.Reset_pwd_handle} >
                                    Reset Password
                                </Button>
                            </div>
                        </Form>


                    </div>
                </div>
            </div>
        )
    }

}