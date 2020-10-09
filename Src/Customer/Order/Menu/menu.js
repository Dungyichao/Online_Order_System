import React, {Component} from 'react';
import CurrentMenu from './CurrentMenu';
import { Tabs, Tab } from 'react-bootstrap';


export default class MenuEdit extends Component{

    constructor(props){

        super(props);

        this.state = {
            show_tab: 'menu',
        }

        this.firebase = props.firebase;
        this.sendinfo_toCart_handle = this.sendinfo_toCart_handle.bind(this);

    }

    sendinfo_toCart_handle(e){
        //console.log("menu.js sendinfo to cart: ", e);
        this.props.CartAdd(e);
    }


    render(){

        let {show_tab} = this.state;

        return(
            <div>
                <CurrentMenu firebase={this.firebase} finddoc={"Dish"} CartAdd={this.sendinfo_toCart_handle} 
                                add_dish_items = {this.props.add_dish_items}
                                fried_rice_items={this.props.fried_rice_items} />
            </div>    

        );
    }

}
