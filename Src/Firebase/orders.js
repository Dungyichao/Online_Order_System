import * as utility from '../Components/utility';

export class OrderInformation {
    constructor() {
        this.customer_id = '';
        this.id = '';  // order id unique; customer uid + timestamp
        this.time = '';
        this.user_info = []; // customer uid
        this.price = 0;
        this.status = '';  // issued/confirmed/complete/paid/cancel
        this.order_items = [];
        this.pickup_time = '';
        this.note = '';
        this.fried_rice = [];
        this.extra_add = [];

    }
}

export const Get_Doc_ID = (myFirebase, order_id, cb = () => { }) => {

    let docid = '';

    myFirebase.firestore.collection("Orders").doc(`${utility.get_current_datestring()}`).collection("TodayOrder").where("id", "==", order_id).get().then(querySnapshot => {
        const data = querySnapshot.docs.forEach(doc => {
            //console.log(doc.id);
            docid = doc.id;
            
        })
        //console.log("Const", docid);
        return cb(null, docid);
    })
}


export const UpdateOrder_Status = (myFirebase, doc_id, to_status, cb = () => { }) => {

    //console.log("Here")

    myFirebase.firestore.collection("Orders").doc(`${utility.get_current_datestring()}`).collection("TodayOrder").doc(doc_id).update({
        "status": to_status,
    }).then(function() {
        //console.log("Document successfully updated!");
    })

}


export const AddOrder = (myFirebase, orderinfo, cb = () => { }) => {

    let batch = myFirebase.firestore.batch();

    batch.set(myFirebase.firestore.collection("Orders").doc(`${utility.get_current_datestring()}`).collection("TodayOrder").doc(),
        {
            customer_id : orderinfo.customer_id,
            id : orderinfo.id,  // order id unique; customer uid + timestamp
            time : orderinfo.time,
            user_info : orderinfo.user_info, // customer uid
            price : orderinfo.price,
            status : orderinfo.status,  // issued/confirmed/complete/paid/cancel
            order_items : orderinfo.order_items,
            note : orderinfo.note,
            pickup_time : orderinfo.pickup_time,
        }
    );
    batch.commit().then(() => {
        return cb(null, "doc_id");
    }).catch((err) => {
        return cb(err, null);
    });

};

export const GetOrder = (myFirebase, datestring, cb = () => { }) => {
    
    let query_data = [];

    myFirebase.firestore.collection("Orders").doc(datestring).collection("TodayOrder").orderBy("time", "desc").get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        query_data = [data];
        return cb(null, query_data);
    }).catch(err => {
        return cb(err, null);
    })    

}


//https://firebase.google.com/docs/firestore/query-data/listen 
export const GetOrder_Listen = (myFirebase, datestring, cb = () => { }) => {
    
    let query_data = [];

    myFirebase.firestore.collection("Orders").doc(datestring).collection("TodayOrder").orderBy("pickup_time").onSnapshot(function(querySnapshot){
        const data = querySnapshot.docs.map(doc => doc.data());
        query_data = [data];
        return cb(null, query_data);
    }, function(err){
        return cb(null, query_data);
    })  

}

//https://firebase.google.com/docs/firestore/query-data/listen 
export const GetOrder_Listen_Unsubscribe = (myFirebase, datestring, cb = () => { }) => {
    
    let query_data = [];

    const unsubscribe = myFirebase.firestore.collection("Orders").doc(datestring).collection("TodayOrder").orderBy("pickup_time").onSnapshot(function(querySnapshot){
        const data = querySnapshot.docs.map(doc => doc.data());
        query_data = [data];
        return cb(null, query_data, unsubscribe);
    }, function(err){
        return cb(null, query_data, unsubscribe);
    })  

}


export const GetTodayOrder_Personal_Listen = (myFirebase, datestring, order_id, cb = () => { }) => {
    
    let query_data = [];

    //console.log("Get Personal Order data...", order_id)

    const unsubscribe = myFirebase.firestore.collection("Orders").doc(datestring).collection("TodayOrder").doc(order_id)
    .onSnapshot(function(querySnapshot){
        const data = querySnapshot.data();
        //console.log("Order Info: ", data);
        query_data = [data];
        return cb(null, query_data, unsubscribe);
    }, function(err){
        return cb(null, query_data, unsubscribe);
    })  

}

export const GetTodayOrder_DOCID_Personal = (myFirebase, datestring, user_id, cb = () => { }) => {
    
    let query_data = [];

    //console.log("Get Personal Order data...", user_id)

    myFirebase.firestore.collection("Orders").doc(datestring).collection("TodayOrder").where("customer_id", "==", user_id).get().then(querySnapshot => {
        query_data = querySnapshot.docs.map(doc => doc.id);
        //const data = querySnapshot.docs.map(doc => doc.data());
        return cb(null, query_data);
    }).catch(err => {
        return cb(err, query_data);
    })      
}

export const Get_Personal_HistoryOrder = (myFirebase, user_id, cb = () => { }) => {
    
    //let query_data = [];

    myFirebase.firestore.collectionGroup("TodayOrder").where("customer_id", "==", user_id).limit(15).get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log("Personal History Data: ", data);
        //query_data = [data];
        return cb(null, data);
    }).catch(err => {
        return cb(err, null);
    })    

}


