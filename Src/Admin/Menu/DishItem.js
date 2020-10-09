import React, { Component } from 'react';
import { Toast, Button } from 'react-bootstrap';
import { MenuInformation } from '../../Firebase/menu';


export default class DishItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rec_data: props.menu_info,
            showToast: false
        }

        this.toggleShowToast_handle = this.toggleShowToast_handle.bind(this);


    }

    toggleShowToast_handle() {
        let { showToast } = this.state;
        showToast = !showToast;
        this.setState({ showToast: showToast });
    }

    render() {

        let { rec_data, showToast } = this.state;

        const status = rec_data.status;

        return (
            <div>

                <Button onClick={this.toggleShowToast_handle}
                        style={{
                            backgroundColor: status === 'Available' ? 'green' : 'red',
                            color: status === 'Available' ? 'white' : 'black'
    
                        }}>
                    {rec_data.item_number}. {rec_data.dish_name}   ${rec_data.price}
                </Button>


                <Toast
                    show={showToast}
                    onClose={this.toggleShowToast_handle}
                    style={{
                        backgroundColor: status === 'Available' ? 'green' : 'red',
                        color: status === 'Available' ? 'white' : 'black',
                        width: 'max-width',
                    }}>
                    <Toast.Header>

                        <strong className="mr-auto">{rec_data.item_number}. {rec_data.dish_name}   ${rec_data.price}</strong>
                        <small>{rec_data.status}</small>
                    </Toast.Header>
                    <Toast.Body>{rec_data.descript}</Toast.Body>
                    <Button variant="info">Edit</Button>
                </Toast>

            </div>
        );
    }

}