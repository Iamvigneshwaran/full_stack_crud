const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); 

const app = express();
app.use(cors());

const urlEncoder = bodyParser.urlencoded({ extended: false });
app.use(urlEncoder)
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/newCollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB started...");
}).catch(console.log);

const userSchema =  new mongoose.Schema({
  id:Number,
  name : String,
  age:Number
});

const userModel = mongoose.model('newusers', userSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) res.status(404).send("No user found");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


app.post('/users', async (req, res) => {
  try {
    const user = new userModel(req.body);
    console.log(user)
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);  
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) res.status(404).send("No user found");
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log("App is running on Port 5000");
});
