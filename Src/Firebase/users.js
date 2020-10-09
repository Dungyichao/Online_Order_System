
export class UserInformation {
  constructor() {
    this.Fname = '';
    this.Lname = '';
    this.uid = '';
    this.phone = '';
    this.email = '';
    this.password = '';
    this.status = '';
    this.note = '';
    this.method = '';

  }

}


export const AddUser = (myFirebase, userinfo, cb = () => { }) => {

  let batch = myFirebase.firestore.batch();
  let { phone, email, status, note, Fname, Lname, method } = userinfo;

  batch.set(myFirebase.firestore.collection("users").doc("customer").collection("account").doc(),
    {
      Fname: Fname,
      Lname: Lname,
      phone: phone,
      email: email,
      status: status,
      note: note,
      method: method,
    }
  );
  batch.commit().then(() => {

  }).catch((err) => {
    return cb(err, null);
  }).finally(() => {
    return cb(null, email);
  });

};


//https://stackoverflow.com/questions/49841855/how-check-if-the-email-in-firebase-is-verified-in-react-native
export const loginUser = (myFirebase, email, password, cb = () => { }) => {

  var actionCodeSettings = {
    // After email is verified, the user will be give the ability to go back
    // to the sign-in page.
    url: 'https://eggrollchenscorder.web.app/signin',
    handleCodeInApp: false
  };
  
  myFirebase.auth.signInWithEmailAndPassword(email, password).then(() => {
    myFirebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        //console.log("Success signed in and get user data: ", user);
        //console.log("user.emailVerified", user.emailVerified)
        if (user.emailVerified === false) {
          user.sendEmailVerification(actionCodeSettings).then(function () {
            console.log("Success sent email")
            return cb("Email need verify", user)
          }).catch(function (error) {
            console.log("Error sent email:", error);
            return cb("Send Email Error", user);
          });
        }
        else {
          return cb(null, user)
        }

      }
      else {
        console.log("failed")
      }
    })
  })
    .catch(error => {
      return cb(error, null);
    });

  



};

export const loginUserPhone = (myFirebase, phone, password, cb = () => { }) => {

  myFirebase.auth.signInWithEmailAndPassword(phone, password).then((result) => {
    return cb(null, result)
  })
    .catch(error => {
      return cb(error, null);
    });

};


export const SignUpUser = async (myFirebase, email, password, cb = () => { }) => {

  //console.log(email, password);
  try {
    const user = await myFirebase.auth.createUserWithEmailAndPassword(email, password);
    //console.log("Return new user", email);
    return cb(null, email);

  }
  catch (error) {
    //console.log("Error here")
    return cb(error, null);
  }

};

export const Verify_Phone = (myFirebase, appVerifier, phone, cb = () => { }) => {

  phone = "+1 " + phone;


  myFirebase.auth.signInWithPhoneNumber(phone, appVerifier).then(function (confirmationResult) {

    return cb(null, confirmationResult);
    //window.confirmationResult = confirmationResult;
  }).catch(function (error) {
    return cb(error, null);
  });
}



export const GetUser_Profile_Email = (myFirebase, email, cb = () => { }) => {

  //let query_data = [];

  myFirebase.firestore.collection("users").doc("customer").collection("account").where("email", "==", email).get().then(querySnapshot => {
    const id = querySnapshot.docs.map(doc => doc);
    const data = querySnapshot.docs.map(doc => doc.data());
    //console.log("Doc id: ", id[0].id);
    return cb(null, [id[0].id, data]);
  }).catch(err => {
    return cb(err, null);
  })
};

export const GetUser_Profile_Phone = (myFirebase, phone, cb = () => { }) => {

  myFirebase.firestore.collection("users").doc("customer").collection("account").where("phone", "==", phone).get().then(querySnapshot => {
    const id = querySnapshot.docs.map(doc => doc);
    const data = querySnapshot.docs.map(doc => doc.data());
    //console.log("Doc id: ", id[0].id, " ,data: ", data);
    if(id[0].id){
      return cb(null, [id[0].id, data]);
    }
    else{
      return cb("Cannot get data", null);
    }
    
  }).catch(err => {
    return cb(err, null);
  })
};

export const Firebase_Contain_Phone = (myFirebase, phone, cb = () => { }) => {

  myFirebase.firestore.collection("users").doc("customer").collection("account").where("phone", "==", phone).get().then(querySnapshot => {
    //const id = querySnapshot.docs.map(doc => doc);
    const data = querySnapshot.docs.map(doc => doc.data());
    //console.log("Doc id: ", id[0].id, " ,data: ", data);
    const found = data.find(item => 
      item.method === 'phone'
    )

    return cb(null, found);


    
  }).catch(err => {
    return cb(err, null);
  })
};

export const Get_Admin_Email = (myFirebase, email, cb = () => { }) => {

  myFirebase.firestore.collection("users").doc("admin").collection("account").where("account", "==", email).get().then(querySnapshot => {
    //const id = querySnapshot.docs.map(doc => doc);
    const data = querySnapshot.docs.map(doc => doc.data());
    if (data.length === 0) {
      return cb(null, false);
    }
    else {
      return cb(null, true);
    }
  }).catch(err => {
    return cb(err, false);
  })
}

export const Get_Admin_Phone = (myFirebase, phone, cb = () => { }) => {
  //console.log("Get admin phone")

  myFirebase.firestore.collection("users").doc("admin").collection("account").where("account", "==", phone).get().then(querySnapshot => {
    //const id = querySnapshot.docs.map(doc => doc);
    const data = querySnapshot.docs.map(doc => doc.data());
    if (data.length === 0) {
      return cb(null, false);
    }
    else {
      return cb(null, true);
    }
  }).catch(err => {
    return cb(err, false);
  })
}

export const Firebase_sent_resetpwd_email = (myFirebase, email, cb = () => { }) => {

  var actionCodeSettings = {
    // After email is verified, the user will be give the ability to go back
    // to the sign-in page.
    url: 'https://eggrollchenscorder.web.app/signin',
    handleCodeInApp: false
  };

  if(email){
    myFirebase.auth.sendPasswordResetEmail(email, actionCodeSettings).then(() => {
      return cb(null, 'success')
    }).catch((err) => {
      return cb(err, null)
    })
  }
  

}





/*
https://github.com/GoZaddy/Firebase-auth-article/blob/master/src/Components/PasswordReset.jsx
*/
