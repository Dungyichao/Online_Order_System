import React, {Component} from 'react';
import Scroll from '../../Components/Scroll';
import DishList from './DishList';
import {GetMenu_Dish} from '../../Firebase/menu';
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
    
    


    render(){
        //console.log("CurrentMenu Render this.state.data: ", this.state.data);
        let {data} = this.state;
        return(
            <div style={{                    
                margin: '8px 4px 8px 4px',
                padding: '2px 2px 5px 2px',
            }}>
                <div style={{                    
                    margin: '10px 2px 5px 2px',
                    backgroundColor: '#D3D6DA',
                }}>
                    <Scroll>
                        <DishList data_array={data} />
                    </Scroll>
                </div>
                <div style={{                    
                margin: '2px 2px 8px 4px',
                padding: '2px 2px 5px 2px',
                }}>
                    <Button variant="secondary">Add New</Button>{'   '}
                    <Button onClick={this.Get_Menu_Dish_Handler} >Refresh</Button>
                </div>
                
            </div>
        );
    }

}

