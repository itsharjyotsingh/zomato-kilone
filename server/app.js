require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cor = require('cors');
const mongoose = require('mongoose');
const Restau = require('./restaurant.js');
const products = require('./product.js');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;

const DATABASE = process.env.DATABASE;
const PRT = process.env.PORT || 5000;

const app = express();
const uri = DATABASE;

app.use(express.json());
app.use(cor());
app.use(bodyParser.json());

async function connectDb() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DataBase");
    } catch(err) {
        console.log(err);
    }
}

connectDb();

const newSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob: Number,
    password: String,
    cart: [ {productName: String ,quantity: Number} ],
});

const User = new mongoose.model("User",newSchema);

const createDoc = async(name, email, number, pass) => {
    try {
        bcrypt.hash(pass,10, async(err,hash)=>{
            if(err) {
                console.log(err);
            } else {
                const ise = new User({
                    name: name,
                    email: email,
                    mob: number,
                    password: hash,
                    cart: [{}],
                });
                await ise.save();
                console.log(`Uploaded the data of `+name);
            }
        });
    } catch(err) {
        console.log(err);
    }
}

const userIsPresent = async(email) => {
    try {
        const response = await User.findOne({email: email});

        return response!==null;
    } catch(err) {
        console.log(err);
        return false;
    }
}

app.post("/post", async(req,res)=>{
    try {
        const data = req.body;

        // If any important details are missing then I will return a 400 error status code
        if(data.firstName===null || data.email===null || data.number===null || data.password===null) {
            res.status(400).send({response: "Enter all Details"});
        } else {
            // Im checking if another record is already present with the same email address or not

            const isPresent = await userIsPresent(data.email);
            if(isPresent===true) {
                console.log('User alreasy exists');
                res.status(400).send({response: 'User already exists'});
            } else {

            // Once all the checks are performed, we will upload the details
            await createDoc(data.firstName + ' ' + data.lastName, data.email, data.number, data.password);

            res.status(200).send({response: 'Sign Up successful'});
            }
        }
    } catch(err) {
        res.status(400).send({response: err});
    }
    
});

app.post('/login', async(req,res) => {

    const { email,password } = req.body;

    if(email===null || password===null)   res.status(400).send({response: 'Enter all fields'});
    else {
        console.log('Searching...');

        try {
            const user = await User.findOne({email : email});
            
            if(user==null) {
                res.status(400).send({response: 'No user found with this email'});
            } else {
                bcrypt.compare(password , user.password , (err,result)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        if(result===true) {
                            res.status(200).send({response: 'Sign In successful'});
                        } else {
                            res.status(401).send({response: 'Wrong password'});
                        }
                    }
                })
            }

        } catch(err) {
            console.log(err);
            res.status(400).send({response: err});
        }
    }
});

const uploadRestaurant = async(name, city) => {
    try {
        const newRestaurant = new Restau({
            name,
            city,
        })
        await newRestaurant.save();
        console.log('Uploaded new Restaurant: ' + newRestaurant.name);
    } catch(err) {
        console.log(err);
    }
}

app.post('/restaurants',(req,res)=>{
    const { name,city } = req.body;

    if(name===null || city===null || name==="" || city==="") {
        res.status(400).send({response: 'Enter all fields'});
    } else {
        uploadRestaurant(name,city);
        res.status(200).send({response: 'New Restaurant Uploaded Succesfully'});
    }
});

app.get('/getRestaurants',(req,res)=>{
    const gettingData = async() => {
        try{
            const data = await Restau.find();
            console.log('Sent Data Successfully');
            res.json(data);
        } catch(err) {
            console.log(err);
        }
    }
    gettingData();
});

app.post('/restaurant/:id', async(req,res)=>{

    const { id } = req.params;

    try {
        const restau = await Restau.findOne({_id: id});

        if(restau===null) {
            res.status(404).send({response: 'Restuarant not found'});
        } else {
            const prods = restau.products;
            res.status(200).json(prods);
        }
    } catch(err) {
        console.log(err);
        res.status(404).send({response: "Some Error Occured"});
    }
});

app.post('/getLocations', async(req,res)=>{
    const data = req.body.typo;

    if(data===null) res.status(404).send({response: "Some Error Occured"});
    else {
        var arr = await Restau.distinct('city', { 'city': { $regex: `^${data}`, $options: 'i' } });

        res.json(arr);
    }
});

app.post('/addProd/:id', async(req,res)=>{
    const newProduct = req.body.newProd;
    const restauId = req.params.id;
    const { price } = req.body;

    if(newProduct===null || restauId === null || newProduct === "" || restauId === "" || price===null)  res.status(400).json({response: 'Fill all the Fields'});
    else {
        try {
            await Restau.findOneAndUpdate({_id : restauId}, {$push: {'products': {name: newProduct,price: price}}});
            console.log('Uploaded Successfully');
            res.status(200).json({response: 'Uploaded Successfully'});
        } catch(err) {
            res.status(400).json({reponse: 'Some Error Occured'});
        }
    }
})

app.listen(PRT,()=>{
    console.log("Server started on port 5000");
});