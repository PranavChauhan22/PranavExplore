const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
var mongoose=require("mongoose");
const bodyparser = require("body-parser");


mongoose.connect('mongodb://localhost/therenalproject', {useNewUrlParser: true, useUnifiedTopology: true});


const contactSchema = new mongoose.Schema({
    pName: String,
    pAge: String,
    problem: String
    
  });


const Contact = mongoose.model('Kitten', contactSchema);

const doctorSchema = new mongoose.Schema({
  pname:String,
  page:String,
  prescription: String
  
});


const doctor = mongoose.model('citten', doctorSchema);
const infoSchema = new mongoose.Schema({
  name:String,
  email:String,
  category: String
  
});


const info = mongoose.model('bitten', infoSchema);

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/contact', (req, res)=>{
    // const params={ };
    res.status(200).render('contact.pug');
})
app.get('/', (req, res)=>{
    // const params={ };
    res.render('mainPage.pug');
})
app.get('/view', function(req, res){

  // console.log("3",Contact.find({Contact.name}));
  Contact.find({}, function(err, docs){
  if(err) res.json(err);
  else    res.render('display', {Contacts: docs});
  });
  });
app.get('/doctorDashboard', function(req, res){

  // console.log("3",Contact.find({Contact.name}));
  

  res.render('doctorDashboard.pug');
  });
// app.post('/getlist',(req,res)=>{
//   res.redirect('/view');
// })
app.get('/staffDashboard', (req, res)=>{
    // const params={ };
    res.render('staffDashboard.pug');
})

app.post('/staffdata', (req,res)=>{
  var myData=new Contact(req.body);
  myData.save();
})
app.post('/doctorpres', (req,res)=>{
  var myDesk=Contact(req.body);
  var mydata=new doctor(req.body);
mydata.save();
})
app.get('/graph', (req, res)=>{
  // const params={ };
  res.render('graph.pug');
})
app.get('/adminDashboard', (req, res)=>{
  // const params={ };
  info.find({}, function(err, docs){
    if(err) res.json(err);
    else    res.render('adminDashboard', {infos: docs});
    });
  
})
app.get('/adminDashboard', (req, res)=>{
  // const params={ };
res.render('adminDashboard.pug');
  
})

app.get('/staffgrid', (req, res)=>{
  // const params={ };
  doctor.find({}, function(err, docs){
    if(err) res.json(err);
    else    res.render('staffgrid', {doctors: docs});
    });
    
})




  app.post('/contact', (req, res)=>{
   
myData=new info(req.body);
myData.save();
       if(req.body.category=='Doctor'){
       
        res.redirect('/doctorDashboard');
      }
      else if(req.body.category=='Staff'){
       
        res.redirect('/staffDashboard');
      }
      else if(req.body.category=='Admin'){
       
        res.redirect('/adminDashboard');
      }
      else{

        res.redirect('/view');
      }


})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
