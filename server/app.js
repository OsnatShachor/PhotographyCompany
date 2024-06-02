
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors'); 
app.use(cors());

const WelcomePageRoutes = require("../server/routs/WelcomePageRouts")
app.use("/welcomePage", WelcomePageRoutes);



