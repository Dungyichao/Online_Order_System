import React, {Component} from 'react';
import DishItem from './DishItem';


export default class DishList extends Component{

    constructor(props){
        super(props);

        /*
        this.state = {
            display_data:this.props.data_array
        }
        */

    }

    render(){
        let display_data = this.props.data_array;

        //let null_page = [];

        if(display_data[0]){


            return(
                display_data[0].map(

                    (menu_item, idx) => {
                        return(
                            <div key={idx} style={{
                                margin:'10px 3px',                
                                }}>
                                <DishItem menu_info={menu_item} u_key={idx}/> 
                            </div>
                        );
                                           
                    }
                )
            );          

        }
        else{
            return(
                <div>
                    <p>Waiting for getting menu data</p>
                </div>
            );
        }
        


        
       

        
    }

}