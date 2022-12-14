// dotenv config.env for local server only
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
let db = null;

MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected successfully to db server!')

    // connect to myproject database
    db = client.db('myproject');
});


function getRandom () {
    let arrRand = []
    for (var i = 0; i < 14; i++) {
      var randomNum = Math.floor(Math.random() * 10);
      arrRand.push(randomNum);
    };
    return arrRand.join('')
  }

// create user account
function create(name, email, password) {
    const accountNum = getRandom();
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, acctNum: accountNum, balance: 100, trans:["$100 Initial Account Balance"]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount, trans){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc:  { balance: amount},
                  $push: { trans: trans}                
                },
                { upsert: true,
                  returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// transfer - tranfser between 2 accounts
function transfer2(fromEmail, toEmail, amount, fromTrans, toTrans){
    return new Promise((resolve, reject) => {    
        const toCustomer = db
            .collection('users')            
            .findOneAndUpdate(
                {email: toEmail},
                { $inc:  { balance: amount},
                  $push: { trans: toTrans}                
                },
                function (err, docs) {
                    err ? reject(err) : resolve(success);
                }
            );
        const fromCustomer = db
            .collection('users') 
            .findOneAndUpdate(
                {email: fromEmail},
                { $inc:  { balance: -(amount)},
                  $push: { trans: fromTrans}                
                },
                {returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }           
            )

    });    
}

// transfer
function transfer(email, amount, trans){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: fromEmail},
                { $inc:  { balance: -(amount)},
                  $push: { trans: trans}                
                },
                {returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }           
            )          


    });    
}
// all users
function all(){
    return new Promise((resolve, reject) => {
        const users = db
            .collection('users')
            .find({},{projection:{_id:0}})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    })
}

module.exports = {create, findOne, find, update, transfer2, transfer, all};