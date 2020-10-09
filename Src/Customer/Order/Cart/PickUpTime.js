import React from 'react';
import { Dropdown } from 'react-bootstrap';

//https://stackoverflow.com/questions/36125038/generate-array-of-times-as-strings-for-every-x-minutes-in-javascript

export const get_time_list = (openhh, openmm, closehh, closemm) => {

    if (closehh > openhh && closehh !== 0 && openhh !== 0) {
        //console.log("get_time_list", openhh, openmm, closehh, closemm)
        var x = 15; //minutes interval
        var times = []; // time array
        var tt = openhh * 60 + openmm; // start time
        //var ap = ['AM', 'PM']; // AM-PM

        var closemin = closehh * 60 + closemm;

        //loop to increment the time and push results in array
        for (var i = 0; tt <= closemin; i++) {
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        } 
        return times
    }
    else {
        return []

    }

    //console.log(times.length);
}


export const PickUpTime_List = (props) => {

    function set_time(e) {
        e.persist();
        //console.log(e.target.value);
        props.change_value(e.target.value);
    }

    let time_list = props.time_list;

    if (time_list.length > 0) {
        return (
            time_list.map((time, idx) => {
                return (
                    <div key={time}>
                        <Dropdown.Item as="button" onClick={set_time} value={time}>{time}</Dropdown.Item>
                    </div>
                )
            })
        )
    }
    else {
        return (
            <div>
                <Dropdown.Item as="button">No Time to Display</Dropdown.Item>
            </div>
        )
    }




}