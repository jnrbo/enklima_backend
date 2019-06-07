var express = require('express'); // Biblioteca usada para fazer get/post
var cors = require('cors');

const app = express.Router();

app.use(cors());


app.use("/user/", require('./user_controller'));

app.use("/occurrence/", require('./auth/occurrence_auth'));
app.use("/occurrence/", require('./occurrence_controller'));

module.exports= app;
