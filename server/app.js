
const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = 3000;
app.use(cors());


app.use('/uploads', express.static('uploads')); // תיקייה סטטית לאחסון תמונות
const authenticateToken = require('./middleware/authenticateToken')
const authorizeManager = require('./middleware/authorizeManager')
const CategoriesRouter = require("./routs/CategoriesRouter")
const PhotographersRouter = require("./routs/PhotographersRouter")
const UsersRouter = require("./routs/UsersRouter")
const ManagerRouter = require("./routs/ManagerRouter")
const OrderRouter = require("./routs/OrderRouter")
const PhotographerManagementRouter = require('./routs/PhotographerManagementRouter')
const PhotoRouter = require('./routs/PhotoRouter')
const RequestToManager = require('./routs/RequestToManager')
const StatusRouter = require('./routs/StatusRouter')
const authorizePhotographer = require('./middleware/authorizePhotographer');

console.log("enjoy!!")

// app.use('/auth', authenticateToken, (req, res, next) => {
//   try {
//     if (req.user.roleID == 2) {
//       if(req.body==)
//     }
//     else {
//       res.json(req.user);
//     }
//   }
//   catch (err) {

//   }
// })
app.use("/aboutMe", PhotographersRouter);
app.use("/", PhotographersRouter);
app.use("/users", UsersRouter);
app.use("/category", CategoriesRouter)
app.use("/order", OrderRouter)
app.use('/photographer', PhotographerManagementRouter);
// app.use(authorizePhotographer)
app.use('/photos/photos', PhotoRouter)
app.use("/request-to-manager", RequestToManager);
app.use('/statuses', StatusRouter);
app.use(authorizeManager)
app.use("/manager/manager", ManagerRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});


