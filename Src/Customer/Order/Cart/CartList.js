//import { fromPairs } from 'lodash';
import React, { Component } from 'react';
//import Cart from './cart';
import {CartItem} from './CartItem';

//import { Button, Accordion, Card } from 'react-bootstrap';


export default class CartList extends Component {

    

    render() {

        let display_data = this.props.data_array;
        //let null_page = [];
        //console.log("Data in CartList.js: ", display_data)

        if (display_data[0]) {
            return (
                display_data.map(
                    (cart_item, idx) => {
                        return (
                            <div key={cart_item.uid} style={div_item_style}>
                                <CartItem u_key={idx + 1}
                                    Cart_item_info={cart_item} remove_item={this.props.remove_item} />
                            </div>
                        );
                    }
                )
            )
        }
        else {
            return (
                <div style={div_item_style}>
                    <p>Add Your Favorite Dishes to Here</p>
                </div>
            );
        }

    }

}

const div_item_style = {
    margin:'10px 5px',
}


//

/*
<CartItem key={idx} u_key={idx + 1}
                                Cart_item_info={cart_item}
                                remove_item={this.props.remove_item} />


*/