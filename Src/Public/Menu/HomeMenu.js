import React, {Component} from 'react';
import Scroll, {Scroll_menu} from '../../Components/Scroll';
import HomeMenuList from './HomeMenuList';
import {GetMenu_Dish} from '../../Firebase/menu';
import { Button } from 'react-bootstrap';


export default class HomeMenu extends Component{

    constructor(props){

        super(props);

        window.scrollTo(0, 0);

        this.firebase = props.firebase;
        //this.finddoc = props.finddoc;

        this.state = {
            data: []
        };

        this.Get_Menu_Dish_Handler = this.Get_Menu_Dish_Handler.bind(this);      
        

    }

    Get_Menu_Dish_Handler(){

        this.setState({data: []});

        GetMenu_Dish(this.firebase, "Dish", (err, data_receive) => {
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
                margin: '8px 10px 8px 10px',
                padding: '2px 2px 5px 2px',
            }}>
                <h2 style={{textAlign:'center', color:'#656667'}}>Menu</h2>
                <div style={{                    
                    margin: '10px 2px 5px 2px',
                    backgroundColor: '#FAFBFC',
                }}>
                    <Scroll_menu>
                        <HomeMenuList data_array={data} />
                    </Scroll_menu>
                </div>
                <div style={{                    
                margin: '2px 2px 8px 4px',
                padding: '2px 2px 5px 2px',
                }}>
                    {/*<Button onClick={this.Get_Menu_Dish_Handler} >Refresh</Button>*/}
                </div>
                
            </div>
        );
    }

}

