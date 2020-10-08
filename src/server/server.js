var express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
var nodemailer = require("nodemailer");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// phone otp verif
const config = require('../config');
const client = require('twilio')(config.accountSID, config.authToken);
const port = 8080;

const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect('mongodb://localhost:27017/Global', { useNewUrlParser: true })
require("../models/Admins");

const Registration = mongoose.model('registration');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    console.log('config', config);
    console.log(req.query.phonenumber, req.query.channel)
    if (req.query.phonenumber) {
        client
            .verify
            .services(config.serviceID)
            .verifications
            .create({
                from: '+12565635535',
                to: `+91${req.query.phonenumber}`,
                channel: req.query.channel
            })
            .then(data => {
                res.status(200).send({
                    message: "Verification is sent!!",
                    phonenumber: req.query.phonenumber,
                    data
                })
            })
            .catch(err => console.log(err));
    } else {
        res.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: req.query.phonenumber,
            data
        })
    }
})

app.get('/verifyPhone', (req, res) => {
    console.log(req.query.phonenumber, req.query.code);
    const newvalues = {
        verifiedPhone: 'true'
    }
    if (req.query.phonenumber && (req.query.code).length === 6) {
        client
            .verify
            .services(process.env.SERVICE_ID)
            .verificationChecks
            .create({
                to: `+91${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    //here db call and verifyPhone true
                    Registration.find({ phone: req.query.phonenumber }, (err, result) => {
                        if (result.length > 0) {
                            Registration.updateOne(result[0], newvalues, function (err, res) {
                                console.log(res);
                            })
                        }
                    });
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    })
                }
            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber: req.query.phonenumber,
            data
        })
    }
})

app.post('/Admin', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const phoneno = req.body.phoneno;
    console.log(name, email, pass, phoneno);

    //    var id = result[result.length-1].id +1
    const obj = new Registration({ name: name, email: email, password: pass, phone: phoneno, registerDate: Date(Date.now().toString) });
    try {
        let reg = obj.save();
        console.log(reg);
    } catch (err) {
        console.log(err);
    }


});


//to verify email

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

// app.get('/',function(req,res){
//     res.sendfile('index.html');
// });
app.post('/send', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const phoneno = req.body.phoneno;
    console.log("email is is is is:", email);
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = `http://localhost:3000/verify/${email}/${rand}`;
    mailOptions = {
        to: email,
        from: process.env.EMAIL,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);

            res.send({ msg: "sucess", id: rand })
        }
    });
    const obj = new Registration({ name: name, email: email, password: pass, phone: phoneno, registerDate: Date(Date.now().toString()), verified: rand.toString(), verifiedPhone: "false" });
    try {
        let reg = obj.save();
        console.log(reg);
    } catch (err) {
        console.log(err);
    }

}

);
//user -email name pass verifyy-id-random
app.get('/verify', function (req, res) {

    const id = req.query.id;
    const email = req.query.email;
    console.log('query-id:', id);
    console.log('query-email', email);
    const newvalues = {
        verified: 'true'
    }
    Registration.find({ email: email }, (err, result) => {
        console.log(result);
        if (result[0].verified === id) {
            Registration.updateOne(result[0], newvalues, function (err, res) {
                console.log(res);
            })
        }
    });


});

// 1. search in databba se for that email;
//  2. if(email found) then match id
// 3.If matched verify=true;




// to check email is present in the database !!
app.get('/getEmail', (req, res) => {
    var email = req.query.email
    console.log(typeof (email))
    console.log('server', email);
    Registration.find({ email: email }, (err, result) => {
        console.log(result)
        console.log(result.length)
        if (result.length > 0) {
            console.log('fail');
            res.json(JSON.stringify({ msg: "fail" }))
        }
        else {
            console.log('pass');
            res.json(JSON.stringify({ msg: "pass" }))
        }
    })
})

app.get('/getPhoneno', (req, res) => {
    var phoneno = req.query.phoneno;
    Registration.find({ phoneno: phoneno }, (err, result) => {
        console.log(result)
        if (result.length > 0) {
            res.json(JSON.stringify({ msg: "fail" }))
        }
        else {
            res.json(JSON.stringify({ msg: "pass" }))
        }
    })
})

app.post('/loginCheck', function (req, res) {
    const phoneno = req.body.phoneno;
    const pass = req.body.pass;
    console.log(typeof (phoneno), typeof (pass));
    Registration.find({ phone: phoneno }, (err, result) => {
        console.log(result);
        if (result.length > 0) {
            if (result[0].password === pass) {
                if (result[0].verified === "true") {
                    if (result[0].verifiedPhone === "true") {
                        res.json(JSON.stringify({ msg: "3" }))
                    }
                    else {
                        res.json(JSON.stringify({ msg: "2" }))
                    }
                }
                else {
                    res.json(JSON.stringify({ msg: "1" }))
                }
            }
        }
        else {
            res.json(JSON.stringify({ msg: "0" }))
        }
    })
});


app.listen(port, () => {
    console.log('Setrver dorhing on 8080');
})



