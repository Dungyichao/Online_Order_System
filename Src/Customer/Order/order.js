import React, { Component } from 'react';
import { Button, Badge } from 'react-bootstrap';
import _, { findLastKey, result } from "lodash"

import MenuEdit from './Menu/menu';
import Cart from './Cart/cart';
import * as firebase_order_action from '../../Firebase/orders';
import { Get_Tax_Rate, Get_Open_Time, Get_Extra_Add_Items, Get_FriedRice_items, Get_Order_Status } from '../../Firebase/admin';
import * as utility from '../../Components/utility';



//Setstate callback: https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating
//Deep copy list: https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
//Math round : https://stackoverflow.com/questions/4937251/why-is-my-tofixed-function-not-working/4937261


export default class CustomerOrder extends Component {

    constructor(props) {

        super(props);

        this.firebase = props.firebase;
        this.user_profile = props.user_profile;

        //this.get_tax_rate();

        this.get_tax_rate();
        this.Get_Open_Time_List();


        this.state = {
            Cart_data: [],
            Cart_new_item: '',
            notes: '',
            order_price: 0,
            tax: 0,
            pickup_time: 'Select Time',
            opentime: [],
            select_time_title: 'Select Time',
            add_dish_items: [],
            fried_rice_items: [],
            order_status: false,
        }

        this.new_order_info = new firebase_order_action.OrderInformation();

        this.refresh_cart_handle = this.refresh_cart_handle.bind(this);
        this.clear_all_handle = this.clear_all_handle.bind(this);
        this.sendinfo_toCart_handle = this.sendinfo_toCart_handle.bind(this);
        this.Cart_new_item_arrive = this.Cart_new_item_arrive.bind(this);
        this.remove_item = this.remove_item.bind(this);
        this.submit_order = this.submit_order.bind(this);
        this.note_change_handle = this.note_change_handle.bind(this);
        this.get_tax_rate = this.get_tax_rate.bind(this);
        this.set_pickup_time = this.set_pickup_time.bind(this);
        this.Get_Open_Time_List = this.Get_Open_Time_List.bind(this);
        this.check_input_field = this.check_input_field.bind(this);
        this.Get_add_dish_items = this.Get_add_dish_items.bind(this);
        this.Get_fried_rice_items = this.Get_fried_rice_items.bind(this);
        //this.check_order_status = this.check_order_status.bind(this);

        this.Get_add_dish_items();
        this.Get_fried_rice_items();
        //this.check_order_status();


    }

    Get_add_dish_items() {
        Get_Extra_Add_Items(this.firebase, (err, add_items) => {
            if (err) {

            }
            else {
                this.setState({ add_dish_items: add_items })
            }
        })
    }

    Get_fried_rice_items() {
        Get_FriedRice_items(this.firebase, (err, friedrice_items) => {
            if (err) {

            }
            else {
                this.setState({ fried_rice_items: friedrice_items })
            }
        })
    }

    Get_Open_Time_List() {
        var now = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[now.getDay()];
        Get_Open_Time(this.firebase, (err, openlist) => {
            if (err) {
                console.log("Geting OpenHour error: ", err);
            }
            else {
                this.setState({ opentime: [openlist[day]] });
            }
        })
    }

    set_pickup_time(time) {
        //console.log("In order.js: ", time);
        this.setState({ pickup_time: time });
    }

    get_tax_rate() {
        Get_Tax_Rate(this.firebase, (err, tax) => {
            if (err) {
            }
            else {
                this.setState({ tax: tax });
            }
        })

    }



    check_input_field() {
        let order_status_await = check_order_status(this.firebase);

        let final_check = order_status_await.then((result) => {
            if (result) {
                if (this.state.Cart_data.length <= 0) {
                    alert("You need to add some food to Your Order");
                    return false;
                }
                if (this.state.Cart_data.length > 20) {
                    alert("You cannot order more than 20 items");
                    return false;
                }
                if (this.state.pickup_time === "Select Time") {
                    alert("You need to Select Pickup Time");
                    return false;
                }
                if (this.state.notes.length > 500) {
                    alert("Notes for Eggrollchen cannot be more than 500 characters");
                    return false;
                }
                return true;

            }
            else {
                alert("Sorry, we are busy now, Please call 803-787-6820 to order");
                return false;

            }

        })

        return final_check



    }

    submit_order(e) {
        //this.check_order_status()

        //e.preventDefault();
        //e.persist();

        let checkResult = this.check_input_field();
        checkResult.then((result) => {
            if (result) {
                let isSubmit = window.confirm("Do you want to place the order ?");

                if (isSubmit) {

                    const currdatetime = Date.now();
                    //console.log(currdatetime);
                    this.new_order_info.customer_id = `${this.user_profile[0]}`;
                    this.new_order_info.id = `${this.user_profile[0]}${utility.formatted_string('0000000000000', currdatetime, '')}`;
                    this.new_order_info.time = utility.get_current_timestring();
                    this.new_order_info.user_info = this.user_profile[1][0];
                    this.new_order_info.price = this.state.order_price;
                    this.new_order_info.status = 'Issued';
                    this.new_order_info.order_items = this.state.Cart_data;
                    this.new_order_info.note = this.state.notes;
                    this.new_order_info.pickup_time = this.state.pickup_time;
                    this.new_order_info.fried_rice = this.state.fried_rice;
                    this.new_order_info.add_dish_items = this.state.add_dish_items;

                    //console.log("Going to submit order data: ", this.new_order_info);

                    firebase_order_action.AddOrder(this.firebase, this.new_order_info, (err, doc_id) => {
                        if (err) {
                            console.log('Cannot Add Order to Firestore: ' + err);
                        }
                        else {
                            alert("Submitted Successfully");
                            this.props.changePage();
                        }
                    })
                }

            }
        })


    }

    remove_item(e) {
        console.log("Remove item uid: ", e);
        let { Cart_data, order_price } = this.state;

        const remove_item = Cart_data.filter((item) => item.uid === e);
        if (remove_item.length > 0) {
            //order_price = (Math.round(order_price * 100.0) - Math.round(remove_item[0].Tprice * 100.0)) / 100;
            order_price = utility.subtract_two_price(order_price, remove_item[0].Tprice);
        }


        let deepcopy_list = _.cloneDeep(Cart_data);
        const newlist = deepcopy_list.filter((item) => item.uid !== e);
        this.setState({ Cart_data: newlist, order_price: order_price }, () => {
            console.log("Current Price in order: ", this.state.order_price);
        });
    }

    refresh_cart_handle() {
        let { Cart_data } = this.state;
        console.log("Current Cart Data: ", Cart_data);
    }

    Cart_new_item_arrive(e) {
        //console.log("Cart_new_item_arrive: ", e);
        this.setState({ Cart_new_item: e }, () => {
            //after setstate
            this.sendinfo_toCart_handle();
        });
    }

    sendinfo_toCart_handle() {

        let { Cart_new_item, Cart_data, order_price } = this.state;
        //order_price = (Math.round(order_price * 100) + Math.round(Cart_new_item.Tprice * 100)) / 100;
        order_price = utility.add_two_price(order_price, Cart_new_item.Tprice);
        let deepcopy_list = _.cloneDeep(Cart_data);
        deepcopy_list.push(Cart_new_item);
        this.setState({ Cart_data: deepcopy_list, order_price: order_price }, () => {
            //console.log("Current Price in order: ", this.state.order_price);
        });
    }

    clear_all_handle() {
        //console.log("Clear all");
        this.setState({
            Cart_data: [],
            notes: '',
            order_price: 0,
            pickup_time: 'Select Time'
        });
    }

    note_change_handle(e) {
        e.persist()
        //console.log(e.target.value);
        this.setState({ notes: e.target.value });
    }


    render() {

        var now = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[now.getDay()];

        let { Cart_data, order_price, opentime } = this.state;


        //console.log("this.state.add_item: ", this.state.add_dish_items)


        if (opentime[0] && this.user_profile.length > 1) {
            var open_status = opentime[0].status;
            var status_color = open_status === "Open" ? "success" : "danger";
            var time_display = utility.open_time_display(opentime[0].Open, opentime[0].Close);

            return (
                <div style={order_style}>
                    <div>
                        <h5>{day} : <Badge variant={status_color}>{open_status}</Badge> {open_status === "Open" ? time_display : null}</h5>
                    </div>

                    <div style={{

                    }}>
                        <h3>Menu</h3>

                        <MenuEdit firebase={this.firebase} CartAdd={this.Cart_new_item_arrive}
                            add_dish_items={this.state.add_dish_items}
                            fried_rice_items={this.state.fried_rice_items} />


                    </div>

                    <div>
                        <div style={cart_header_style} >
                            <h3 style={{ flex: '8' }} >Your Order</h3>
                            <div style={{ flex: '1' }}>{''}</div>
                            <Button
                                onClick={this.refresh_cart_handle}
                                style={{ flex: '3', alignSelf: 'flex-end', width: '5px' }} >Refresh</Button>
                        </div>
                        <div>
                            <Cart data_array={Cart_data}
                                user_profile={this.user_profile[1][0]}
                                cart_price={order_price}
                                open_time={opentime}
                                select_time_title={this.state.pickup_time}
                                remove_item={this.remove_item}
                                refresh_cart={this.refresh_cart_handle}
                                clear_all={this.clear_all_handle}
                                submit={this.submit_order}
                                addnote={this.note_change_handle}
                                tax_rate={this.state.tax}
                                pickuptime={this.set_pickup_time} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <h3>...</h3>
            )
        }

    }
}

const order_style = {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: '20px 20px',
    flexDirection: 'column',

}

const cart_header_style = {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 5px',
    padding: '20px 0px 5px 0px',
    borderTop: "4px solid #868A8C"
}

const check_order_status = async (firebase) => {

    let Order_status = Get_Order_Status(firebase);
    let final_result = Order_status.then((result) => {
        console.log(result)
        if(result[0]){
            return false
        }
        else{
            return result[1]
        }
        
    })
    return final_result;

    /*
    const result = await firebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {
        const data = querySnapshot.data();
        return data.OrderStatus;
    }).catch(err => {
        return false;
    })
    return result
    */
    

}

