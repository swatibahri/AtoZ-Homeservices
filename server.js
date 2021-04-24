 var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const DIR = 'src/uploads';

//app.use(express.static(__dirname));

var picname;
var picname1;

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
 },
 filename: (req, file, cb) => 
	{
    picname=Date.now() + file.originalname;
    picname1=Date.now() + file.originalname;
    
		cb(null, picname);
 }
});
let upload = multer({storage: storage});


//for cors
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();
});

var mongoose = require("mongoose");



var signupSchema = new mongoose.Schema( {name:String,phone:String,gender:String,username: {type:String,unique:true}, pass: String,cpass:String,cityname:String,usertype:String}, { versionKey: false } );

var signup = mongoose.model("signup", signupSchema,"signup");


var contactusSchema = new mongoose.Schema( {name:String,username: {type:String,unique:true},mssg:String , sub: String, query: String });

var contactus = mongoose.model("contactus", contactusSchema,"contactus");

var signupworkerSchema = new mongoose.Schema( {name:String,address:String,phone:String,gender:String,username: {type:String,unique:true}, pass: String,cpass:String,cityid:String,exp:String,catid:String,subcatid:String,charges:Number,ppic:String,usertype:String}, { versionKey: false } );

var signupworker = mongoose.model("signupworker", signupworkerSchema,"signupworker");

var addcitySchema = new mongoose.Schema( {cityname:String, citypic:String}, { versionKey: false } );
var addcity = mongoose.model("addcity", addcitySchema,"addcity");

var addcategorySchema = new mongoose.Schema( {cname:String, catpic:String}, { versionKey: false } );
var addcategory = mongoose.model("addcategory", addcategorySchema,"addcategory");

var CategorySchema = new mongoose.Schema( {catname:String, catpic:String}, { versionKey: false } );
var managecat = mongoose.model("managecat", CategorySchema,"managecat");


var addsubcatSchema = new mongoose.Schema( {catid:String,subcatname:String,spic:String}, { versionKey: false } );
var addsubcat = mongoose.model("addsubcat", addsubcatSchema,"addsubcat");

var ProductSchema = new mongoose.Schema( {catid:String,subcatid:String,pname:String,prate:Number,pdesc:String,pdiscount:Number,pstock:Number,spic:String}, { versionKey: false } );
var manageproduct = mongoose.model("manageproduct", ProductSchema,"manageproduct");

var CartSchema = new mongoose.Schema( {prodid:String,name:String,address:String,cityid:String,catid:String,subcatid:String,charges:Number,ppic:String, username:String}, { versionKey: false } );
var cart = mongoose.model("cart", CartSchema,"cart");

var CheckoutSchema=new mongoose.Schema( {orderamount:String,address:String,username:String,orderdate:String,paymentmode:String,status:String,cardno:String,coname:String,holdername:String,expdate:String,cvvno:String}, {versionKey:false} );
var checkout=mongoose.model("checkout",CheckoutSchema,"checkout");

var orderSchema = new mongoose.Schema( {orderid:String,pid:String,name:String,charges:Number,ppic:String,username:String }, { versionKey: false } );
var order = mongoose.model("order", orderSchema,"order");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());




app.post("/api/signup", function(req, res) {
 mongoose.connect("mongodb://localhost/home");

 
 var newsignup = new signup( {name:req.body.nm,phone:req.body.ph,gender:req.body.gen,username: req.body.uname, pass: req.body.pass,cpass:req.body.cpass, cityname: req.body.cityname, usertype:req.body.utype} );
 
 newsignup.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while signing up, try again");
 }
 else
 {
 res.send("Signup Successfull");
 }
 mongoose.connection.close();

 });
}); 



app.post("/api/contactus", function(req, res) {
 mongoose.connect("mongodb://localhost/home");

 
 var newcontactus = new contactus( {name:req.body.nm,username: req.body.uname,sub: req.body.sub, query: req.body.query, mssg:req.body.mssg} );
 
 newcontactus.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while sending message, try again");
 }
 else
 {
 res.send("message sent");
 }
 mongoose.connection.close();

 });
});



app.post("/api/signupworker",upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/home");

  if (!req.file) 
  {
       picname="download.jpg";
  };

 var newsignupworker = new signupworker( {name:req.body.nm,address:req.body.address,phone:req.body.ph,gender:req.body.gen,username: req.body.uname, pass: req.body.pass,cpass:req.body.cpass,cityid:req.body.cityid,exp:req.body.exp,catid:req.body.cname,subcatid:req.body.subcatname,charges:req.body.charges,ppic:picname, usertype:req.body.utype} );
 
 newsignupworker.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while signing up, try again");
 }
 else
 {
 res.send("Signup Successfull");
 }
 mongoose.connection.close();

 });
});




app.post("/api/login", function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 console.log(req.body);

 signup.find({ username:req.body.un,pass:req.body.pass}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.post("/api/loginworker", function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 console.log(req.body);

 signupworker.find({ username:req.body.un,pass:req.body.pass}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.put("/api/changepass", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  Signup.update({ username: req.body.un,pass:req.body.cpass }, { $set: { pass: req.body.newp}},function(err,data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send(data);
    }
    mongoose.connection.close();
  });
});



app.get("/api/fetchsubcategories", function(req, res) {
  mongoose.connect("mongodb://localhost/home");

  addsubcat.find({catid: req.query.cat}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
	  mongoose.connection.close();
	}
  });
});

app.get("/api/fetchcart", function(req, res) {
  mongoose.connect("mongodb://localhost/home");

  cart.find({username: req.query.uname}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      
    }
	mongoose.connection.close();
  });
});



app.get("/api/fetchempdetails", function(req, res) {
  mongoose.connect("mongodb://localhost/home");

  signupworker.find({_id: req.query.pid}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data); 
    }
	mongoose.connection.close();
  });
});


app.get("/api/fetchemp", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  signupworker.find({ subcatid:req.query.subcat }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});



app.post("/api/addcart", function(req, res) {
  mongoose.connect("mongodb://localhost/home");

  var newcart = new cart( {pid:req.body.pid,name:req.body.name,phone:req.body.phone,address:req.body.address,cityid:req.body.cityname,catid:req.body.cname,subcat:req.body.subcatname,exp:req.body.exp,charges:req.body.charges,ppic:req.body.ppic,username:req.body.username} );
  
  newcart.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Error while adding to cart, try again");
    }
    else
    {
      res.send("Added to cart successfully");
    }
    mongoose.connection.close();
  });
});


app.put("/api/updatecity", upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 //var d = new Date();
 if(!req.file)
 {
	picname=req.body.oldpic;
 }
else
{
	if(req.body.oldpic!="download.jpg")
	{
		fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if(err) throw err;
			console.log('file was deleted');
		});
	}
}
	 
 addcity.update({ _id: req.body.cid }, { $set: { cityname: req.body.cityname, citypic:picname}},function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Updated");
 }
 mongoose.connection.close();
 });
});


app.delete("/api/delmemb", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  signup.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});

app.delete("/api/delfeedback", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  contactus.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});

app.get("/api/memlist", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  signup.find(function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});

app.get("/api/emplist", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  signupworker.find(function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});

app.post("/api/addsubcat",upload.single('photo'), function(req, res) 
{
  mongoose.connect("mongodb://localhost/home");
  //var d = new Date();  
  if (!req.file) 
  {
       picname="download.jpg";
  };
  
  var newaddsubcat = new addsubcat( {catid:req.body.cid,subcatname:req.body.scatname,spic:picname} );
  newaddsubcat.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Successfully Inserted");
    }
    mongoose.connection.close();
  });
});

app.delete("/api/delcity", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  addcity.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});



app.delete("/api/delorder", function(req, res) {

  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  order.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Are you sure you want to delete?");
      mongoose.connection.close();
    }
  });
});
app.delete("/api/delcart", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  cart.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});



app.delete("/api/delcat", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  addcategory.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});

app.put("/api/updatecat", upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 //var d = new Date();
 if(!req.file)
 {
	picname=req.body.oldpic;
 }
else
{
	if(req.body.oldpic!="download.jpg")
	{
		fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if(err) throw err;
			console.log('file was deleted');
		});
	}
}
	 
 addcategory.update({ _id: req.body.cid }, { $set: { cname: req.body.cname, catpic:picname}},function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Updated");
 }
 mongoose.connection.close();
 });
});

app.delete("/deletecat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managecat.remove({ _id: req.query.catid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});


app.post("/insertsubcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noPhotoFound.png";
 };
 
 var newmanagesubcat = new managesubcat( {catid:req.body.catid, subcatname:req.body.subcatname,spic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});
//for delete sub- category using managecat component
app.delete("/deletesubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managesubcat.remove({ _id: req.query.subcatid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});






app.post("/api/addcity" ,upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 //var d = new Date();
 
 if (!req.file) 
 {
 picname="download.jpg";
 };
 
 var newaddcity = new addcity( { cityname:req.body.cityname,citypic:picname} );
 newaddcity.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Product inserted successfully");
  mongoose.connection.close();
 }
 });
});


app.post("/api/orderitems",function(req,res)
{
mongoose.connect("mongodb://localhost/home");
var neworder=req.body;

order.insertMany(neworder, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
res.send("Successfully inserted");
      }
    });
});




app.post("/api/addcat" ,upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 //var d = new Date();
 
 if (!req.file) 
 {
 picname="download.jpg";
 };
 
 var newaddcategory = new addcategory( { cname:req.body.cname,catpic:picname} );
 newaddcategory.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Product inserted successfully");
 }
 mongoose.connection.close();
 });
});






app.post("/insertcart" ,function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date();
 
 var newcart = new cart( {prodid:req.body.pid,pname:req.body.pname,prate:req.body.prate,qt:req.body.qt,tc:req.body.tc,ppic:req.body.ppic, username:req.body.username } );
 newcart.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while adding to cart, try again");
 }
 else
 {
 res.send("Product added to cart successfully");
 }
 mongoose.connection.close();
 });
});

app.get("/api/getcart", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  cart.find({ username:req.query.un}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
      
    }
	mongoose.connection.close();
  });
});


//get cart products from showcart component
app.get("/getcartprods", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 cart.find({ username:req.query.un}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


app.get("/api/fetchallcities", function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 

 addcity.find( function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
	 
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.get("/api/fetchallcategories", function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 addcategory.find( function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.get("/api/fetchcontactus", function(req, res) {
 mongoose.connect("mongodb://localhost/home");
 contactus.find( function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});



//delete cart products from show cart products
app.delete("/deletecardprod", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 cart.remove({ _id: req.query.pid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});

app.post("/api/checkout", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
	var d = new Date();
    
  var newcheckout = new checkout( {orderamount:req.body.billtot,address:req.body.add,username:req.body.un,orderdate:d,paymentmode:req.body.pmode,status:"Payment received, processing",cardno:req.body.cardno,coname:req.body.coname,holdername:req.body.hname,expdate:req.body.expdt,cvvno:req.body.cvv} );
  
  newcheckout.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Error while signing up, try again");
    }
    else
    {
      res.send("ok");
    }
    mongoose.connection.close();
  });
});

//get order number for ordersuccess component

app.get("/api/getordernum", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  checkout.find({ username: req.query.un }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  }).sort({"orderdate":-1});
});

//get cart details is as same as get cart prod api
app.get("/getcartprods", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 cart.find({ username: req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});


//insert order details for ordersuccess component
app.post("/insertorderdetail",function(req,res)
{
mongoose.connect("mongodb://localhost/projdb");
var neworder=req.body;

order.insertMany(neworder, function (err, docs) {
 if (err){ 
 return console.error(err);
 } else {
 console.log("Multiple documents inserted to Collection");
res.send("Successfully inserted");
 }
 });
});

app.get("/api/getOrdersByUser", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  checkout.find({ username:req.query.uname }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});


app.put("/api/updateStatus", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  checkout.updateOne({ _id: req.body.oid}, { $set: { status: req.body.newstatus}}, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});


app.put("/api/updateStatus", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  checkout.updateOne({ _id: req.body.oid}, { $set: { status: req.body.newstatus}}, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});


app.get("/api/getOrderDetailsByUser", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  order.find({ orderid: req.query.orderid }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});



app.put("/api/updatestock",function(req,res){
mongoose.connect("mongodb://localhost/home");
var updatelist=req.body;
for(let x=0;x<updatelist.length;x++)
{
signupworker.updateOne({_id:updatelist[x].pid},{$inc: {"pstock":-updatelist[x].qty}},function(err,data){
if (err)
{
 console.log(err);
 res.send("Failed");
}
else
{
 console.log(data);
 mongoose.connection.close();
}

});
}
 res.send("Successfully Updated");
});


app.get("/api/srchuser", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  signup.find({ username:req.query.un}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});


app.get("/api/srchworker", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  console.log(req.query);

  signupworker.find({ username:req.query.un}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});

//update stock after the successful of order
app.put("/updatestock",function(req,res){
mongoose.connect("mongodb://localhost/projdb");
var updatelist=req.body;
for(let x=0;x<updatelist.length;x++)
{
manageproduct.updateOne({_id:updatelist[x].pid},{$inc: {"pstock":-updatelist[x].qt}},function(err){
if (err)
{
 console.log(err);
 res.send("Failed");
}
else
{
 console.log(data);
 //res.send("Successfully Deleted");
 mongoose.connection.close();
}

});
}
});

app.delete("/api/emptycart", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  cart.remove({ username:req.query.un }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("removed from cart successfully");
    }
    mongoose.connection.close();
  });
});


//empty the cart after order complition
app.delete("/emptycart", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 cart.remove({ username:req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("removed to cart successfully");
 }
 mongoose.connection.close();
 });
});
app.get("/getproductdetailbypid", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 manageproduct.find({ _id: req.query.pid }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});

//get subcat by related catid manage product component
app.get("/getsubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managesubcat.find({ catid: req.query.catid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


app.get("/getprodsbysubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 manageproduct.find({ subcatid: req.query.sid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.get("/getprodsbyquery", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 manageproduct.find({ "pname": {$regex:'.*' + req.query.q + '.*'}}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


app.delete("/deleteuser", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 Signup.remove({ _id: req.query.un }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});

app.get("/fetchuserbyun", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query.uname);
 Signup.find({ username: req.query.uname}, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send(data);
 }
 mongoose.connection.close();
 });
});

app.get("/fetchusers", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 Signup.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});


app.get("/api/getAllOrders", function(req, res) {
  mongoose.connect("mongodb://localhost/home");
  checkout.find(function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});


app.get("/getallcategories", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 managecat.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});


app.listen(3000, function () {
 console.log('Node.js server is running on port 3000');
});
 
