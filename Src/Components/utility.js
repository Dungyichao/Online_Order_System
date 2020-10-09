export function formatted_string(pad, user_str, pad_pos) {
    //console.log(user_str);
    if (typeof user_str === 'undefined')
        return pad;
    if (pad_pos == 'l') {
        return (pad + user_str).slice(-pad.length);
    }
    else {
        return (user_str + pad).substring(0, pad.length);
    }
}

export function checkisEmpty(obj) {

    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function get_current_timestring() {

    let newDate = new Date();
    let date = formatted_string('00', newDate.getDate(), 'l');
    let month = formatted_string('00', newDate.getMonth() + 1, 'l');
    let year = formatted_string('0000', newDate.getFullYear(), 'l');
    let hours = formatted_string('00', newDate.getHours(), 'l'); //To get the Current Hours
    let min = formatted_string('00', newDate.getMinutes(), 'l'); //To get the Current Minutes
    let sec = formatted_string('00', newDate.getSeconds(), 'l'); //To get the Current Seconds
    let timestamp = `${year}${month}${date}${hours}${min}${sec}`

    return timestamp;
}

export function get_current_datestring() {

    let newDate = new Date();
    let date = formatted_string('00', newDate.getDate(), 'l');
    let month = formatted_string('00', newDate.getMonth() + 1, 'l');
    let year = formatted_string('0000', newDate.getFullYear(), 'l');

    let timestamp = `${year}${month}${date}`

    return timestamp;
}

export function convert_timestring_read(timestring) {
    if (timestring.length >= 14) {
        let year = timestring.substring(0, 4);
        let month = timestring.substring(4, 6);
        let day = timestring.substring(6, 8);
        let hours = timestring.substring(8, 10); //To get the Current Hours
        let min = timestring.substring(10, 12); //To get the Current Minutes
        let sec = timestring.substring(12, 14); //To get the Current Seconds
        let readstring = `${year}/${month}/${day}   ${hours}:${min}:${sec}`

        return `${readstring}`
    }
    return timestring

}

export function phone_display(phone) {

    if (phone) {
        let phone_string = phone.toString();
        if (phone_string.length >= 10) {
            return `${phone_string.substring(0, 3)}-${phone_string.substring(3, 6)}-${phone_string.substring(6, 10)}`
        }
        else {
            return phone
        }

    }

}

export function name_display(Firstname, Lastname){
    if(Firstname && Lastname){
        return Firstname + ", " + Lastname
    }
    else{
        return null;
    }

}

export function email_display(email){
    if(email){
        var spli = email.split("@", 2);
        //console.log(spli);
        if(spli[1] === "phone.com"){
            return null;
        }
        else{
            return email;
        }
        
    }
    return null;
}

export function open_time_display(open, close) {
    let open_string = open.toString();
    let close_string = close.toString();
    if (open_string.length >= 4 && close_string.length >= 4) {
        return `${open_string.substring(0, 2)}:${open_string.substring(2, 4)} ~ ${close_string.substring(0, 2)}:${close_string.substring(2, 4)}`
    }
    else {
        return `${open} ~ ${close}`
    }
}

export function display_order_id_digit(order_id) {
    let id_len = order_id.length;
    //console.log("Original order id", order_id);
    if (id_len >= 13) {
        //console.log("order id digit only:", order_id.substring(id_len-14, id_len));
        return order_id.substring(id_len - 13, id_len);
    }
    else {
        return order_id
    }

}

export function orderprice_to_tax(order_price, tax_rate) {
    let tax_price = Math.ceil(order_price * tax_rate) / 100;
    return tax_price;
}

export function add_two_price(priceone, pricetwo) {
    let order_price = priceone;
    order_price = (Math.round(order_price * 100) + Math.round(pricetwo * 100)) / 100;
    return order_price
}

export function subtract_two_price(firstprice, secondprice) {
    let order_price = firstprice;
    order_price = (Math.round(order_price * 100.0) - Math.round(secondprice * 100.0)) / 100;
    return order_price
}