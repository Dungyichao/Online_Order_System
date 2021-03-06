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

## 2.3 Hide Your Code from the Browser
In the package.json
```json
scripts: {
  "build": "GENERATE_SOURCEMAP=false react-scripts build"
}
```
https://stackoverflow.com/questions/51415780/create-react-app-is-showing-all-my-code-in-production-how-to-hide-it


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
            <td align="Left"><b>ExtraAdd</b> <br />* <b>name (string)</b>: add item name<br />* <b>price (number)</b>: price<br /><br /> <b>FriedRice</b> <br /> * <b>default (boolean)</b>: default select option, only free fried rice is default<br /> * <b>name (string)</b>: fried rice item name<br /> * <b>price (number)</b>: fried rice item price<br /><br /> <b>Setting</b> <br /> * <b>OrderStatus (boolean)</b>: whenever customer is going to place the order, system will first check this status, only true can the order be submitted<br /> * <b>TaxRate (number)</b>: Tax rate. If tax rate is 10%, then the value should be 10<br /> * <b>OpenHour (map)</b>: Each date is another map <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Close (number)</b>: Close time, if 21:30, then value should be 2130 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Open (number)</b>: Open time, if 11:00, then value should be 1100 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>day (number)</b>: number of the date, Sunday is 0 where Monday is 1 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>status (string)</b>: only has Close or Open </td>
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

### 3.1.3 Setting
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
When accessing the image from the dynamic path
```javascript
    let load_pic = false;
    let img_src = '';
        try {
            img_src = require(`../../Pic/${var_num}.PNG`);
            load_pic = true;
        }
        catch (err) {
            load_pic = false;
        }
        
     return (
        <div>
            {load_pic ?
                <img src={img_src.default} />;  /* 2020 Dec 07 */
                : null}
        </div>
     )

```
Related question: https://stackoverflow.com/questions/47357311/how-do-i-create-a-dynamic-variable-name-in-react 
use the ```[]``` 
```javascript
this.setState({["level" + (selectedItem.Level+1)]: FilteredListFromClick})
```

### 4.4.2 Problem you might encounter: <br />
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

### 4.4.3 White Space and change line: <br />
```javascript
<p style={{'white-space': 'pre-wrap'}}>
    {"This \n works"}
</p>
```

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
In ES8, there is Await Async syntax for Promise. If there is some data need to be fetch before you do the rest of thing, you need to use this.
```javascript
// from Udemy Course The Complete Web Developer in 2020: Zero to Mastery
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async function (url) {
        const response = await fetch(url);
        return response.json();
      }),
    );
    console.log("users", users);
    console.log("posta", posts);
    console.log("albums", albums);
  } catch (err) {
    console.log("ooooooops", err);
  }
};

async function fetchUsers(){
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await resp.json();
    console.log(data);
}

// in promise way
Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(results => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    //no matter what in then and catch, this will run at last of the promise
})

//ES9 for await of
const getData2 = async function(){
    const arrayOfPromise = urls.map(url => {
        return(fetch(url))
     });
     
     for await (let request of arrayOfPromise){
        const data = await request.json();
        console.log(data);
     }
}
```

### 4.5.6 Functions
https://firebase.google.com/docs/functions/get-started
Use the following command to create Functions folder and related documents
```cmd
$npm install firebase-functions@latest firebase-admin@latest --save
$npm install -g firebase-tools
$firebase init functions
```
In the code
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});
```
In ```.eslintrc.js``` which check your code rule, we need some modification to save our life.
https://www.programmersought.com/article/46885832344/
```json
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    quotes: ["error", "double"],
    "no-unused-vars":"off",
  },
};
```
Now you can deploy your function onto Firebase
```cmd
$firebase deploy --only functions
or
$firebase deploy --only "functions:HelloWorld"
Where HelloWorld is your function name
```
However, after you deploy, you might encounter error: Forbidden
https://lukestoolkit.blogspot.com/2020/06/google-cloud-functions-error-forbidden.html
Go to the following link: https://cloud.google.com/functions/list . Select your project. Check the check box of the function which you encounter error. Click on ```ADD MEMBER```. In the new members field, type in "allUsers" and select the "allUsers" option. In the "Select a role" dropdown, select Cloud Functions then Cloud Functions Invoker.

# 5. Optimization
There are many ways to optimize the website such as, minimize image size, delete un-used files....The following link from Google would give you a quick snapshot of the performance of your website: https://developers.google.com/speed/pagespeed/insights/ or https://www.webpagetest.org/

## 5.1 Image Reduce
- If you want transparency: use PNG
- If you want animation: use GIF
- If you want colourful image: use JPG
- If you want to use simple icon, logo, illustration: use SVG
- Remove image metadata
- Use CDNs like imigx
* A. Reduce image size: https://tinypng.com/ , http://jpeg-optimizer.com/
* B. Transparent background: https://www.remove.bg/upload 

## 5.2 Icon
Use the website: https://realfavicongenerator.net/ to generate icon file. Download the generated package and extract to public folder in your project. Place the following code (yours might be different according to your configuration in the generation process) in the ```<head>``` of index.html file.
```html
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
```

## 5.3 ServiceWorker
Reference: https://scotch.io/tutorials/how-to-make-your-existing-react-app-progressive-in-10-minutes
Reference: https://morioh.com/p/c8dae170eafd
A service worker is a script your browser runs in the background that PWAs use for offline. To run our app in an offline environment, we need to cache its static assets and find a solution to check the network status and updates periodically.Two key components of PWAs:
* Web app manifests: The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when ‘installed’ on the user’s mobile device or desktop. Having a manifest is required by Chrome to show the Add to Home Screen prompt.
* Service workers

### 5.3.1 Register ServiceWorker
To achieve progressive web app, we need to enable the serviceWorker. By changing the following code in ```index.js```
```javascript
serviceWorker.unregister()
```
to 
```javascript
serviceWorker.register()
```
### 5.3.2 Provide fallback content when JavaScript is not available
We want to show some message to the users when Javascript is disabled. Add the following ```<noscript>``` tag after the ```<body>``` tag in the ```index.html``` file 
```html
    <noscript>Your browser does not support JavaScript!</noscript>
```

