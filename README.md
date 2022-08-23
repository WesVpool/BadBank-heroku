# Bad-Bank-Full-Stack

### Project Title
Bad Bank Full Stack

### Description/Motivation
This app was created for a portfolio project to showcase skills in Front end application building and connecting to the Backend (servers, databases etc.)

### Installation Guidelines: This can be ran through a Express server and it requires the following steps: 
1. Clone the repository to your local machine
2. Install node.js
3. Running npm install will install all neccessary modules included in the package.json file. (ie. Express, Cors, Mongodb)
4. In the root of the project folder, create a file named exactly ".env" and in it define two environment variables:
    MONGODB_URI="---then insert your Mongodb connection string, here is a guide for getting your connection string https://www.mongodb.com/docs/guides/atlas/connection-string/---"

    GOOGLE_CREDS=---then insert your Firebase Service Account stringified JSON file here---guide for getting JSON file https://firebase.google.com/docs/admin/setup#initialize-sdk---

5. Open Terminal within the project folder you cloned to.
6. Run node index.js (to start the server)
7. Open browser and go to http://localhost:3000

### Technology used: 
React, Node, JS, HTML, CSS, Express, MongoDB, Firebase Auth
     
### Features: 
This projects highlights the use of C.R.U.D. (Create, Read, Update, Delete), although in this instance we do not Delete the users or their information. We use authentication to limit what pages can be navigated to until the user is Created/Logged in. This app could be tailored to work with other applications that need to add or remove from stock while keeping track of which employee that was logged in. 

### License:
##### MIT License

Copyright (c) 2022 WesVpool

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.