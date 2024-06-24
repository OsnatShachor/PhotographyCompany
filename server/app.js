
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors'); 
app.use(cors());
const jwt= require('jsonwebtoken');

const PhotographerDetailsRouter=require("./routs/PhotographerDetailsRouter")
const PhotographersRouter = require("./routs/PhotographersRouter")
const UsersRouter = require("./routs/UsersRouter")
const ManagerRouter = require("./routs/ManagerRouter")
const OrderRouter = require("./routs/OrderRouter")

console.log("enjoy!!")
app.use("/aboutMe", PhotographersRouter);
app.use("/", PhotographersRouter);
app.use("/users", UsersRouter);
app.use("/requests", ManagerRouter);
app.use("/category",PhotographerDetailsRouter)
app.use("/order",  OrderRouter)


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


