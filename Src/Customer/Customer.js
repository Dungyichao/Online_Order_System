import React, { Component } from 'react';
//import { Navbar, Nav, Badge } from 'react-bootstrap';

import CustomerOrder from './Order/order';
import ErrorBoundary from '../Components/ErrorBoundary';
import TodayHistory from './History/TodayHistory';

export default class Customer extends Component {

    constructor(props) {

        super(props);

        this.state = {
            show_page: ''
        }

        this.firebase = props.firebase;
        this.user_profile = props.user_profile;

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

    Order_changePage() {
        this.props.change_page();
        //this.setState({ show_page: 'UserHistory' });
    }

    SignOut_handle() {
        localStorage.clear();
    }

    render() {
        let { show_page } = this.props;
        if(show_page === '' || show_page === null){
            show_page = 'UserOrder'
        }
        return (
            <div>
                <ErrorBoundary>
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
    fontSize: '1.5em',

}