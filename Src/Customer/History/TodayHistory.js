import React, { Component } from 'react';
import Today from './Today/Today';
import History from './History/History';
import * as Firebase_Orders from '../../Firebase/orders';
import * as Utility from '../../Components/utility';
import {Get_Tax_Rate} from '../../Firebase/admin';

import Scroll, {Scroll_cell} from '../../Components/Scroll';

export default class TodayHistory extends Component {

    constructor(props) {

        super(props);

        window.scrollTo(0, 0);
        this.state = {
            today_doc_id : [],
            today_data : [],
            history_data : [],
            tax: 0,
        }
        //console.log("TodayHistory.js user_profile", props.user_profile);
        this.firebase = props.firebase;
        this.user_id = props.user_profile[0];
        this.user_profile = props.user_profile[1][0];

        this.Get_Today_Doc_Id = this.Get_Today_Doc_Id.bind(this);
        this.get_tax_rate = this.get_tax_rate.bind(this);
        this.Get_History_Docs = this.Get_History_Docs.bind(this);

        this.get_tax_rate();
        this.Get_Today_Doc_Id();
        this.Get_History_Docs();
    }

    get_tax_rate(){
        Get_Tax_Rate(this.firebase, (err, tax) => {
            if(err){
            }
            else{
                this.setState({tax: tax});
            }
        })

    }

    Get_History_Docs(){
        Firebase_Orders.Get_Personal_HistoryOrder(this.firebase, this.user_id,(err, data_array) => {
            
            if (err) {
                console.log("Firebase Get Today Personal Orders ID Error: ", err);
            }
            else {
                //console.log("Get History Orders from Firebase: ", data_array);
                this.setState({ history_data: data_array });
            }
        })

    }


    Get_Today_Doc_Id(){
        Firebase_Orders.GetTodayOrder_DOCID_Personal(this.firebase, Utility.get_current_datestring(), this.user_id,(err, data_array) => {
            
            if (err) {
                //console.log("Firebase Get Today Personal Orders ID Error: ", err);
            }
            else {
                //console.log("Get Orders from Firebase: ", data_array);
                this.setState({ today_doc_id: data_array });
            }
        })

    }


    render(){

        return(
            <div style = {divstyle}>
                <div>
                    <h3>Today Order</h3>
                    <Scroll_cell>
                        {this.state.today_doc_id[0] ? 
                        <Today docs_id = {this.state.today_doc_id} firebase = {this.firebase} tax={this.state.tax} /> 
                        : <p>No Today's Order</p>}
                    </Scroll_cell>
                    
                </div>
                <div>
                    <h3>History Order</h3>
                    <Scroll_cell>
                        {this.state.history_data[0] ? 
                        <History History_Orders = {this.state.history_data} tax={this.state.tax} /> 
                        : <p>No History Order</p>}
                        
                    </Scroll_cell>
                </div>
                
            </div>
        )
        
    }

}

const divstyle = {
    margin:'5px 20px 5px 20px'
}