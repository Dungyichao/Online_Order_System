import React, {Component} from 'react';
import HomeMenuItem from './HomeMenuItem';


export default class HomeMenuList extends Component{

    constructor(props){
        super(props);

        this.sendinfo_toCart_handle = this.sendinfo_toCart_handle.bind(this);

    }

    sendinfo_toCart_handle(e){
        //console.log("DishList.js sendinfo to cart: ", e);
        this.props.CartAdd(e);
    }

    render(){
        let display_data = this.props.data_array;

        //let null_page = [];

        if(display_data[0]){


            return(
                display_data[0].map(

                    (menu_item, idx) => {
                        return(
                            <div style={div_style} key={menu_item.id} >
                                <HomeMenuItem menu_info={menu_item} key={idx} u_key={idx} /> 
                            </div>
                        );
                                           
                    }
                )
            );          

        }
        else{
            return(
                <div>
                    <p>Waiting for Menu Data</p>
                </div>
            );
        }      
    }

}

const div_style = {
    margin:'10px 3px',
}