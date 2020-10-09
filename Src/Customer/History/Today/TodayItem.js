import React, { Component } from 'react';
import * as Firebase_Orders from '../../../Firebase/orders';
import * as Utility from '../../../Components/utility';
import { Accordion, Card, Badge } from 'react-bootstrap';
import FoodList from '../../../Admin/Order/Food';

export default class TodayItem extends Component {

    constructor(props) {

        super(props);

        this.firebase = props.firebase;
        this.doc_id = props.doc_id;
        this.tax = props.tax;

        this.state = {
            order_info: [],
        }

        this.Get_OrderInfobyID_Listen = this.Get_OrderInfobyID_Listen.bind(this);
        this.Get_OrderInfobyID_Listen(this.doc_id);

    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }

    }

    Get_OrderInfobyID_Listen(order_id) {
        Firebase_Orders.GetTodayOrder_Personal_Listen(this.firebase, Utility.get_current_datestring(), order_id, (err, data_array, unsubscribe) => {
            if (err) {
                //console.log("Firebase Get Orders Error: ", err);
                //return unsubscribe;
            }
            else {
                //console.log("Get Order info from Firebase: ", data_array);
                this.unsubscribe = unsubscribe;
                this.setState({ order_info: data_array });
                //return unsubscribe;
            }
        })
    }

    render() {

        let orderinfo = this.state.order_info[0];
        //console.log(orderinfo);


        if (orderinfo) {
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

            let tax_price = Utility.orderprice_to_tax(orderinfo.price, this.tax);
            let total_price = Utility.add_two_price(orderinfo.price, tax_price);


            return (
                <div style={order_style}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" >
                                <div style={item_style}>
                                    <div style={{ flex: '1', textAlign: 'left' }}>{this.props.u_key}.</div>
                                    <div style={{ flex: '9' }}>{Utility.display_order_id_digit(orderinfo.id)}</div>
                                    <div style={{ flex: '9' }}><h5><Badge variant={set_StatusStyle(orderinfo.status)}>{status}</Badge></h5></div>
                                    <div style={{ flex: '5', textAlign: 'right' }}>${total_price}</div>
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
                                    <h6>Notes:<Badge variant="danger">{orderinfo.note}</Badge></h6>
                                    <h6>Order Item:</h6>
                                    <FoodList data_array={orderinfo.order_items} />
                                    <p>--------------------------</p>
                                    <h6>Order Price : ${orderinfo.price}</h6>
                                    <h6>Tax ({this.tax}%) : ${tax_price} </h6>
                                    <h4>Total Price      : ${total_price} </h4>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p></p>
                </div>
            )
        }

    }

}

const order_style = {
    margin: "5px 10px 10px 2px",
    padding: "0px 0px 0px 3px",
    backgroundColor: "#A8DBFC",
    borderLeft: "10px solid #64BEF8"
}

const item_style = {
    display: 'flex',
    flexDirection: 'row',


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