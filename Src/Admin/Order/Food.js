import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';


export default class FoodList extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        let display_data = this.props.data_array;

        //let null_page = [];
        //console.log("Data in Food.js: ", display_data)

        if (display_data[0]) {
            return (
                display_data.map(
                    (food_item, idx) => {
                        return (
                            <div key={idx} style={div_item_style}>
                                <FoodItem u_key={idx + 1}
                                    food_item_info={food_item} />
                            </div>
                        );
                    }
                )
            )
        }
        else {
            return (
                <div style={div_item_style}>
                    <p>No Food Item</p>
                </div>
            );
        }

    }

}


const FoodItem = (props) => {
    return (
        <div style={item_style}>
            <div style={{ flex: '1' }}>{props.u_key}.</div>
            <div style={{ flex: '7' }}>
                <div>
                    {props.food_item_info.dish_name}{'  '}
                    {props.food_item_info.extra_add ? props.food_item_info.extra_add.map((item, idx) => {
                        return (
                            <Badge variant="dark" style={{ margin: '0px 2px' }} key={idx}> {`+ ${item.name}`}</Badge>
                        )
                    }) : null}
                    {props.food_item_info.fried_rice ? props.food_item_info.fried_rice.map((item, idx) => {
                        return (
                            <Badge variant="success" style={{ margin: '0px 2px' }} key={idx}> {`${item.name}`}</Badge>
                        )
                    }) : null}

                </div>
            </div>
            <div style={{ flex: '2', textAlign: 'right' }}>X {props.food_item_info.qty}</div>
            <div style={{ flex: '2', textAlign: 'right' }}>${props.food_item_info.Tprice}</div>
        </div>
    );
}


const div_item_style = {
    margin: '1px 5px',
}

const item_style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
}