import React, { Component } from 'react';
import * as Firebase_Orders from '../../Firebase/orders';
import { Button, Badge } from 'react-bootstrap';

import OrderList from './OrderList';
import Scroll from '../../Components/Scroll';
import SearchBox from '../../Components/SearchBox';
import * as Utility from '../../Components/utility';
import {Get_Tax_Rate} from '../../Firebase/admin';


export default class OrderEdit extends Component {

    constructor(props) {

        super(props);

        window.scrollTo(0, 0);
        this.firebase = props.firebase;

        this.state = {
            orders_data: [],
            tax: 0,
            searchfield: '',
        }

        this.refresh_firebase_data = this.refresh_firebase_data.bind(this);
        this.filter_data = this.filter_data.bind(this);
        this.original_data = this.original_data.bind(this);
        this.clear_data = this.clear_data.bind(this);
        this.update_status = this.update_status.bind(this);
        this.get_tax_rate = this.get_tax_rate.bind(this);
        
        this.refresh_firebase_data(Utility.get_current_datestring());
        this.get_tax_rate();
    }


    componentWillUnmount(){
        if(this.unsubscribe){
            this.unsubscribe();
        }
        //https://brandonlehr.com/reactjs/2018/11/08/unsubscribing-from-firestore-realtime-updates-in-react
        //https://stackoverflow.com/questions/55905711/componentwillunmount-to-unsubscribe-from-firestore
        //https://www.debuggr.io/react-update-unmounted-component/#:~:text=Warning%3A%20Can't%20perform%20a,in%20a%20useEffect%20cleanup%20function.
        //https://firebase.google.com/docs/firestore/query-data/listen
      }


    update_status(order_id, to_status){
        //console.log("In Order.js change order: ", order_id, "to status: ", to_status);
        Firebase_Orders.Get_Doc_ID(this.firebase, order_id, (err, doc_id) => {
            if(err){
                console.log("Order.js Update Status error: ", err);
            }
            else{             
                Firebase_Orders.UpdateOrder_Status(this.firebase, doc_id, to_status, (err, order_info) => {
                    if(err){
                        console.log("Order.js Update Status error: ", err);
                    }
                    else{
                        console.log("Order.js Update Status Success");
                    }
                });
                
                console.log("doc_id: ",doc_id, "to_status", to_status);
                if(to_status === 'Confirm' || to_status === 'Complete'){
                    console.log("send Email / SMS");
                    
                }
            }
        })
        
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

    refresh_firebase_data(datastring) {
        //this.setState({orders_data: []});
        Firebase_Orders.GetOrder_Listen_Unsubscribe(this.firebase, datastring, (err, data_array, unsubscribe) => {
            if (err) {
                //console.log("Firebase Get Orders Error: ", err);
                //return unsubscribe;
            }
            else {
                //console.log("Get Orders from Firebase: ", data_array);
                this.unsubscribe = unsubscribe;
                this.setState({ orders_data: data_array });
                //return unsubscribe;
            }
        })

    }

    filter_data(data_array, criteria) {
        //console.log("Going to filter", data_array[0]);
        if (data_array[0]) {
            const newlist = data_array[0].filter((item) => item.status == criteria);
            //console.log("newlist", newlist);
            //console.log("Original", data_array)
            return (newlist);
        }
        else {
            return ([]);
        }
    }

    original_data(data_array){
        if (data_array[0]) {
            //console.log(data_array[0])
            if(this.state.searchfield === ''){
                const newlist = data_array[0];
                return (newlist);
            }
            else{
                
                const search_list = data_array[0].filter((item => {
                    return item.id.includes(this.state.searchfield) || item.user_info.Fname.toLowerCase().includes(this.state.searchfield) ||
                    item.user_info.Lname.toLowerCase().includes(this.state.searchfield) || item.user_info.email.toLowerCase().includes(this.state.searchfield) ||
                    item.user_info.phone.includes(this.state.searchfield)
                }));
                return (search_list);
            }
            
        }
        else {
            return ([]);
        }
    }

    clear_data() {
        this.setState({ orders_data: [] });
        this.refresh_firebase_data(Utility.get_current_datestring());
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
      }


    render() {

        let issued_data = this.filter_data(this.state.orders_data, "Issued");
        let confirmed_data = this.filter_data(this.state.orders_data, "Confirmed");
        let complete_data = this.filter_data(this.state.orders_data, "Complete");
        let cancel_data = this.filter_data(this.state.orders_data, "Cancel");
        let paid_data = this.filter_data(this.state.orders_data, "Paid");
        let original_data = this.original_data(this.state.orders_data, null);

        //console.log(original_data);


        return (
            <div>


                <Button onClick={this.clear_data} style={{
                    margin: '10px 0px 0px 10px',
                }}>Refresh</Button>

                <div style={{
                    margin: '10px 30px 5px 30px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexWrap: 'wrap',
                }}>
                    <div style={{
                        flex: '7',
                        margin: '2px'
                    }}>
                        <div style={order_style}>
                            <div style={header_style}>
                                <div style={{ flex: '7' }}><h3 style={header_font}><Badge variant="warning">New Issue</Badge></h3></div>
                                <div style={{ flex: '5', textAlign: 'right', }}>Total: {issued_data.length}</div>
                            </div>
                            <div style={{ backgroundColor: '#F4EDD3' }}>
                                <Scroll>
                                    <OrderList data_array={issued_data} update_status={this.update_status} tax={this.state.tax} />
                                </Scroll>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        flex: '5',
                        margin: '2px'
                    }}>
                        <div style={order_style}>
                            <div style={header_style}>
                                <div style={{ flex: '7' }}><h3 style={header_font}><Badge variant="success">Confirmed</Badge></h3></div>
                                <div style={{ flex: '5', textAlign: 'right', }}>Total: {confirmed_data.length}</div>
                            </div>
                            <div style={{ backgroundColor: '#C8E9DD' }}>
                                <Scroll>
                                    <OrderList data_array={confirmed_data} update_status={this.update_status} tax={this.state.tax} />
                                </Scroll>
                            </div>
                        </div>
                    </div>

                </div>


                <div style={{
                    margin: '20px 30px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexWrap: 'wrap',
                }}>




                    <div style={{
                        flex: '4',
                        margin: '2px'
                    }}>
                        <div style={order_style}>
                            <div style={header_style}>
                                <div style={{ flex: '7' }}><h3 style={header_font}><Badge variant="primary">Complete</Badge></h3></div>
                                <div style={{ flex: '5', textAlign: 'right', }}>Total: {complete_data.length}</div>
                            </div>
                            <div style={{ backgroundColor: '#D0E0E9' }}>
                                <Scroll>
                                    <OrderList data_array={complete_data} update_status={this.update_status} tax={this.state.tax}/>
                                </Scroll>
                            </div>

                        </div>
                    </div>

                    <div style={{
                        flex: '4',
                        margin: '2px'
                    }}>
                        <div style={order_style}>
                            <div style={header_style}>
                                <div style={{ flex: '7' }}><h3 style={header_font}><Badge variant="dark">Paid</Badge>{' '}/{' '}<Badge variant="danger">Cancel</Badge></h3></div>
                                <div style={{ flex: '5', textAlign: 'right', }}>Total: {paid_data.concat(cancel_data).length}</div>
                            </div>
                            <div style={{ backgroundColor: '#F3D9D9' }}>
                                <Scroll>
                                    <OrderList data_array={cancel_data.concat(paid_data)} update_status={this.update_status} tax={this.state.tax} />
                                </Scroll>
                            </div>

                        </div>
                    </div>

                </div>




                    
                <div style={{
                    margin: '10px 30px 5px 30px',
                    padding: '10px 0 0 0',
                    borderTop: '5px solid #ABACAB'
  
                }}>
                    <div style={order_style}>
                            <div style={header_style}>
                                <div style={{ flex: '2' }}><h3 style={header_font}>Overview</h3></div>
                                <div style={{ flex: '5' }}><SearchBox searchChange={this.onSearchChange}/></div>
                                <div style={{ flex: '3', textAlign: 'right', }}>Total: {original_data.length}</div>
                            </div>
                            <div style={{ backgroundColor: '#D0D8DF' }}>
                                <Scroll>
                                    <OrderList data_array={original_data} update_status={this.update_status} tax={this.state.tax} />
                                </Scroll>
                            </div>

                        </div>

                </div>


            </div>
        );

    }


}

const order_style = {
    border: "1px solid #ABB8C3",
    borderRadius: "9px",
    padding: "5px 5px",
    backgroundColor: '#FBFCFD',  //  

}

const header_style = {
    display: 'flex',
    flexDirection: 'row',


}

const header_font = {
    color: "#555555",
}