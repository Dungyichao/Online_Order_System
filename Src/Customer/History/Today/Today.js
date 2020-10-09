import React, { Component } from 'react';
import TodayItem from './TodayItem';

export default class Today extends Component {

    constructor(props) {

        super(props);

        //console.log("Today.js", props.docs_id);

    }

    render(){

        let display_data_id = this.props.docs_id;

        return(
            display_data_id.map((doc_id, idx)=> {
                return(
                    <div key={idx}>
                        <TodayItem firebase={this.props.firebase} doc_id={doc_id} tax={this.props.tax} u_key={idx+1}/>
                    </div>
                )
            })
        )
    }

}