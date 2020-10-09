import React, { Component } from 'react';
import Scroll, { Scroll_cell } from '../../../Components/Scroll';
import { Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import * as PickUp from './PickUpTime';
import * as Utility from '../../../Components/utility'
//import { Button, Accordion, Card } from 'react-bootstrap';

import CartList from './CartList';

export default class Cart extends Component {

    constructor(props) {

        super(props);
        //console.log("In Cart props time", props.open_time);

        //console.log(props.select_time_title)
        this.state = {
            time_list: this.Get_Time_List(props.open_time),
            select_time_title: props.select_time_title,
        }
        //;
        //this.Get_Open_Time_List();

        this.set_select_time_title = this.set_select_time_title.bind(this);
        this.Get_Time_List = this.Get_Time_List.bind(this);


    }

    Get_Time_List(open_time) {
        //console.log("in Cart, get open time list: ", open_time)
        let newDate = new Date();
        newDate.setHours(newDate.getHours(), newDate.getMinutes() + 15, 0, 0);
        let Currhours = newDate.getHours(); //To get the Current Hours
        let Currmin = newDate.getMinutes(); //To get the Current Minutes

        if (open_time[0]) {
            if (open_time[0].status === "Open") {
                var openhh = Math.floor(open_time[0]["Open"] / 100);
                var openmm = open_time[0]["Open"] % 100;
                var closehh = Math.floor(open_time[0]["Close"] / 100);
                var closemm = open_time[0]["Close"] % 100;
                //console.log("Current Hour", Currhours, "Current Min", Currmin);
                if(Currhours >= openhh){
                    openhh = Currhours;
                    openmm = Currmin;
                }
                if (openmm < 15 && openmm >= 0) {
                    openmm = 15;
                }
                else if (openmm < 30 && openmm >= 15) {
                    openmm = 30;
                }
                else if (openmm >= 30 && openmm < 45) {
                    openmm = 45;
                }
                else if (openmm >= 45 && openmm < 59) {
                    openmm = 0;
                    openhh = openhh + 1;
                }

                let time_list = PickUp.get_time_list(openhh, openmm, closehh, closemm);
                return time_list
            }
            else{
                return []
            }

        }
        else {
            return []
        }

    }



    set_select_time_title(time) {
        this.setState({ select_time_title: time });
        this.props.pickuptime(time);
    }



    render() {

        //let tax_price = Math.ceil(this.props.cart_price * this.props.tax_rate) / 100;
        let tax_price = Utility.orderprice_to_tax(this.props.cart_price, this.props.tax_rate);
        let {user_profile} = this.props;
        //console.log(this.state.time);

        return (
            <div style={{                    
                margin: '8px 4px 8px 4px',
                padding: '2px 15px 5px 2px',
            }}>
                <div style={{
                    backgroundColor: '#E2E5E9',
                    padding:'3px',
                    borderRadius: '10px',
                }}>
                    <Scroll_cell>

                        <CartList data_array={this.props.data_array} remove_item={this.props.remove_item} />  

                    </Scroll_cell>
                </div>
                <div style = {{margin:'5px 0'}}>
                    Pickup Time:
                    <DropdownButton id="dropdown-item-button" title={this.props.select_time_title} variant="secondary">
                        <Scroll_cell>
                            <Dropdown.ItemText>Only Valid for Today</Dropdown.ItemText>
                            <PickUp.PickUpTime_List time_list={this.state.time_list} change_value={this.set_select_time_title} />
                        </Scroll_cell>
                    </DropdownButton>
                </div>
                <div>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Notes for EggRollChen</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.props.addnote} />
                    </Form.Group>
                </div>
                <div style={buttons_style}>
                    <div>Name: {Utility.name_display(user_profile.Fname, user_profile.Lname)} </div>
                    <div>Phone: {Utility.phone_display(user_profile.phone)}</div>
                    <div>Email: {Utility.email_display(user_profile.email)}</div>
                    <div>Order Price: ${this.props.cart_price}</div>
                    <div>Tax ({this.props.tax_rate}%) {"              "} : ${tax_price}</div>
                    <Button variant="danger" onClick={this.props.clear_all} >Clear All</Button> {'  '}
                    <Button variant="success" onClick={this.props.submit} >Place Order</Button>


                </div>


            </div>
        );
    }

}

const buttons_style = {
    margin: "20px 2px",
    padding: "5px",
    border: "1px groove",
}