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
    mob: String,
    password: String,
});

const User = new mongoose.model("User",newSchema);

const createDoc = async (name, email, number, pass) => {
    try {

        // bcrypt.genSalt(saltRounds, function(err, salt) {
        //     bcrypt.hash(pass, salt, async function(err, hash) {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             const ise = new User({
        //                 name: name,
        //                 email: email,
        //                 mob: number,
        //                 password: hash,
        //             });
        //             const result = await ise.save();
        //             console.log(`Uploaded the data of `+name);
        //         }
        //     });
        // });
        bcrypt.hash(pass,10, async(err,hash)=>{
            if(err) {
                console.log(err);
            } else {
                const ise = new User({
                    name: name,
                    email: email,
                    mob: number,
                    password: hash,
                });
                await ise.save();
                console.log(`Uploaded the data of `+name);
            }
        });
    } catch(err) {
        console.log(err);
    }
}


app.post("/post",(req,res)=>{
    const data = req.body;

    createDoc(data.firstName + ' ' + data.lastName, data.email, data.number, data.password);
});

app.post('/login',(req,respo)=>{
    const { email,password } = req.body;

    console.log('Searching...');

    User.findOne({ email: email })
    .then((found)=>{
        bcrypt.compare(password,found.password,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                if(result===true) {
                    respo.send(found);
                } else {
                    respo.json("Not found");
                }
            }
        })
    })
    .catch((err)=>{
        console.log(err);
    });
    
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

    uploadRestaurant(name,city);
});

app.post('/getRestaurants',(req,res)=>{
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

app.post('/restaurant/:id',(req,res)=>{
    const {id} = req.params;
    async function gettingRestaurants(val) {
        try {
            const data = await Restau.findOne({_id: val});
            console.log(data);
            const prods = data.products;
            res.json(prods);
        } catch(err) {
            console.log(err);
        }
    }
    gettingRestaurants(id);
});

app.post('/getLocations',(req,res)=>{
    const data = req.body.typo;
    async function getDat() {
        var ans;
        var arrr=[];
        if(data==="") {
            ans = await Restau.distinct('city');
            arrr=ans;
        } else {
            ans = await Restau.find({city: {'$regex':data}});
            ans.map((thing,id)=>{arrr.push(thing.city)});
        }
        res.json(arrr);
    }
    getDat();
});

const nayaDal = async(prod,rest) => {
    try {
        await Restau.findOneAndUpdate({_id:rest} , {$push: {'products':prod}});
        console.log('Updated the Restaurant');
    } catch(err) {
        console.log('lol');
        console.log(err);
    }
}

app.post('/addProd/:id',(req,res)=>{
    const newProduct = req.body.newProd;
    const restauId = req.params.id;

    nayaDal(newProduct,restauId);
})

app.listen(PRT,()=>{
    console.log("Server started on port 5000");
});