import React, { Component } from 'react';
import { Toast, Button, InputGroup, Overlay, Tooltip, Accordion, Card } from 'react-bootstrap';
import * as Utility from '../../../Components/utility';

import { FriedRice, DishAdd } from './Extra';
//import 'rsuite/lib/styles/index.less';



export default class DishItem extends Component {

    constructor(props) {
        super(props);

        this.add_dish_items_data = this.props.add_dish_items;
        this.fried_rice_items_data = this.props.fried_rice_items;

        this.state = {
            rec_data: props.menu_info,
            showToast: false,
            showTooltip: false,
            order_item: {
                dish_name: props.menu_info.dish_name,
                qty: 0,
                uid: 0,
                item_number: props.menu_info.item_number,
                Tprice: 0,
                extra_add: [],
                fried_rice: this.filter_data(this.fried_rice_items_data, "Free Fried Rice"),
            },

        }

        this.myRef = React.createRef();

        this.toggleShowToast_handle = this.toggleShowToast_handle.bind(this);
        this.qty_handle_add = this.qty_handle_add.bind(this);
        this.qty_handle_minus = this.qty_handle_minus.bind(this);
        this.qty_change_handle = this.qty_change_handle.bind(this);
        this.sendinfo_toCart_handle = this.sendinfo_toCart_handle.bind(this);
        this.send = this.send.bind(this);
        this.Set_fried_rice = this.Set_fried_rice.bind(this);
        this.Set_Extra_add = this.Set_Extra_add.bind(this);
        this.filter_data = this.filter_data.bind(this);

    }

    Set_fried_rice(e) {
        let { order_item } = this.state;
        let fried_rice = this.filter_data(this.fried_rice_items_data, e);
        order_item["fried_rice"] = fried_rice;
        //console.log(fried_rice);
    }

    Set_Extra_add(e) {
        let { order_item } = this.state;
        let customer_add = []
        e.map((item, idx) => {
            if (item === true) {
                customer_add.push(this.add_dish_items_data[idx]);
            }
        })

        order_item["extra_add"] = customer_add;

    }

    filter_data(data_array, criteria) {
        //console.log("Going to filter", data_array);
        if (data_array) {
            const newlist = data_array.filter((item) => item.name == criteria);
            return (newlist);
        }
        else {
            return ([]);
        }
    }

    toggleShowToast_handle() {
        let { showToast } = this.state;
        showToast = !showToast;
        this.setState({ showToast: showToast });
    }

    qty_handle_add(e) {
        let { order_item } = this.state;
        if (order_item.qty < 100) {
            order_item.qty = order_item.qty - 0 + 1;
        }
        else {
            order_item.qty = 100;
        }

        this.setState({ order_item: order_item })
    }

    qty_handle_minus(e) {
        let { order_item } = this.state;
        if (order_item.qty > 0) {
            order_item.qty = order_item.qty - 1;
        }
        else {
            order_item.qty = 0;
        }
        this.setState({ order_item: order_item })
    }

    qty_change_handle(e) {
        //e.persist();

        let { order_item } = this.state;
        order_item.qty = e.target.value
        if (order_item.qty <= 100 && order_item.qty > 0) {
            order_item.qty = order_item.qty;
        }
        else if (order_item.qty > 100) {
            order_item.qty = 100;
        }
        else {
            order_item.qty = 0;
        }
        this.setState({ order_item: order_item, showTooltip: false, });
    }

    sendinfo_toCart_handle(e) {

        let { order_item } = this.state;
        //console.log(order_item);     

        if (order_item.qty > 0) {
            const currdatetime = Date.now();  //.toISOString()

            let add_price = 0;
            let fried_rice_price = 0;
            let menu_price = 0;

            order_item.extra_add.map((item, idx) => {
                add_price = Utility.add_two_price(add_price, item.price);
            });

            order_item.fried_rice.map((item, idx) => {
                fried_rice_price = Utility.add_two_price(fried_rice_price, item.price);
            })

            menu_price = Utility.add_two_price(menu_price, this.props.menu_info.price);
            menu_price = Utility.add_two_price(menu_price, add_price);
            menu_price = Utility.add_two_price(menu_price, fried_rice_price);

            order_item.uid = currdatetime;  //currenttime
            order_item.dish_name = this.props.menu_info.dish_name;
            order_item.item_number = this.props.menu_info.item_number;
            order_item.Tprice = order_item.qty * menu_price;
            this.setState({ order_item: order_item, showTooltip: false }, () => {
                this.send();
                //this.setState({order_item: {}});
            })

            
            //this.forceUpdate();
            //console.log("forceupdate")
        }
        else {
            this.setState({ showTooltip: true });
        }
    }

    send() {
        let { order_item } = this.state;
        let order_item_ini = {
            dish_name: '',
            qty: 0,
            uid: 0,
            item_number: 0,
            Tprice: 0,
            extra_add: [],
            fried_rice: this.filter_data(this.fried_rice_items_data, "Free Fried Rice"),
        }

        this.props.CartAdd(order_item);

        this.setState({ order_item: order_item_ini, showToast: false });
    }

    render() {

        let { rec_data, showToast, order_item } = this.state;

        const status = rec_data.status;

        return (
            <div>
                
                <Button onClick={this.toggleShowToast_handle}
                    style={{                       
                        width: '100%',
                        backgroundColor: '#E2E7ED',
                        border:'0px'
                    }}>
                    <div style={accord_style}>
                                <div style={{flex:'1'}}>
                                    {rec_data.item_number}.
                                </div>
                                <div style={{flex:'7'}}>
                                    {rec_data.dish_name} 
                                </div>
                                <div style={{flex:'2', color:'#F47373'}}>
                                    {rec_data.status === 'Stop' ? <small>out of order</small> : ''}
                                </div>
                                <div style={{flex:'2', textAlign:'right'}}>
                                    ${rec_data.price} 
                                </div>
                                
                                
                            </div>
                </Button>

                    
                <Toast
                    
                    show={showToast}
                    onClose={this.toggleShowToast_handle}
                    style={{
                        backgroundColor: '#C4CFD8',
                        color: '#555555',                     
                        maxWidth: '100%',
                    }}>


                    <Toast.Body>{rec_data.descript}

                        {rec_data.status === "Available" ?
                            <div>
                                <div>
                                    {this.props.add_dish_items ? <DishAdd add_dish_items={this.props.add_dish_items} set_ExtraAdd={this.Set_Extra_add} /> : null}

                                </div>
                                <div>
                                    {this.props.fried_rice_items ? <FriedRice fried_rice_items={this.props.fried_rice_items} set_FriedRice={this.Set_fried_rice} /> : null}
                                </div>

                                <div style={{
                                    margin: '2px 15px'
                                }}>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>QTY</InputGroup.Text>
                                                <Button variant="info" onClick={this.qty_handle_minus}>-</Button>
                                            </InputGroup.Prepend>
                                            <input
                                                name="qty"
                                                type="number"
                                                value={order_item.qty}
                                                onChange={this.qty_change_handle}
                                                style={{
                                                    textAlign: 'center',
                                                    width: '50px'
                                                }} />
                                            <InputGroup.Append>
                                                <Button variant="info" onClick={this.qty_handle_add}>+</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="info" ref={this.myRef} onClick={this.sendinfo_toCart_handle} >Add to Order</Button>
                                    <Overlay target={this.myRef.current} show={this.state.showTooltip} placement="right">
                                        {(props) => (
                                            <Tooltip id="overlay-example" {...props}>
                                                Incorrect QTY
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </div>


                            </div>
                            : null}
                    </Toast.Body>




                </Toast>
                

            </div>
        );
    }

}

const accord_style = {
    display: 'flex',
    flexDirection: 'row',
    color: '#747576'
}


const QTY_style = {
    display: 'flex',
    alignItems: 'stretch',

}

const duration = 0;

const defaultStyle = {
    position: 'fixed',
    top: '0',
    right: '-270px',
    zIndex: '1000'
};

const transitionStyles = {
    entered: {
        transform: 'translateX(-100%)',
        transition: `transform ${duration}ms ease-in-out`
    },
    exiting: {
        transform: 'translateX(100%)',
        transition: `transform ${duration}ms ease-in-out`
    },
    exited: {
        right: '-270px'
    }
};