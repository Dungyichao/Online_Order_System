import React, {Component, useState} from 'react';
import { Form, Col } from 'react-bootstrap';


export const DishAdd = (props) => {


    let extra_item = [];
    //console.log("add_dish_items: ", props.add_dish_items);

    if(props.add_dish_items){
        extra_item = props.add_dish_items;
    }
    

    let extra_added = [];

    extra_item.forEach((item, idx) => {
        extra_added[idx] = false;
    })

    function dishadd_item_handle(e) {
        e.persist();
        //console.log(extra_added);
        //console.log(e.target.value)
        //console.log("dishadd_item_handle:", e.target.name, e.target.value);
        extra_added[e.target.value] = !extra_added[e.target.value];
        //console.log(extra_added);
        props.set_ExtraAdd(extra_added)
    }

    //console.log("Return CartItem ", props.u_key,": ",props.Cart_item_info);
    const dishadd_style = {
        margin: '5px 10px',
        padding: '5px',
        backgroundColor: '#E6EAF1',
        fontSize: '1em',
        color: '#424242',
        borderRadius:'10px'
    }

    

    return (
        <div style={dishadd_style}>
            <Form.Label as="legend" sm={2}>
                Add to Dish
            </Form.Label>
            {
                extra_item.map((item, i) => {
                    return (
                        <div  key={i} >
                            <Col>
                                <Form.Check label={`${item.name}${'  $'}${item.price}`} name={item.name} onClick={dishadd_item_handle} value={i} />
                            </Col>
                        </div>


                    )

                })
            }

        </div>
    )
}



export const FriedRice = (props) => {

    //const [Check, setCheck] = useState(false);

    let friedRice_item = props.fried_rice_items;

    function friedrice_item_handle(e) {
        //e.preventDefault();
        //console.log("friedrice_item_handle:", e.target.id)
        
        props.set_FriedRice(e.target.id);
    }

    //console.log("Return CartItem ", props.u_key,": ",props.Cart_item_info);
    const friedRice_style = {
        margin: '5px 10px',
        padding: '5px',
        backgroundColor: '#D5DFEC',
        fontSize: '1em',
        color: '#424242',
        borderRadius:'10px'
    }

    

    return (
        <div style={friedRice_style}>
            <Form.Label as="legend" sm={2}>
                Fried Rice
            </Form.Label>
            {
                
                friedRice_item.map((item, i) => {
                    //console.log(item)
                    return (
                        <div key={i} >
                            <Col>
                                <Form.Check defaultChecked={item.default}  type="radio" 
                                label={`${item.name}${'  $'}${item.price}`} id={item.name} name={"formHorizontalRadios"} 
                                onClick={friedrice_item_handle} />
                            </Col>
                        </div>


                    )

                })
            }

        </div>
    )
}


export class FriedRice_Component extends Component{

    constructor(props){

        super(props);

        this.state = {
            show_tab: 'menu',
        }

        //this.firebase = props.firebase;
        this.friedRice_item = props.fried_rice_items;
        this.friedrice_item_handle = this.friedrice_item_handle.bind(this);

    }

    friedrice_item_handle(e){
        this.props.set_FriedRice(e.target.id);
    }


    render(){

        return (
            <div style={friedRice_styles}>
                <Form.Label as="legend" sm={2}>
                    Fried Rice
                </Form.Label>
                {
                    
                    this.friedRice_item.map((item, i) => {
                        //console.log(item)
                        return (
                            <div key={i} >
                                <Col>
                                    <Form.Check defaultChecked={item.default}  type="radio" 
                                    label={`${item.name}${'  $'}${item.price}`} id={item.name} name={"formHorizontalRadios"} 
                                    onClick={this.friedrice_item_handle} />
                                </Col>
                            </div>
    
    
                        )
    
                    })
                }
    
            </div>
        )
    }

}


const friedRice_styles = {
    margin: '5px 10px',
    padding: '5px',
    backgroundColor: '#D5DFEC',
    fontSize: '1em',
    color: '#424242',
    borderRadius:'10px'
}