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

# 3. Programming <br />
We are not going to dive into the code, but we will focus more on the concept (becuase you may find many useful tutorials guide you through the code and I will provide the link). Although this is a small project, it includes more than 60 files of codes, we need to archive them into folders. The following chart is the relationship of each folder and their corresponding function and web page. (Please click the image to enlarge for more clear view)

<p align="center">
<img src="/Doc/img/code_structure.png" height="100%" width="100%">  
</p>

## 3.1 Firebase <br />
The firebase object is in code: ```Src/Firebase/firebase.js```. However, this object will be initialized and created in ```App.js``` and you should only create it once, and then pass this initialized object into other components for further usage. If you don't go through this manner, you are prone to get error like: ***you cannot initializeApp() more than once.***

Problem you might encounter: <br />
* A. Blank webpage after deploy hosting on Firebase: You need to configure the ```firebase.json``` file (see ```Package_Rule/firebase.json```)
https://stackoverflow.com/questions/52177222/blank-page-after-successful-firebase-deployment
* B. Firebase App named DEFAULT already exists: This error occurs when you trying to initialize firebase again and again. It should be initialized at once.
* C. 
