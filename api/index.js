const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://trevoralbert41:Moses%4016@stack.30weg.mongodb.net/" ,{

    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> {
    console.log("connectecd to mongoDB")
}).catch((error) => {
    console.log("Error connecting to mongoDB", error);
})

app.listen(port, () =>{
    console.log("server is running on port 8000");
})