import { findLastIndex } from 'lodash';
import React, { Component } from 'react';
import { Toast, Button, Card, Image } from 'react-bootstrap';
import * as Utility from '../../Components/utility';

import hot_icon from '../../Pic/hot.PNG';




export default class HomeMenuItem extends Component {

    constructor(props) {
        super(props);


        this.state = {
            rec_data: props.menu_info,
            showToast: false,
            showTooltip: false,

        }

        //this.myRef = React.createRef();

        this.toggleShowToast_handle = this.toggleShowToast_handle.bind(this);

        this.filter_data = this.filter_data.bind(this);

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


    render() {

        let { rec_data, showToast } = this.state;

        const status = rec_data.status;
        const format_num = Utility.formatted_string('000', rec_data.item_number, 'l')

        let load_pic = false;
        let img_src = '';
        try {
            img_src = require(`../../Pic/${format_num}.PNG`);
            load_pic = true;
        }
        catch (err) {
            load_pic = false;
        }

        return (
            <div>
                <Card style={{ width: '100%' }}>
                    <div style={card_style}>
                        <div style={{ flex: '12' }}>
                            <Card.Body>
                                <div style={card_style}>
                                    <div style={{ flex: '9', color: '#656667' }}><Card.Title>{rec_data.item_number}. {rec_data.dish_name} {'         '}
                                        {rec_data.hot > 0 ? <Image src={hot_icon} alt="image" width="25" height="25" style={img_style} /> : null}</Card.Title>
                                    </div>
                                    <div style={{
                                        flex: '3', textAlign: 'center', color: '#64839D',
                                        fontStyle: 'oblique', fontSize: 'medium'
                                    }}>$ {rec_data.price}</div>
                                </div>

                                <div style={card_style}>
                                    <div style={{ flex: '9', }}><Card.Text>{rec_data.descript}</Card.Text></div>
                                    {load_pic ?
                                        <div style={{ flex: '3', display: 'block', margin: 'auto' }}>
                                            <Card.Img variant="top" src={img_src.default} />
                                        </div>
                                        : null}

                                </div>



                            </Card.Body>

                        </div>


                    </div>


                </Card>

            </div>
        );
    }

}


const card_style = {
    display: 'flex',
    flexDirection: 'row',

}

const img_style = {

}
