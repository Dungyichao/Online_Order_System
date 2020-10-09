import React from 'react';
import { Accordion, Card, Badge } from 'react-bootstrap';
import FoodList from '../../../Admin/Order/Food';
import * as Utility from '../../../Components/utility';


export const HistoryItem = (props) => {

    const item_style = {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',

    }

    let orderinfo = props.Order_item_info;
    let tax_price = Utility.orderprice_to_tax(orderinfo.price, props.tax);
    let total_price = Utility.add_two_price(orderinfo.price, tax_price);

    let status = orderinfo.status;
    if (status === "Issued") {
        status = "Waiting for Confirm";
    }
    else if (status === "Confirmed") {
        status = "Preparing Food";
    }
    else if (status === "Complete") {
        status = "Ready to Pickup";
    }
    else if (status === "Cancel") {
        status = "Canceled";
    }
    else if (status === "Paid") {
        status = "Enjoy";
    }

    return (
        <div style={order_style}>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div style={item_style}>
                            <div style={{ flex: '1', textAlign: 'left' }}>{props.u_key}.</div>
                            <div style={{ flex: '8' }}>{Utility.display_order_id_digit(orderinfo.id)}</div>
                            <div style={{ flex: '9' }}>{Utility.convert_timestring_read(orderinfo.time).substring(0,10)}</div>
                            <div style={{ flex: '4', textAlign: 'right' }}>${total_price}</div>
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
                            <h6>Order Item:</h6>
                            <FoodList data_array={orderinfo.order_items} />
                            <p>--------------------------</p>
                            <h6>Order Price : ${orderinfo.price}</h6>
                            <h6>Tax ({props.tax}%) : ${tax_price} </h6>
                            <h4>Total Price      : ${total_price} </h4>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

const order_style = {
    margin: "5px 10px 5px 4px",
    padding: "0px 0px 0px 5px",
    backgroundColor: "#A8DBFC",
    borderLeft: "10px solid #64BEF8"
}

function set_StatusStyle(status) {
    let badge_variant = {}

    if (status === 'Issued') {
        badge_variant = "warning";
    }
    if (status === 'Confirmed') {
        badge_variant = "success";
    }
    if (status === 'Complete') {
        badge_variant = "primary";
    }
    if (status === 'Paid') {
        badge_variant = "dark";
    }
    if (status === 'Cancel') {
        badge_variant = "danger";
    }


    return badge_variant;

}


