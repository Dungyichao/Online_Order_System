import React, { Component } from 'react';
//import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import MenuEdit from './Menu/menu';
import OrderEdit from './Order/Order';
import CustomerOrder from '../Customer/Order/order';
import ErrorBoundary from '../Components/ErrorBoundary';
import TodayHistory from '../Customer/History/TodayHistory';
import Setting from './Setting/Setting';


export default class Console extends Component {

    constructor(props) {

        super(props);

        this.firebase = props.firebase;
        this.user_profile = props.user_profile;

        this.state = {
            show_page: ''
        }

        this.changepage_handle = this.changepage_handle.bind(this);
        this.Order_changePage = this.Order_changePage.bind(this);
        this.SignOut_handle = this.SignOut_handle.bind(this);

    }

    changepage_handle(event) {

        event.persist();
        this.setState({
            show_page: event.target.name
        });
    }

    Order_changePage(){
        //this.setState({show_page: 'UserHistory'});
        this.props.change_page();
    }

    SignOut_handle(){
        localStorage.clear();
    }

    //EggRollChen Order System

    render() {
        let { show_page } = this.props;
        if (show_page === '' || show_page === null) {
            show_page = 'Orders'
    
          }
        return (
            <div>
                
                <ErrorBoundary>
                    {show_page === 'Menus' ? <MenuEdit firebase={this.firebase} /> : null}
                    {show_page === 'Orders' ? <OrderEdit firebase={this.firebase} /> : null}
                    {show_page === 'Setting' ? <Setting firebase={this.firebase} /> : null}
                    {show_page === 'UserOrder' ? <CustomerOrder firebase={this.firebase} user_profile={this.user_profile} changePage={this.Order_changePage} /> : null}
                    {show_page === 'UserHistory' ? <TodayHistory firebase={this.firebase} user_profile={this.user_profile} /> : null}
                </ErrorBoundary>


            </div>

        )

    }

}

const Navbar_style = {
    position: 'sticky', 
    top: '0',
    fontSize:'1.5em',

}


/*



*/