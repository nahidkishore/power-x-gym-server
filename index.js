const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get("/", function (req, res) {
  res.send("Welcome to power x-gym center");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(err => {
  const classCollection = client.db("powerGym").collection("class");
  
  app.post('/addClass', (req, res) => {
    const classItem = req.body;
     //classCollection.insertMany(classItem)
    classCollection.insertOne(classItem)
    .then(result => {
        console.log(result);
        console.log(result.insertedCount);
        res.send(result.insertedCount);
    })
  })

  app.get('/getClass', (req, res) => {
      classCollection.find({}).limit(6)
      .toArray((error, documents) => {
        res.send(documents);
      })
  })


});

app.listen(port);
