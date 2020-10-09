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

        this.change_tab_handler = this.change_tab_handler.bind(this);

    }

    change_tab_handler(e){
        this.setState({show_tab: e});
    }


    render(){

        let {show_tab} = this.state;

        return(


            <div style={{
                margin:'30px 100px', 
                display: 'flex',
                flexDirection: 'row',     
               
                flexWrap: 'wrap',          
                }}>


                <div style={{
                            flex: '4'
                }} >
                    <h3>Menu / Extra Add</h3>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={show_tab}
                        onSelect={this.change_tab_handler}
                        style={{
                            backgroundColor: 'white',
                            color: '#4796ED',
                        }}
                        >
                        <Tab eventKey="menu" title="Main Menu"
                        style={tab_style}>
                            <CurrentMenu firebase={this.firebase} finddoc={"Dish"}/>
                        </Tab>

                        <Tab eventKey="extra" title="Extra Add"
                        style={tab_style}>
                            <CurrentMenu firebase={this.firebase} finddoc={"Extra"}/>
                        </Tab>
                    
                    </Tabs>

                </div>


                <div style={{
                            flex: '8'
                }} >
                    <h3>Edit/Add</h3>                        
                </div>
                
                
            </div>

        );
    }

}

const tab_style = {
    backgroundColor: '#EAEDF1',
    color: '#4796ED',

}

//<CurrentMenu />