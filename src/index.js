const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
dotenv.config()
const port = process.env.PORT || 3001
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);

mongoose.connect(`${process.env.MONGODB}`).then(() => {
    console.log('Connect Success')
})
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running in port ', +port)
})