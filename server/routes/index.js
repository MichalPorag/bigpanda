const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const CORS = require('cors');
const MONGO_URL = 'mongodb://localhost:27017/bigPandaAssignment';

router.use(CORS());

router.get('/', function (req, res) {
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) {
      console.error("Unable to connect to the server", err);
    } else {
      console.log('Connection Established');

      const collection = db.collection('users');

      collection.find({}).toArray(function(err,result) {
        if (err) {
          res.send(err);
        } else if (result.length) {
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
  console.log(`new post request has received... []`);
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) {
      console.error("Unable to connect to server", err);
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