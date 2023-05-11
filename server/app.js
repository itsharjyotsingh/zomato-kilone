require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cor = require('cors');
const mongoose = require('mongoose');
const Restau = require('./restaurant.js');
const products = require('./product.js');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const saltRounds = process.env.SALT;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: "dwulkuo7v",
    api_key: "628235999779543",
    api_secret: "3MzJzxPpiCBX_UWsDEqEeS_wbdE"
});

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
    } catch (err) {
        console.log(err);
    }
}

connectDb();

const newSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob: Number,
    password: String,
    cart: [{ productName: String, quantity: Number }],
});

const User = new mongoose.model("User", newSchema);

const createDoc = async (name, email, number, pass) => {
    try {
        bcrypt.hash(pass, 10, async (err, hash) => {
            if (err) {
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
                console.log(`Uploaded the data of ` + name);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const userIsPresent = async (email) => {
    try {
        const response = await User.findOne({ email: email });

        return response !== null;
    } catch (err) {
        console.log(err);
        return false;
    }
}

app.post("/post", async (req, res) => {
    try {
        const data = req.body;

        // If any important details are missing then I will return a 400 error status code
        if (data.firstName === null || data.email === null || data.number === null || data.password === null) {
            res.status(400).send({ response: "Enter all Details" });
        } else {
            // Im checking if another record is already present with the same email address or not

            const isPresent = await userIsPresent(data.email);
            if (isPresent === true) {
                console.log('User alreasy exists');
                res.status(400).send({ response: 'User already exists' });
            } else {

                // Once all the checks are performed, we will upload the details
                await createDoc(data.firstName + ' ' + data.lastName, data.email, data.number, data.password);

                res.status(200).send({ response: 'Sign Up successful' });
            }
        }
    } catch (err) {
        res.status(400).send({ response: err });
    }

});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (email === null || password === null) res.status(400).send({ response: 'Enter all fields' });
    else {
        console.log('Searching...');

        try {
            const user = await User.findOne({ email: email });

            if (user == null) {
                res.status(400).send({ response: 'No user found with this email' });
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result === true) {
                            res.status(200).send({ response: 'Sign In successful', user });
                        } else {
                            res.status(401).send({ response: 'Wrong password' });
                        }
                    }
                })
            }

        } catch (err) {
            console.log(err);
            res.status(400).send({ response: err });
        }
    }
});

const uploadRestaurant = async (name, city, imageLink) => {
    try {
        const newRestaurant = new Restau({
            image: imageLink,
            name,
            city,
        })
        await newRestaurant.save();
        return 'success';
    } catch (err) {
        console.log(err);
        return err;
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const customFileName = Date.now() + '-' + file.originalname;
        cb(null, customFileName);
    }
});
const upload = multer({ storage: storage });

app.post('/restaurants', upload.single('image'), async function (req, res) {
    const { name, city } = req.body;
    var Link = '';
    console.log(req.body)
    if(req.body.image) {
        Link = req.body.image;
    } else if(req.file) {
        const oldPath = path.join(__dirname, req.file.path);
        const newPath = path.join(__dirname, 'uploads', name + '.jpg');

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File renamed successfully');
            }
        });

        const imagePath = path.join('uploads', name + '.jpg');
        await cloudinary.uploader.upload(imagePath, function (error, result) {
            if (error) {
                console.error(error);
                res.status(400).send({ response: 'Error uploading image' });
            } else {
                Link = result.secure_url;
                console.log(Link);
            }
        })

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File deleted successfully');
            }
        });
    }

    const made = await uploadRestaurant(name, city, Link);
    console.log(made);
    if(made==='success') {
        res.status(200).send({ response: 'Restaurant uploaded successfully' });
    } else {
        res.status(400).send({ response: made });
    }
});

app.get('/getRestaurants', (req, res) => {
    const gettingData = async () => {
        try {
            const data = await Restau.find();
            console.log('Sent Data Successfully');
            res.json(data);
        } catch (err) {
            console.log(err);
        }
    }
    gettingData();
});

app.post('/restaurant/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const restau = await Restau.findOne({ _id: id });

        if (restau === null) {
            res.status(404).send({ response: 'Restuarant not found' });
        } else {
            const prods = restau.products;
            console.log(prods);

            res.status(200).json(prods);
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ response: "Some Error Occured" });
    }
});

app.post('/getLocations', async (req, res) => {
    const data = req.body.typo;

    if (data === null) res.status(404).send({ response: "Some Error Occured" });
    else {
        var arr = await Restau.distinct('city', { 'city': { $regex: `^${data}`, $options: 'i' } });

        res.json(arr);
    }
});

app.post('/addProd/:id', upload.single('image'),async(req, res) => {
    const restauId = req.params.id;
    
    const { name, price } = req.body;

    const Image = req.body.image;

    var Link = '';

    if(Image) {
        Link = req.body.image;
    } else if(req.file) {
        const oldPath = path.join(__dirname, req.file.path);
        const newPath = path.join(__dirname, 'uploads', name + '.jpg');

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File renamed successfully');
            }
        });

        const imagePath = path.join('uploads', name + '.jpg');
        await cloudinary.uploader.upload(imagePath, function (error, result) {
            if (error) {
                console.error(error);
                res.status(400).send({ response: 'Error uploading image' });
            } else {
                Link = result.secure_url;
            }
        });

        console.log(Link);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File deleted successfully');
            }
        });
    }

    console.log(Link);

    if(name==="" || price==="" || Link==="" || Link===null) {
        res.status(400).json({response: 'Fill All The Details'});
    } else {
        const newProduct = {name: name, price: price, image: Link};
        await Restau.findOneAndUpdate({_id: restauId}, {$push: {products: newProduct}});
        res.status(200).json({response: 'Uploaded new product.'});
    }
});

app.listen(PRT, () => {
    console.log("Server started on port 5000");
});