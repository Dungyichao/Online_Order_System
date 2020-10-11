# Online Order System with React and Firebase
This project is to help a local restaurant in Columbia SC to provide online order service (because of COVID-19). We host the project on Google Firebase for free. I will summarize the design concept, code structure in this tutorial. The coding environment is in Ubuntu OS and Visual Studio Code IDE.

# 1. What is the Goal <br />
Let's list out the requirement for an online order service and the programming structure in the following. <br />

**1.1 Requirement**
* Public users can review the information and menu of the restaurant. They can sign up or sign in to their account.
* Registered customer can see the menu and place order.
* Boss can review customers' orders and change the status of each order. Boss can disable online order service.
<p align="center">
<img src="/Doc/img/requirement.PNG" height="30%" width="30%">  
</p>
    
**1.2 App Category**    
According to the above requirement, we can categorize our programming design into 6 catergories
<p align="center">
<img src="/Doc/img/category.PNG" height="90%" width="90%">  
</p>

**1.3 Final Result** <br />
Let's have a look at the final result. First one is the GIF of the regular customer demonstration. After the customer place the oder, he or she can view the order status in real time.
<p align="center">
<img src="/Demo/Customer.gif" height="25%" width="25%"> 
</p>  

Second, the demonstration of boss view. There is a console for boss to review, edit, and search all the orders and their status. 
<p align="center">
<img src="/Demo/Boss.gif" height="90%" width="90%"> 
</p>

# 2. Configuration <br />
Three major programming thing we need to deal with: React, Reac-bootstrap, Firebase Database. 

## 2.1 Install and Create React App Porject
```linux
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_12.x |sudo -E bash -
$ sudo apt install nodejs
$ sudo apt-get install -y nodejs
$ sudo apt install npm
$ sudo npm install npm@latest –g
// Create a project folder and then cd to that folder
$ npm init
$ npm start
// A React App Webpage will display
```
## 2.2 Host Project on Firebase
You first create project in Firebase console: https://console.firebase.google.com/

```linux
$ npminstall -g firebase-tools
$ firebase login
//Use gmail account
//Go into React project folder
$ npm start
$ npm run-script build
$ firebase init
// Select: Database, Hosting, (Functions can be add later)
// Select: Use an existing project
// What do you want to use as your public directory? build
// Configure as a single-page app (rewrite all urls to /index.html)? Yes
// File build/index.html already exists. Overwrite? N
$ firebase deploy
// You now can visit the website from browser which URL that Firebase gave you.
```
# 3. Firebase Data Structure <br />
We can categorize all the datas into 4 collections. 
<table>
    <thead>
        <tr>
            <th align="center">Collection</th>
            <th align="center">Detail</th>
            <th align="center">Field</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">Admin</td>
            <td align="Left">This collection contains 3 documents: ExtraAdd, FriedRice, and Setting. <br /> * Administrator can modify the open hour, tax rate, and online order service avalibility in <b>Setting</b> document. <br /> * <b>ExtraAdd</b> document contains the add items to each dish <br /> * <b>FriedRice</b> document contain the fried rice items accompany with each dish</td>
            <td align="Left">...</td>
        </tr>
        <tr>
            <td align="center">Menu</td>
            <td align="Left">Contains all the dishs name, price, description, hot value, item number, status (Available/Stop), id (AutoID from Firebase)</td>
            <td align="Left"> * <b>id (string)</b>: AutoID from Firebase <br /><br /> * <b>dish_name (string)</b>: <br /><br /> * <b>price (number)</b>: <br /><br /> * <b>status (string)</b>: only Available or Stop<br /><br /> * <b>descript (string)</b>: Description of the dish<br /><br /> * <b>item_number (number)</b>: Item number provide from administrator, should be unique <br /><br /> * <b>note (null)</b>: <br /><br /> * <b>hot (number)</b>: spicy degree <br /><br />  </td>
        </tr>
        <tr>
            <td align="center">Orders</td>
            <td align="Left">Orders collections contain all the order information from customers. Each day has its own document named with its date such as 20201229. Information contains in each order is displayed in the right column.</td>
            <td align="Left">* <b>customer_id (string)</b>: customer id when customer signed up an account <br /><br /> * <b>id (string)</b>: This is the id for this order itself, the value contains customer id and the order time (number of milliseconds elapsed since January 1, 1970. From JavaScript: Date.now() function). This will make sure that each order has its unique id.<br /><br /> * <b>order_items (array)</b>: this is a array, each object in this array contains the dish name, extra_add item, fried_rice item, quantity, total price from this object only (no tax included) <br /><br /> * <b>pickup_time (string)</b> <br /><br /> * <b>price (number)</b>: sum of all object price (no tax included) <br /><br /> * <b>status (string)</b>: It will have 4 different value, Issued, Confirmed, Complete, Paid, Cancel. This status will be edit by administrator. <br /><br /> * <b>user_info (map)</b>: The user info which provided from user sign up information. <br /><br /> * <b>time (string)</b>: the time when customer place the order</td>
        </tr>
        <tr>
            <td align="center">users</td>
            <td align="Left">Information of each user's when customer sign up</td>
            <td align="Left">* <b>Fname (string)</b>: First name<br /><br /> * <b>Lname (string)</b>: Last name <br /><br /> * <b>email (string)</b>: <br /><br /> * <b>phone (string)</b>: <br /><br /> * <b>method (string)</b>: sign up method, by phone or email. We don't need this field<br /><br /> * <b>note (string)</b>: no function at this moment<br /><br />  * <b>status (string)</b>: no function at this moment <br /><br /> </td>
        </tr>
    </tbody>
</table>
</p>

## 3.1 Admin Collections
### 3.1.1 ExtraAdd
<p align="center">
<img src="/Doc/img/Firebase_Admin_Data_ExtraAdd.png" height="100%" width="100%">  
</p>

### 3.1.2 FriedRice
<p align="center">
<img src="/Doc/img/Firebase_Admin_Data_FriedRice.png" height="100%" width="100%">  
</p>

### 3.1.3 FriedRice
<p align="center">
<img src="/Doc/img/Firebase_Admin_Data_Setting.png" height="100%" width="100%">  
</p>

## 3.2 Menu Collections
<p align="center">
<img src="/Doc/img/Firebase_Menu_Data.png" height="100%" width="100%">  
</p>

## 3.3 Orders Collections
<p align="center">
<img src="/Doc/img/Firebase_Order_Data.png" height="100%" width="100%">  
</p>

## 3.4 users Collections
<p align="center">
<img src="/Doc/img/Firebase_User_Data.png" height="100%" width="100%">  
</p>

# 4. Programming <br />
We are not going to dive into the code, but we will focus more on the concept (becuase you may find many useful tutorials guide you through the code and I will provide the link). Although this is a small project, it includes more than 60 files of codes, we need to archive them into folders. The following chart is the relationship of each folder and their corresponding function and web page. (Please click the image to enlarge for more clear view)

<p align="center">
<img src="/Doc/img/code_structure.png" height="100%" width="100%">  
</p>

## 4.1 Firebase <br />
The firebase object is in code: ```Src/Firebase/firebase.js```. However, this object will be initialized and created in ```App.js``` and you should only create it once, and then pass this initialized object into other components for further usage. If you don't go through this manner, you are prone to get error like: ***you cannot initializeApp() more than once.*** Notice that, cause we've initialize the firebase object, so when we call some function provided by firebase, the syntax might be little different from the official document.

### 4.1.1 Unsubscribing from Firestore Realtime updates in React
We want the boss to be able to receive the new issued orders from customer as soon as customer submits it. We need to use ***onSnapshot()*** function and return a ***unscribe function*** when we start listening the table. Just right before we close the page which is listening to table, we need to call the ***unsubsccribe function*** (which we return from start listening) to terminate the listening. You may find the implementation in ```Src/Admin/Order/Order.js  refresh_firebase_data() and componentWillUnmount()``` and ```Src/Components/order.js   GetOrder_Listen_Unsubscribe```
https://brandonlehr.com/reactjs/2018/11/08/unsubscribing-from-firestore-realtime-updates-in-react

### 4.1.2 Firebase Indexing
When you try to fetch data from Firebase with order or where clause, you might need to give index to the collection (You will see error from console.)
https://firebase.google.com/docs/firestore/query-data/indexing?authuser=2

### 4.1.3 Problem you might encounter <br />

* A. ***Blank webpage after deploy hosting on Firebase***: You need to configure the ```firebase.json``` file (see ```Package_Rule/firebase.json```)
https://stackoverflow.com/questions/52177222/blank-page-after-successful-firebase-deployment
* B. ***Firebase App named DEFAULT already exists***: This error occurs when you trying to initialize firebase again and again. It should be initialized at once.
* C. ***FirebaseError: code=permission-denied: Missing or insufficient permissions***: add the following to your Database Rules tab
```json
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
https://stackoverflow.com/questions/56510745/firebaseerror-code-permission-denied-missing-or-insufficient-permissions
* D. ***Firebase hosting not changing the picture***: Check your ```firebase.json``` and add the following to set the maximum cache time of image. 1800 means 30 minutes.
```json
{
        "source": "**/*.@(jpg|jpeg|gif|png|JPG)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=1800"
          }
        ]
      }
```



### 4.1.4 Firebase Authentication <br />
A good tutorial can be start from here: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial and https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword. 

#### reCAPTCHA and phone authentication
https://blog.bitsrc.io/how-to-build-a-phone-authentication-component-with-react-and-firebase-52813a95f1ec.
This is implement in ```Src/Authentication/phone_auth.js``` and ```Src/Authentication/signin.js``` and ```Src/Authentication/signup.js```. reCAPTCHA should be initialized when the webpage just mounted
```javascript
componentDidMount() {
    window.recaptchaVerifier = new this.firebase.auth_.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (response) {
      },
      'expired-callback': function () {
        console.log("expired-callback");
        this.forceUpdate();
      }
    });

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
}
```
You should also add the following inside the render() so that the reCAPTCHA component can be mounted in the DOM.
```javascript
render(){
    return(
        <div>
            .....
            <div id="recaptcha-container"></div>
            ...
            ...
            ...
        </div>
    )
}
```
When you are going to verify the phone, you need to pass the phone number as well as the ```window.recaptchaVerifier``` to the function ```firebase.auth().signInWithPhoneNumber(....)```



## 4.2 React-router-dom <br />
React-router-dom can provide client user can be redirected without page reload. We use this in ```App.js```.
### 4.2.1 Protected Routes 
Actually, nothing is really protected on the client side, cause all your code are transmitting to client web browser for rendering. Nothing is protected. Protected Routh method can only prevent client from using some functions if they doesn't meet some criteria.
The following link: https://dev.to/mychal/protected-routes-with-react-function-components-dh shows you how to make protected route. You may find the implimentation in ```Src/App.js``` and ```Src/Components/ProtectedRoutes.js```.

## 4.3 React-bootstrap <br />
React-bootstrap provides so much great components such as menu bar, button, form, cards, tabs. They are beautiful and responsive.
Official site: https://react-bootstrap.github.io/getting-started/introduction <br />
Problem you might encounter: <br />
* A. ***The react-bootstrap not working or showing as expected***: Add ```import "bootstrap/dist/css/bootstrap.css";``` in your index.js
* B. ***Increase Toast width***: Add ```style={{maxWidth: '100%'}}```

## 4.4 React <br />
### 4.4.1 Dynamic image path
```javascript
<img src={require(`./img/${img.code}.jpg`)}/>
```
Remember to also check if the dynamic image path exist a picture before render it.
https://stackoverflow.com/questions/54033765/how-to-give-image-src-dynamically-in-react-js <br />
https://stackoverflow.com/questions/54149326/is-there-a-way-to-check-if-an-image-exists-before-setting-the-image-source-in-re <br />
Related question: https://stackoverflow.com/questions/47357311/how-do-i-create-a-dynamic-variable-name-in-react 
use the ```[]``` 
```javascript
this.setState({["level" + (selectedItem.Level+1)]: FilteredListFromClick})
```

Problem you might encounter: <br />
* A. ***Each child in an array should have a unique "key" prop.***: When render component in map, you should do something like the following
```javascript
.......
render(){
    return(
        someObjectArray.map((item, idx) => {
            return(
            <div key={idx}>
                <Component data={item.datas} />
            </div>
            )
        })
    )
}
```
* B. ***React render the list not expected***: This is my own question asked on stack overflow. The problem is, the data in the array are correct (cart data), but after customer remove one item from the cart (object in array), the other data are not render correctly. Someone suggest me to use functional component if I don't need to keep tracking on its state. Finally, I found out that the root cause is during the time customer add the item to cart, I should clear the state of the ```Src/Customer/Order/Menu/DishItem.js``` after sending the data (object) to ```Src/Customer/Order/order.js``` (which hold the array of objects) and then pass it to ```Src/Customer/Order/Cart/CartItem.js``` for rendering.
https://stackoverflow.com/questions/63913020/react-render-list-incorrect-list-is-correct-but-render-overwrite-and-duplicate

* C. ***Add Own icon Logo***: Open the react app in your favorite code editor. Navigate to the public folder and delete the favicon.ico file. Now, add a new favicon inside the public folder.
https://stackoverflow.com/questions/42303813/how-to-add-my-own-svg-image-just-like-logo-is-shown-by-default-in-create-react-a <br />
https://reactgo.com/react-change-favicon/

* D. ***Remove <React.StrictMode>***: Remove <React.StrictMode> will solve the problem in development mode.
    https://stackoverflow.com/questions/53183362/what-is-strictmode-in-react


## 4.5 Javascript <br />
### 4.5.1 Shallow Copy or Deep Clone
Please refer to the document for further knowledge: https://github.com/Dungyichao/Online_Order_System/blob/main/Ref/How%20to%20Deep%20Copy%20Objects%20and%20Arrays%20in%20JavaScript.pdf . <br />
We use lodash library's cloneDeep to performence deep copy of array in ```Src/Customer/Order/order.js```. In our example, the array will store objects which each object represents the item the customer added to the cart (the ```Src/Customer/Order/Cart/cart.js``` would render all the information provided by this array of objects). If customer add or remove any item from the cart (which also means the object in the aray), we need to first deep clone the original array, add or remove object from this new cloned array, then use```setState``` to replace the original array with the new modified array. If you don't use deep clone, the cart would not render as you expected. For example
```javascript
import _ from "lodash"
....
this.state = {
    Cart_data: [],
}
....
remove_item(e) {
        let { Cart_data } = this.state;

        const remove_item = Cart_data.filter((item) => item.uid === e);

        let deepcopy_list = _.cloneDeep(Cart_data);
        const newlist = deepcopy_list.filter((item) => item.uid !== e);
        this.setState({ Cart_data: newlist }, () => {
            //some callback
        });
    }

```
### 4.5.2 Value Operation (Add/Substract)
https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
When I try to add price or substract price from current price, I would get some wierd result, the following can help to prevent it. (```Src/Components/utility.js```)
```javascript
function add_two_price(priceone, pricetwo) {
    let order_price = priceone;
    order_price = (Math.round(order_price * 100) + Math.round(pricetwo * 100)) / 100;
    return order_price
}

function subtract_two_price(firstprice, secondprice) {
    let order_price = firstprice;
    order_price = (Math.round(order_price * 100.0) - Math.round(secondprice * 100.0)) / 100;
    return order_price
}

```
### 4.5.3 Generate a time list
We want to provide customer to select pickup time. This is implement in ```Src/Customer/Order/Cart/PickUpTime.js```
https://stackoverflow.com/questions/36125038/generate-array-of-times-as-strings-for-every-x-minutes-in-javascript
``` javascript
var x = 5; //minutes interval
var times = []; // time array
var tt = 0; // start time
var ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
for (var i=0;tt<24*60; i++) {
  var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
  var mm = (tt%60); // getting minutes of the hour in 0-55 format
  times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
  tt = tt + x;
}

console.log(times);
```

### 4.5.4 Local Sotrage
Whenever user refresh the page which he or she has already login, the login information will be cleared out and user is logged out automatically. In order to address this problem, we need to use logalStorage. You may find the implementation in ```Src/App.js```
```javascript
// setter
localStorage.setItem('myData', data);
 
// getter
localStorage.getItem('myData');
 
// remove
localStorage.removeItem('myData');
 
// remove all
localStorage.clear();
```

https://www.robinwieruch.de/local-storage-react

If you want to store map in localStorage, you need to use the following:
```javascript
localStorage.setItem('user_info', JSON.stringify(user_profiles));
JSON.parse(localStorage.getItem('user_info'))
```
### 4.5.5 Await Async Function
