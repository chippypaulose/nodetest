var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var productsSchema=new Schema({
    productId:{type:Number},
    productName:{type:String},
    productType:{type:String},
    productImageId:{type:Number}
})

var loginSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    logintime: { type: Date }
}, { versionKey: false });

var GamesSchema = new Schema({
    gameName: { type: String },
    gameType: { type: String },
}, { versionKey: false });

var model = mongo.model('games', GamesSchema, 'games');
var userModel = mongo.model('userlogin', loginSchema, 'userlogin');
var productsModel = mongo.model('products', productsSchema, 'products');

var prods=[{
    productId:1,productName:"Barbie Doll",
    productType:"Doll"},
    {productId:2,productName:"Open Shoes",
    productType:"Footwear"},
    {
    productId:3,productName:"Full necklace",
    productType:"Jewellery"
    }
]


app.post("/api/addProducts", function (req, res) {
    console.log('inside add products');
    var mod = new model(req.body);

    var myJSON = JSON.stringify(req.body);

    console.log(myJSON);
    console.log('inside save 1');

    mod.save(function (err, data) {
        console.log('inside save 2');

        if (err) {
            console.log('inside save 3' + err);
            res.send(err);

        }
        else {
            res.send({ data: "Record has been Inserted..!!" });
        }
    });
})
app.get("/api/getProducts", function (req, res) {
    
    productsModel.find({}, function (err, result) {
        if (err) {
            console.log('inside save 3' + err);
            res.send(err);

        }
        else {
            
            res.json(result);
        }
    });
 
    
})


app.post("/api/deleteProducts", function (req, res) {
    console.log('inside add products');
    var mod = new model(req.body);

    var myJSON = JSON.stringify(req.body);

    console.log(myJSON);
    console.log('inside save 1');

    mod.save(function (err, data) {
        console.log('inside save 2');

        if (err) {
            console.log('inside save 3' + err);
            res.send(err);

        }
        else {
            res.send({ data: "Record has been Inserted..!!" });
        }
    });
})

// productsModel.insertMany(prods,function(err,res){
//     if(err) throw err;
//     console.log(res.insertedCount+" documents inserted");
// })

//    var doc = [{ userName: "Chippy", password: "123" },
// {userName:"Test",password:"abc"}];

// userModel.insertMany(doc,function(err,res){
//     if(err) throw err;
//     console.log(res.insertedCount+" documents inserted");
// })



app.post("/api/SaveGames", function (req, res) {
    console.log('inside save games');
    var mod = new model(req.body);

    var myJSON = JSON.stringify(req.body);

    console.log(myJSON);
    console.log('inside save 1');

    mod.save(function (err, data) {
        console.log('inside save 2');

        if (err) {
            console.log('inside save 3' + err);
            res.send(err);

        }
        else {
            res.send({ data: "Record has been Inserted..!!" });
        }
    });
})

app.post("/api/loginUser", function (req, res) {
    console.log('inside login user method' + req.body.userName);
    var myJSON1 = JSON.stringify(req.body);
    console.log(myJSON1);
    var query = { userName: req.body.userName, password: req.body.password };
    var newvalues = {$set: {logintime: new Date()} };
    userModel.find(query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            userModel.updateOne(query, newvalues, function (err, result) {
            });

            res.send(result[0]);
            /* 
                                          if(result[0].userName === req.body.userName){
                                              console.log("============="+result[0].userName);
                                              res.send(true);
                                          }
                                          else{
                                          res.send(false); 
                                          }*/
            //res.send(result:"Record has been Inserted..!!"}); 
        }
    });



})
app.listen(8080, function () {

    console.log('Example app listening on port 8080!')
})


