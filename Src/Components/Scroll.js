import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'500px', margin: '0', padding: '0'}}>
            {props.children}
        </div>
    );

};

export const Scroll_cell = (props) => {
    return(
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'550px', margin: '0', padding: '0'}}>
            {props.children}
        </div>
    );

};

export const Scroll_menu = (props) => {
    return(
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'600px', margin: '0', padding: '0'}}>
            {props.children}
        </div>
    );

};

export default Scroll;
