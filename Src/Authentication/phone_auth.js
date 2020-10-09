import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Utility from '../Components/utility';
import { Redirect } from "react-router-dom";


export default class Phone_Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true,
            code: '',
            error: null,
            redirect: null,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.CodeChangeHandler = this.CodeChangeHandler.bind(this);
        this.Confirm_Handle = this.Confirm_Handle.bind(this);
        //this.Reset = this.Reset.bind(this);

    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    CodeChangeHandler(event) {
        event.persist();
        const { value } = event.target;
        this.setState({ code: value });

    }

    Confirm_Handle(event) {
        let { confirmation } = this.props;
        let { code } = this.state;
        //var success = false;
        if (confirmation && code) {
            let result = waitconfirm(confirmation, code);
            result.then((correct) => {
                if (correct) {
                    this.props.Add_user();
                    this.setState({ show: false });
                }
                else {
                    //alert("Incorrect code")
                    this.setState({ error: 'Incorrect code' })
                }
            })
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }

        let { show, code, error } = this.state
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Phone Number Authentication
                </Button>

                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Phone Number Authentication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <p>Please enter the code we just sent to your phone number {Utility.phone_display(this.props.phone)}  into below area.</p>

                        <Form.Group controlId="formBasicLName" >
                            <Form.Control type="text" name="code" value={code} onChange={this.CodeChangeHandler} placeholder="******" />
                            <Form.Text className="text-muted" style={{ color: error ? 'red' : 'black' }}>
                                {error ? error : '6 digit'}
                            </Form.Text>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                                </Button>
                            <Button variant="primary" onClick={this.Confirm_Handle}>Confirm</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        );

    }

}

const waitconfirm = async (confirmation, code) => {
    //let result = false;
    const confirm = await confirmation.confirm(code).then((result) => {
        return true;
    }).catch(() => {
        return false;
    });
    return confirm;
}