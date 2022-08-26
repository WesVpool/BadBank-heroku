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

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 100, trans:["$100 Initial Account Balance"]};
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
function transfer(fromEmail, toEmail, amount, fromTrans, toTrans){
    return new Promise((resolve, reject) => {    
        const toCustomer = db
            .collection('users')            
            .findOneAndUpdate(
                {email: toEmail},
                { $inc:  { balance: amount},
                  $push: { trans: toTrans}                
                }
                // { upsert: true,
                //   returnDocument: 'after' },
                // function (err, documents) {
                //     err ? reject(err) : resolve("SUCCESS");
                // }
            );
        const fromCustomer = db
            .collection('users') 
            .findOneAndUpdate(
                {email: fromEmail},
                { $inc:  { balance: -(amount)},
                  $push: { trans: fromTrans}                
                },
                { upsert: true,
                  returnDocument: 'after' },
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

module.exports = {create, findOne, find, update, transfer, all};