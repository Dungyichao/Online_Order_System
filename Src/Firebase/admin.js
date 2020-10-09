
export const Get_Tax_Rate = (myFirebase, cb = () => {}) => {

    myFirebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {
        //console.log("Firebase: ", querySnapshot.data());
        const data = querySnapshot.data();
        return cb(null, data.TaxRate);
    }).catch(err => {
        return cb(err, 0);
    })    
};

export const Get_Order_Status = async (myFirebase) => {
    const cb = () => {}

    const [err,order_result] = await myFirebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {
        
        const data = querySnapshot.data();
        return [null,data.OrderStatus];
    }).catch(err => {
        return [err,false];
    })  
    //console.log(order_result)
    
    return [err,order_result]
};

export const Get_Open_Time = (myFirebase, cb = () => {}) => {
    myFirebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {        
        const data = querySnapshot.data();
        //console.log("Firebase OpenHour: ", data.OpenHour);
        return cb(null, data.OpenHour);
    }).catch(err => {
        return cb(err, []);
    })

}

export const Get_Extra_Add_Items = (myFirebase, cb = () => {}) => {
    myFirebase.firestore.collection("Admin").doc("ExtraAdd").collection('items').get().then(querySnapshot => {
        const query_data = querySnapshot.docs.map(doc => doc.data());        
        //const data = querySnapshot.data();
        //console.log("Firebase Add items: ", query_data);
        return cb(null, query_data);
    }).catch(err => {
        return cb(err, []);
    })
}

export const Get_FriedRice_items = (myFirebase, cb = () => {}) => {
    myFirebase.firestore.collection("Admin").doc("FriedRice").collection('items').get().then(querySnapshot => {
        const query_data = querySnapshot.docs.map(doc => doc.data());        
        //const data = querySnapshot.data();
        //console.log("Firebase Add items: ", query_data);
        return cb(null, query_data);
    }).catch(err => {
        return cb(err, []);
    })
}


export const Get_Admin_Setting = (myFirebase, cb = () => {}) => {
    myFirebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {        
        const data = querySnapshot.data();
        //console.log("Firebase OpenHour: ", data.OpenHour);
        return cb(null, data);
    }).catch(err => {
        return cb(err, []);
    })

}

export const Update_Admin_OrderStatus = (myFirebase, to_status, cb = () => { }) => {

    myFirebase.firestore.collection("Admin").doc('Setting').update({
        "OrderStatus": to_status,
    }).then(function() {
        return cb(null, 'Success');
    })

}