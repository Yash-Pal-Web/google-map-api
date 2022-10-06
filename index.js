const express = require('express');
const bodyParser = require('body-parser');
const Cities = require("./model/city");
const app = express();
const mongoose = require('mongoose');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ejs = require("ejs");
const path = require("path");


mongoose.connect('mongodb+srv://yash:yash@cluster0.9ylty79.mongodb.net/mongoto?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('err',err=>{
    console.log('connection is field');
});
mongoose.connection.on('connected', connected=>{
    console.log('connected is database...');
});

app.set("views", path.join(__dirname, "static"));
app.set("view engine", "ejs");







app.get('/', function (req, res) {
  res.render('index');
})

app.get('/city', async(req,res)=>{
  try{
    
    let data=await Cities.find({
      location: {
        $near: {
          $maxDistance: 10000000,
          $geometry: {
            type: "Point",
            coordinates: [28.679079,77.06971],
          },
        },
      },
    });

    //console.log(data);
    res.send({message: "Success", statusCode:200, data:data});

  }catch(err){
    res.send({message: err.message, statusCode:400 })
  }
})



app.post('/city', async (req, res)=> {
     try {
    console.log(req.body);
    let newCities = await Cities.create({
      title: req.body.title,
      location: { type: "Point", coordinates: req.body.coordinates }
    });
    console.log("new city", newCities);
    res.send({ message: "Success", statusCode: 200 });
  } catch (err) {
    res.send({ message: err.message, statusCode: 400 });
  }
});






app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})