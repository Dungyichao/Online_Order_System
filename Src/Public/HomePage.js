import React, { Component } from 'react';
import { Jumbotron, Button, Image } from 'react-bootstrap';

import * as Utility from '../Components/utility';

import building from '../Pic/building.PNG';
import menu002 from '../Pic/002.PNG';
import menu006 from '../Pic/006.PNG';
import menu051 from '../Pic/051.PNG';
import menu020 from '../Pic/020.PNG';
import map from '../Pic/map.PNG';

import { Redirect, Link } from "react-router-dom";


export default class HomePage extends Component {

    constructor(props) {

        super(props);
        this.firebase = props.firebase;

        this.state = {
            redirect: null
        }

        this.redirectPage = this.redirectPage.bind(this);

    }

    redirectPage(event) {
        event.preventDefault();
        //console.log(event.target.name);
        this.setState({ redirect: event.target.name });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }


        return (
            <div>
                <div>
                    <OnlineOrder_Jumbo changepage={this.redirectPage} />
                    <Menu_Jumbo changepage={this.redirectPage} />
                    <Location_Time firebase={this.firebase} open_time={this.props.open_time} />
                    <About_Jumbo />
                </div>

                <div>

                </div>



            </div>
        )
    }

}

const About_Jumbo = (props) => {

    return (
        <Jumbotron style={{ backgroundColor: '#555555', margin: '0 0 0 0', color: '#E8ECF3' }} >
            <h1>About Us</h1>
            <p>
                The Egg Roll Chen was the first Taiwanese restaurant in Columbia, South Carolina.
                It was opened since 1985, and the restaurant building was built with a hexagonal style building with a pointed roof.
                This building was also the first Hardee's restaurant in Columbia.
                Our restaurant was remodeling due to some problems of the old building, and we're reopened in May 2007. Come and enjoy great food and let us serve you!

            </p>
            <a href="https://www.eggrollchen.com/home.html">                
                            <h5 style={{ textAlign: "center", color: '#E4E8EE' }}>Original Egg Roll Chen Website https://www.eggrollchen.com/ </h5>
                        </a>
            <img src={building} alt="image" width="169" height="115" />
        </Jumbotron>
    )

}

const Location_Time = (props) => {

    let open_time = props.open_time;
    let date_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    date_list.forEach((item) => {
        //console.log(item)
        //console.log(open_time[`${item}`]);
    }
    )

    if (props.open_time.Monday) {
        return (
            <Jumbotron style={{ backgroundColor: '#8AB7D1', margin: '0 0 0 0', color: '#E8ECF3' }} >
                <h1 style={{ marginBottom: '20px', color: '#40728F' }}>Location & Open Hour</h1>

                <div style={{ display: 'flex', flexDirection: 'row', }}>
                    <div style={{ flex: '5', marginTop:'1.5em' }}>

                        <a href="https://www.google.com/maps/place/Eggroll+Chen/@33.991435,-80.9703086,15.75z/data=!4m5!3m4!1s0x0:0xc145e95d6c6fdd33!8m2!3d33.9910329!4d-80.9743774">
                            <img style={{ display: 'block', margin: "auto", maxWidth: "90%" }} src={map} alt="Map" />
                            <h5 style={{ textAlign: "center" }}>715 Crowson Rd, Columbia, SC 29205</h5>
                        </a>

                    </div>

                    <div style={{ flex: '7',  textAlign:'center'}}>

                        {date_list.map((item, idx) => {
                            if (open_time[item]["status"] === 'Open') {
                                return (
                                    <div key={idx} style={{ margin: '1em 0px 1em 0px', color:'#E4E9F1', fontSize:'1.3em' }}>
                                        {item} : {Utility.open_time_display(open_time[item]["Open"], open_time[item]["Close"])}
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div key={idx} style={{ margin: '1em 0px 1em 0px', color:'#CF4747', fontSize:'1.3em' }}>
                                        {item} : Close
                                    </div>
                                )
                            }
                        }
                        )}


                    </div>
                </div>



            </Jumbotron>
        )
    }
    else {
        return (
            <div></div>
        )
    }
    //console.log((open_time.Monday)["Open"]);



    /*
    
    
    */



}



const OnlineOrder_Jumbo = (props) => {
    return (
        <Jumbotron style={{ margin: '0 0 0 0' }}>
            <h1>Online Order</h1>
            <p>
                Online order provides realtime tracking and notification. You can also review your order history. Personal information and orders will not
                be revealed to third party or other organization. You won't be charged when you place an order! No extra fee, no waste of time. <br /> <br />
                Drive-through Pick up window is  available for <b>Online Order</b> .  Please call us (803)787-6820 if you have any question.
            </p>
            <p>
                <Button variant="primary" onClick={props.changepage} name="/signup" >Sign Up Now</Button>
            </p>
        </Jumbotron>
    )
}

const Menu_Jumbo = (props) => {

    return (
        <Jumbotron style={{ backgroundColor: '#D9E3F0', margin: '0 0 0 0' }} >
            <h1>Menu</h1>
            <p>
                Delicious Taiwanese style cuisine. All dishes served with fried rice
            </p>
            <div style={{
                margin: '0 0 30px 0',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <div style={menupic_style}>
                    <figure>
                        <Image src={menu002} alt="image" width="169" height="115" style={img_style} />
                        <figcaption>Moo Goo Guy Pan</figcaption>
                    </figure>
                </div>
                <div style={menupic_style}>
                    <figure>
                        <Image src={menu006} alt="image" width="169" height="115" style={img_style} />
                        <figcaption>Pepper Steak</figcaption>
                    </figure>
                </div>
                <div style={menupic_style}>
                    <figure>
                        <Image src={menu051} alt="image" width="169" height="115" style={img_style} />
                        <figcaption>Mamasan's Taiwanese Beef Noodle Soup</figcaption>
                    </figure>
                </div>
                <div style={menupic_style}>
                    <figure>
                        <Image src={menu020} alt="image" width="169" height="115" style={img_style} />
                        <figcaption>Sweet & Sour Chicken</figcaption>
                    </figure>
                </div>




            </div>
            <p>
                <Button variant="primary" onClick={props.changepage} name="/homemenu" >See More Dishes</Button>
            </p>
        </Jumbotron>
    )

}

const menupic_style = {
    margin: '0 5px 0 5px',
    flex: '3',
    alignContent: 'center',
    padding: '5px'

}

const img_style = {
    border: '1px solid #9ECEE9',
    borderRadius: '4px',
    padding: '5px'
}