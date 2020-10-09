import React, {Component} from 'react';
import Scroll, {Scroll_cell} from '../../../Components/Scroll';
import DishList from './DishList';
import {GetMenu_Dish} from '../../../Firebase/menu';
import { Button } from 'react-bootstrap';


export default class CurrentMenu extends Component{

    constructor(props){

        super(props);

        this.firebase = props.firebase;
        this.finddoc = props.finddoc;

        this.state = {
            data: []
        };

        this.Get_Menu_Dish_Handler = this.Get_Menu_Dish_Handler.bind(this);      
        this.sendinfo_toCart_handle = this.sendinfo_toCart_handle.bind(this);

    }

    Get_Menu_Dish_Handler(){

        this.setState({data: []});

        GetMenu_Dish(this.firebase, this.finddoc, (err, data_receive) => {
            if(err){
                console.log("Get Menu Dish Handler error: ", err);
            }
            else{
                this.setState({data: data_receive});
            }
            
        });
    }

    

    
    componentDidMount(){

        this.Get_Menu_Dish_Handler();

    }

    sendinfo_toCart_handle(e){
        //console.log("CurrentMenu.js sendinfo to cart: ", e);
        this.props.CartAdd(e);
    }
    
    


    render(){
        //console.log("CurrentMenu Render this.state.data: ", this.state.data);
        let {data} = this.state;
        return(
            <div style={{                    
                margin: '8px 4px 8px 4px',
                padding: '2px 15px 5px 2px',
            }}>
                <div style={{                    
                    margin: '10px 2px 5px 2px',
                    backgroundColor: '#F6F7F8',
                    padding:'3px',
                    borderRadius: '10px',
                }}>
                    <Scroll_cell>
                        <DishList data_array={data} CartAdd={this.sendinfo_toCart_handle} 
                            add_dish_items = {this.props.add_dish_items}
                            fried_rice_items={this.props.fried_rice_items} />
                    </Scroll_cell>
                </div>
                <div style={{                    
                margin: '2px 2px 8px 4px',
                padding: '2px 2px 5px 2px',
                }}>
                    <Button onClick={this.Get_Menu_Dish_Handler} >Refresh</Button>
                </div>
                
            </div>
        );
    }

}

