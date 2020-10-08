var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../.env')});
const cors = require('cors');
var axios = require('axios');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());
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
    const { email, userName, password } = req.body;
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
    const userDetails = {
        email: email,
        userName: userName,
        pass: password,
        verified: rand
    };
    console.log(userDetails);
    axios.post('https://react-example-59018.firebaseio.com/users.json', userDetails)
        .then(res => {
            console.log("recieved - " + res);
        })
        .catch(error => {
            console.log(error);
        });

}

);
//user -email name pass verifyy-id-random
app.get('/verify',function (req, res) {

    const id = req.query.id;
    const email = req.query.email;
    const item = true;
    console.log('query-id:',id);
    console.log('query-email',email);
    axios.get('https://react-example-59018.firebaseio.com/users.json')
    .then(async response => {

        console.log('res-data,email,id',response.data);
        for (let key in response.data) {
            if (email === response.data[key].email) {
                console.log('email checked', email);
                console.log(id,response.data[key].verified);
                console.log(typeof(id),typeof(response.data[key].verified.toString()));
                console.log(id === response.data[key].verified.toString());
                if(id === response.data[key].verified.toString()){
                    res.send({msg:"verified"})
                    return await axios.put(`https://react-example-59018.firebaseio.com/users/${key}/verified.json`,item.toString())
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                    console.log('verified field true');
                }

            }

        }
    // 1. search in databba se for that email;
    //  2. if(email found) then match id
    // 3.If matched verify=true;
    console.log(email, id);
    })
    .catch(error => {
        console.log(error);
    });;
    


   
});

/*--------------------Routing Over----------------------------*/

app.listen(3001, function () {
    console.log("Express Started on Port 3001");
});

 // console.log(req.protocol + ":/" + req.get('host'));
    // if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    //     console.log("Domain is matched. Information is from Authentic email");
    //     if (req.query.id == rand) {
    //         console.log("email is verified");
    //         res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    //     }
    //     else {
    //         console.log("email is not verified");
    //         res.end("<h1>Bad Request</h1>");
    //     }
    // }
    // else {
    //     res.end("<h1>Request is from unknown source");
    // }