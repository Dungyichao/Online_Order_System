import React, { Component } from 'react';
import {HistoryItem} from './HistoryItem';

export default class History extends Component {

    constructor(props) {

        super(props);

        //console.log("Today.js", props.docs_id);

    }

    render(){

        let display_history_orders = this.props.History_Orders;

        return(
            display_history_orders.map((order, idx)=> {
                return(
                    <div key={idx}>
                        <HistoryItem tax={this.props.tax} u_key={idx+1} Order_item_info={order} />
                    </div>
                )
            })
        )
    }

}