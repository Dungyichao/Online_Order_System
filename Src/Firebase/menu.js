
export class MenuInformation{
    constructor(){
        this.id = '';
        this.dish_name = '';
        this.price = '';
        this.status = '';
        this.descript = '';
        this.item_number = '';
        this.note = '';
        this.hot = '';

    }
    
}


export class MenuAddInformation{
    constructor(){
        this.id = '';
        this.dish_name = '';
        this.price = '';
        this.status = '';
        this.descript = '';
        this.item_number = '';
        this.note = '';
        this.hot = '';

    }
    
}



export const GetMenu_Dish = (myFirebase, finddoc,cb = () => {}) => {

    let query_data = [];

    myFirebase.firestore.collection("Menu").doc(finddoc).collection("Item").orderBy("item_number").get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        query_data = [data];
        return cb(null, query_data);
    }).catch(err => {
        return cb(err, null);
    })    
};


/*

export const Get_Tax = (myFirebase, cb = () => {}) => {

    myFirebase.firestore.collection("Menu").doc("Tax").get().then(querySnapshot => {
        //console.log("Firebase: ", querySnapshot.data());
        const data = querySnapshot.data();
        return cb(null, data.rate);
    }).catch(err => {
        return cb(err, 0);
    })    
};


export const Get_Tax_Rate = (myFirebase, cb = () => {}) => {

    myFirebase.firestore.collection("Admin").doc("Setting").get().then(querySnapshot => {
        //console.log("Firebase: ", querySnapshot.data());
        const data = querySnapshot.data();
        return cb(null, data.TaxRate);
    }).catch(err => {
        return cb(err, 0);
    })    
};

*/