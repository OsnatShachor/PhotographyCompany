
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors'); 
const jwt= require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
app.use(cors());
app.use(fileUpload());
app.use(express.static('public'));

const CategoriesRouter=require("./routs/CategoriesRouter")
const PhotographersRouter = require("./routs/PhotographersRouter")
const UsersRouter = require("./routs/UsersRouter")
const ManagerRouter = require("./routs/ManagerRouter")
const OrderRouter = require("./routs/OrderRouter")
const EmailRouter=require("./routs/emailRouter")
const PhotographerManagementRouter=require('./routs/PhotographerManagementRouter')
const PhotoRouter=require('./routs/PhotoRouter')
console.log("enjoy!!")
app.use("/aboutMe", PhotographersRouter);
app.use("/", PhotographersRouter);
app.use("/users", UsersRouter);
app.use("/requests/requests", ManagerRouter);
app.use("/category",CategoriesRouter)
app.use("/order",  OrderRouter)
app.use('/send-email', EmailRouter);
app.use('/photographer', PhotographerManagementRouter);
app.use('/images',PhotoRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


