import React, {Component} from 'react';

import {OrderItem} from './OrderItem';

export default class OrderList extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }

        //console.log("In OrderList.js: ", this.props.update_status);


    }

    render(){

        let display_data = this.props.data_array;
        //let null_page = [];
        //console.log("Data in CartList.js: ", display_data)

        if (display_data[0]) {
            return (
                display_data.map(
                    (order_item, idx) => {
                        return (
                            <div key={order_item.id} style={div_item_style}>
                                <OrderItem u_key={idx + 1}
                                    Order_item_info={order_item}
                                    update_status={this.props.update_status} tax={this.props.tax}/>
                            </div>
                        );
                    }
                )
            )
        }
        else {
            return (
                <div style={div_item_style}>
                    <p>No Data</p>
                </div>
            );
        }



        
    }

}

const div_item_style = {
    margin:'10px 5px',
}
