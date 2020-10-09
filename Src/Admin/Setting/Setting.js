import React, { Component } from 'react';
import * as Firebase_Admin from '../../Firebase/admin';
import { Form } from 'react-bootstrap';


export default class Setting extends Component {

    constructor(props) {

        super(props);


        this.state = {
            admin_set_info: null,
        }

        this.firebase = props.firebase;

        this.Get_Admin_Setting_Info = this.Get_Admin_Setting_Info.bind(this);
        this.Change_Order_Status = this.Change_Order_Status.bind(this);

        this.Get_Admin_Setting_Info();
    }

    Get_Admin_Setting_Info() {
        Firebase_Admin.Get_Admin_Setting(this.firebase, (err, info) => {
            if (err) {

            }
            else {
                console.log(info);
                this.setState({ admin_set_info: info });
            }
        })

    }

    Change_Order_Status(e){
        let {admin_set_info} = this.state;
        e.persist();
        //console.log(e.target.value);
        admin_set_info.OrderStatus = !admin_set_info.OrderStatus;
        this.setState({admin_set_info: admin_set_info}, () => {
            Firebase_Admin.Update_Admin_OrderStatus(this.firebase, this.state.admin_set_info.OrderStatus, (err, result) => {

            })
        });

        
    }


    render() {
        let {admin_set_info} = this.state;
        if (admin_set_info) {
            return (
                <div style={setting_style}>
                    <Form>
                        <Form.Group>
                            <Form.Label as="legend" sm={5}>Customer Order Status</Form.Label>
                            <Form.Check
                                        type="switch"
                                        label="Available"
                                        name="orderstatus"
                                        id="orderstatus"
                                        value={admin_set_info.OrderStatus} 
                                        checked={admin_set_info.OrderStatus}
                                        
                                        onChange={this.Change_Order_Status}
                                    />
                        </Form.Group>
                    </Form>

                </div>
            )
        }
        else {
            return (
                <div style={setting_style}>

                </div>
            )

        }

    }

}

const setting_style = {
    border: '1px solid #51A5DB',
    margin: '15px',
    padding: '15px',
    borderRadius: '10px'
}