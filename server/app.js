
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors'); 
app.use(cors());

const PhotographersRouter = require("./routs/PhotographersRouter")
const UsersRouter = require("./routs/UsersRouter")
const ManagerRouter = require("./routs/ManagerRouter")

console.log("ffff")
app.use("/", PhotographersRouter);
app.use("/users", UsersRouter);
app.use("/requests", ManagerRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


