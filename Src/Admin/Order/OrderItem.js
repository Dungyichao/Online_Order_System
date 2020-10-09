import React from 'react';
import { Button, Accordion, Card, Badge, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import FoodList from './Food';
import * as Utility from '../../Components/utility';


export const OrderItem = (props) => {

    //console.log(props);

    function update_status_button_handle(e){      
        //console.log(e);
        //e.preventDefault();
        //console.log("Order id: ", props.Order_item_info.id, "Change to status: ", e.target.value);
        //props.update_status();
        props.update_status(props.Order_item_info.id,e.target.value); //props.Order_item_info.id,e.target.value
    }

    function update_status_handle(e){      
        //console.log(e);
        //console.log("Order id: ", props.Order_item_info.id, "Change to status: ", e);
        //props.update_status();
        props.update_status(props.Order_item_info.id,e);
    }

    const item_style = {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',

    }

    let orderinfo = props.Order_item_info;
    let tax_price = Utility.orderprice_to_tax(orderinfo.price, props.tax);
    let total_price = Utility.add_two_price(orderinfo.price, tax_price);

    return (
        <div>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={setStyle(orderinfo.status)}>
                        <div style={item_style}>
                            <div style={{ flex: '1' }}>{props.u_key}.</div>
                            <div style={{ flex: '8' }}>{Utility.display_order_id_digit(orderinfo.id)}</div>
                            <div style={{ flex: '7' }}>{Utility.name_display(orderinfo.user_info.Fname, orderinfo.user_info.Lname)}</div>
                            <div style={{ flex: '4' }}><Badge variant="info">{orderinfo.pickup_time}</Badge></div>
                            <div style={{ flex: '4' }}>${total_price}</div>
                        </div>

                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <h5>Customer:{' '}
                                <Badge variant="secondary">{Utility.name_display(orderinfo.user_info.Fname, orderinfo.user_info.Lname)}</Badge>{' '}
                                <Badge variant="success">{Utility.phone_display(orderinfo.user_info.phone)}</Badge>{' '}
                                <Badge variant="primary">{Utility.email_display(orderinfo.user_info.email)}</Badge>{' '}
                            </h5>
                            <h6>Pickup Time: <Badge variant="info">{orderinfo.pickup_time}</Badge></h6>
                            <h6>Order Time: {Utility.convert_timestring_read(orderinfo.time)}</h6>
                            <h6>Notes:<Badge variant="danger">{orderinfo.note}</Badge> </h6>
                            <h6>Order Item:</h6>
                            <FoodList data_array={orderinfo.order_items} />
                            <p>--------------------------</p>
                            <h6>Order Price : ${orderinfo.price}</h6> 
                            <h6>Tax ({props.tax}%) : ${tax_price} </h6>   
                            <h4>Total Price      : ${total_price} </h4> 

                            {orderinfo.status === "Issued" ? <Button onClick={update_status_button_handle} value={"Confirmed"} variant="success" >Confirm</Button> : null}{' '}
                            {orderinfo.status === "Confirmed" ? <Button onClick={update_status_button_handle} value={"Complete"} variant="primary" >Complete</Button> : null}{' '}
                            {orderinfo.status === "Complete" ? <Button onClick={update_status_button_handle} value={"Paid"} variant="dark" >Paid</Button> : null}{' '}
                            

                            <DropdownButton as={ButtonGroup} title="Other Option" id="bg-nested-dropdown" variant="light">
                                {orderinfo.status === "Issued" ? null : 
                                <Dropdown.Item eventKey="Issued" onSelect={update_status_handle}>Issued</Dropdown.Item>}
                                {orderinfo.status === "Confirmed" || orderinfo.status === "Issued" ? null : 
                                <Dropdown.Item eventKey="Confirmed" onSelect={update_status_handle}>Confirm</Dropdown.Item>}
                                {orderinfo.status === "Complete" || orderinfo.status === "Confirmed" ? null : 
                                <Dropdown.Item eventKey="Complete" onSelect={update_status_handle}>Complete</Dropdown.Item>}
                                {orderinfo.status === "Paid" || orderinfo.status === "Complete" ? null : 
                                <Dropdown.Item eventKey="Paid" onSelect={update_status_handle}>Paid</Dropdown.Item>}
                                {orderinfo.status === "Cancel" ? null : 
                                <Dropdown.Item eventKey="Cancel" onSelect={update_status_handle}>Cancel</Dropdown.Item>}
                                
                            </DropdownButton>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}


//https://stackoverflow.com/questions/53138637/how-to-use-multiple-independent-conditional-styles-on-same-div-in-reactjs
function setStyle(status) {
    let Accordion_style = {}

    if (status === 'Issued') {
        const Issued_style = {
            backgroundColor: '#FCCB00',
        }
        Accordion_style = Object.assign(Accordion_style, Issued_style);
    }
    if (status === 'Confirmed') {
        const Confirmed_style = {
            backgroundColor: '#00D084',
        }
        Accordion_style = Object.assign(Accordion_style, Confirmed_style);
    }
    if (status === 'Complete') {
        const Confirmed_style = {
            backgroundColor: '#0693E3',
            color: '#CDE6F5',
        }
        Accordion_style = Object.assign(Accordion_style, Confirmed_style);
    }
    if (status === 'Paid') {
        const Confirmed_style = {
            backgroundColor: '#555555',
            color: '#DADEE0',
        }
        Accordion_style = Object.assign(Accordion_style, Confirmed_style);
    }
    if (status === 'Cancel') {
        const Confirmed_style = {
            backgroundColor: '#F47373',
        }
        Accordion_style = Object.assign(Accordion_style, Confirmed_style);
    }


    return Accordion_style

}

