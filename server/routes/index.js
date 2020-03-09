const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/', function (req, res) {
  const MongoClient = mongodb.MongoClient;
  const url = 'mongodb://localhost:27017/bigPandaAssignment';

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Unable to connect to the server", err);
    } else {
      console.log('Connection Established');

      const collection = db.collection('users');

      collection.find({}).toArray(function(err,result) {
        if(err) {
          res.send(err);
        } else if (result.length) {
          console.log('results:', result);
          res.set('Access-Control-Allow-Origin', ['*']);
          res.send(result);
        } else {
          res.send('No document found');
        }
        db.close();
      })
    }
  });
});

router.post('/', function(req, res) {
  console.log("post request for '/' has received");
  const client = mongodb.MongoClient;
  const url = 'mongodb://localhost:27017/bigPandaAssignment';
  res.set('Access-Control-Allow-Origin', ['*']);

  client.connect(url, function (err, db) {
    if (err) {
      console.log("Unable to connect to server", err);
    } else {
      const collection = db.collection('users');
      const doc = req.body;
      console.log(`req is: ${req.toString()}`);
      console.log(`doc is: ${JSON.stringify(doc)}`);
      collection.insertOne(doc)
        .then(() => res.send("Updated users json success"))
        .catch(err => res.status(400).json({message: `Failed to insert documents: ${err}`}));
    }
  });
});

module.exports = router;