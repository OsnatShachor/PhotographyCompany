
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors'); 
app.use(cors());

const PhotographersRouter = require("./routs/PhotographersRouter")
app.use("/", PhotographersRouter);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
console.log("typeof PhotographersRouter " + typeof PhotographersRouter);

