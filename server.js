var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
const admin   = require('./admin');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
        res.status(401).send('AUTHORIZATION DENIED');
        return
      }
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
            dal.create(req.params.name,req.params.email,req.params.password).
            then((user) => {
                console.log(user);
                res.send(user);            
            });   
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});

// // create/login using google
app.get('/account/google/:name/:email', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
        res.status(401).send('AUTHORIZATION DENIED');
        return
      }
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
                dal.findOne(req.params.email).
                then((user) => {
                    if(user === null){
                        dal.create(req.params.name,req.params.email,"signedInWithGoogle").
                            then((user) => {
                                console.log(user);
                                res.send(user);            
                            });
                    } else {
                        res.send(user)
                    }           
                }); 
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});

// login user 
app.get('/account/login/:email/:password', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
      res.status(401).send('AUTHORIZATION DENIED');
      return
    } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
            dal.findOne(req.params.email).
            then((user) => {
                console.log(user);
                res.send(user);            
            });   
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});

// find user account
app.get('/account/find/:email', function (req, res) {
        // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
      res.status(401).send('AUTHORIZATION DENIED');
      return
    } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
            dal.find(req.params.email).
            then((user) => {
                console.log(user);
                res.send(user);
        });   
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});


// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
            // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
      res.status(401).send('AUTHORIZATION DENIED');
      return
    } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
            dal.findOne(req.params.email).
            then((user) => {
                console.log(user);
                res.send(user);
        });   
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount/:action', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
        res.status(401).send('AUTHORIZATION DENIED');
        return
      } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            // res.send('Authentication Success!');
            var amount = Number(req.params.amount);
            const pos = amount > 0 ? amount : -(amount);
            var trans  = `$${pos} ${req.params.action} to/from account`;

            dal.update(req.params.email, amount, trans)
                .then((response) => {
                    console.log(response);
                    res.send(response);
            });   
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
 
});


// Transfer - transfer money to another account
app.get('/account/transfer/:toEmail/:amount', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    
    if (!idToken) {
        res.status(401).send('AUTHORIZATION DENIED');
        return
      } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401
    
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            var amount     = Number(req.params.amount);
            var fromTrans  = `$${amount} TRANSFERED to ${req.params.toEmail}`;
            var toTrans    = `$${amount} RECEIVED from ${decodedToken.email}`;
            
            // check if account exists
            dal.findOne(req.params.toEmail)
                .then((user) => {
                    console.log(`to email ${req.params.toEmail}`);
                    // if user exists, return error message
                    if(user === null){
                        console.log('User does not exist');
                        res.status(404).send('User does not exist');  
                    }
                    else{
                        //transfer to
                        dal.update(req.params.toEmail, amount, toTrans).
                            then((response) => {
                                console.log(response);
                                // res.send(response);
                        }); 
                        dal.update(decodedToken.email, -(amount), fromTrans).
                            then((response) => {
                                console.log(response);
                                res.send(response);
                        });               
                    }
                })}).catch(function(error) {
                    console.log('error:', error);
                    res.status(401).send("Token invalid!");
                });
    });

app.get('/test/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {

            // if user exists, return error message
            if(user === null){
                console.log('User does not exist');
                res.send('User does not exist');    
            }
});
});



// // all accounts
// app.get('/account/all', function (req, res) {
//     // read token from header
//     const idToken = req.headers.authorization
//     console.log('header:', idToken);

//     if (!idToken) {
//       res.status(401).send();
//       return
//     } 
//     //check, did they pass us the token?
//     //if not, do a 401 error
//     //check if verify id token was successful
//     //if not, do 401

//     //verify token, is this token valid?
//     admin.auth().verifyIdToken(idToken)
//         .then(function(decodedToken) {
//             console.log('decodedToken:',decodedToken);
//             res.send('Authentication Success!');
//         }).catch(function(error) {
//             console.log('error:', error);
//             res.status(401).send("Token invalid!");
//         });
//     dal.all().
//         then((docs) => {
//             console.log(docs);
//             res.send(docs);
//     });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});