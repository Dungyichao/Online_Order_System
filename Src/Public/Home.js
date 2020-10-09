import React, { Component } from 'react';
import ErrorBoundary from '../Components/ErrorBoundary';
import HomePage from './HomePage';
import * as Firebase_action from '../Firebase/admin';
//import { Link } from 'react-router-dom';


export default class Home extends Component {

    constructor(props) {

        super(props);

        window.scrollTo(0, 0);

        this.state = {
            show_page: '',
            open_list: {},
        }

        this.Get_Open_Time = this.Get_Open_Time.bind(this);
        this.firebase = props.firebase;
        //this.user_profile = props.user_profile;
        this.Get_Open_Time();

    }

    Get_Open_Time(){

        Firebase_action.Get_Open_Time(this.firebase, (err, openlist) => {
            if(err){
                console.log("Geting OpenHour error: ", err);
            }
            else{
                this.setState({open_list: openlist});           
            }
        })
    }



    render() {


        if(this.state.open_list){
            return (
                <div>
                    <ErrorBoundary>
                        <HomePage firebase={this.firebase} open_time={this.state.open_list} />
                    </ErrorBoundary>    
                </div>
    
            )

        }
        else{
            return(
                <div>

                </div>
            )
        }
        
    }


}
