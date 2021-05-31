const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true, useUnifiedTopology: true});
const con = mongoose.connection
const bodyparser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 8000;
const router = express.Router();

// app.use(express.static('static', option));

//EXPRESS SPECIFIC STUFF
app.use("/", router);
app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.use(bodyparser.json());
// app.use(express.methodOverride());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the templete engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
})
app.get('/services', (req, res)=>{
    res.status(200).render('services.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.get('/donor', (req, res)=>{
    blood.find({}, (err, docs)=>{
        if(err){
            res.json(err);
        }
        else{
            res.render('donor', {bloods: docs});
        }
    })
    // res.status(200).render('donor.pug');
})

app.get('/services/transport', (req, res)=>{
    res.status(200).render('transport.pug');
})
app.get('/services/food', (req, res)=>{
    res.status(200).render('food.pug');
})
app.get('/services/medical', (req, res)=>{
    res.status(200).render('medical.pug');
})
app.get('/services/blood', (req, res)=>{
    res.status(200).render('blood.pug');
})


//Define mongoose schema for contact
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    msg: String
  });
const contact = mongoose.model('contact', contactschema);

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{     
        res.redirect('/');
    }).catch(()=>{
        res.status(400).send("The data does not save to the database");
    });
})

//defining mongoose schema for transport
const transportschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    member: String,
    boarding: String,
    destination: String
  });
const transport = mongoose.model('transport', transportschema);

app.post('/services/transport', (req, res)=>{
    var mydata = new transport(req.body);
    mydata.save().then(()=>{
        res.redirect('/');
        // res.send("We got your request of transport.");
    }).catch(()=>{
        res.status(400).send("The data does not saved to the database");
    });
})

//defining mongoose schema for food
const foodschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    member: String
  });
const food = mongoose.model('food', foodschema);

app.post('/services/food', (req, res)=>{
    var mydata = new food(req.body);
    mydata.save().then(()=>{
        res.redirect('/');
        // res.send("We got your request for food.");
    }).catch(()=>{
        res.status(400).send("The data does not saved to the database");
    });
})

//defining mongoose schema for MEDICAL SERVICES
const medicalschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    requirement: String,
    covid: String,
    doctor: String,
    msg: String
  });
const medical = mongoose.model('medical', medicalschema);

app.post('/services/medical', (req, res)=>{
    var mydata = new medical(req.body);
    mydata.save().then(()=>{
        res.redirect('/');
        // res.send("We got your request for Medical services. We will reach you soon.");
    }).catch(()=>{
        res.status(400).send("The data does not saved to the database");
    });
})

//defining mongoose schema for Blood and Plasma recipient
const bloodschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    bg: String,
    bp: String
  });
const blood = mongoose.model('blood', bloodschema);

app.post('/services/blood', (req, res)=>{
    var mydata = new blood(req.body);
    mydata.save().then(()=>{
        res.redirect('/');
        // res.send("We got your request for Blood or plasma requirement.");
    }).catch(()=>{
        res.status(400).send("The data does not saved to the database");
    });
})

//START THE SERVER
app.listen(port, ()=>{
    console.log("Application succesfully started on port "+port);
})