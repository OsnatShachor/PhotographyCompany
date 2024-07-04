
const express = require('express');

require('dotenv').config();
const path = require('path');
// const fileUpload = require('express-fileupload');
const cors = require('cors'); 
const jwt= require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = 3000;
app.use(cors());
// app.use(fileUpload());


// app.use(cors({
//     origin: 'http://localhost:5173', // שנה את זה לכתובת הלקוח שלך
//     credentials: true
//   }));


app.use('/uploads', express.static('uploads')); // תיקייה סטטית לאחסון תמונות

const CategoriesRouter=require("./routs/CategoriesRouter")
const PhotographersRouter = require("./routs/PhotographersRouter")
const UsersRouter = require("./routs/UsersRouter")
const ManagerRouter = require("./routs/ManagerRouter")
const OrderRouter = require("./routs/OrderRouter")
const PhotographerManagementRouter=require('./routs/PhotographerManagementRouter')
const PhotoRouter=require('./routs/PhotoRouter')

console.log("enjoy!!")
app.use("/aboutMe", PhotographersRouter);
app.use("/", PhotographersRouter);
app.use("/users", UsersRouter);
app.use("/category",CategoriesRouter)
app.use("/order",  OrderRouter)
app.use('/photographer', PhotographerManagementRouter);
app.use('/photos',PhotoRouter)

app.use("/requests/requests", ManagerRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


