// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const jwtAuthentication = (req, res, next) => {
//     const cookieToken = req.cookies.accessToken;
//     if (!cookieToken) return res.status(401).json({ message: "Access token not found" });

//     jwt.verify(
//         cookieToken,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).json({ message: "Invalid token" });
//             req.userId = decoded.userId;
//             req.roleId = decoded.roleId;
//             return next();
//         }
//     );
// };

// module.exports = jwtAuthentication;
// // זה הפונקציה שמפענחת את הקוקיז

// const express = require('express');
// const loginRouter = express.Router();
// const jwt = require('jsonwebtoken');
// const { authenticateLogin } = require('../controllers/usersController');
// require('dotenv').config();

// loginRouter.post('/', async (req, res) => {
//     try {
//         const user = await authenticateLogin(req.body.username, req.body.password);

//         if (!user) {
//             res.status(401).send({});
//         } else if (user === 1) {
//             res.status(401).send({});
//         } else {
//             const accessToken = jwt.sign(
//                 {
//                     userId: user.id,
//                     roleId: user.roleId,
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "5m" }
//             );
//             res.cookie("accessToken", accessToken, {
//                 httpOnly: true,
//                 sameSite: "None",
//                 secure: true,
//             });
           
//             res.status(201).send(user);
//         }
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch book' });
//     }
// });

// module.exports = loginRouter;
// // וכאן כותבים לקוקיז בלוגין וגם בהרשמה

// const express = require("express");
// const cors = require("cors");
// const path = require('path')
// const cookieParser = require("cookie-parser");
// const app = express();

// const jwtAuthentication = require('./middlewares/jwtAuthentication')
// const users = require("./routes/usersRoute");
// const login = require("./routes/loginRoute");
// const books = require("./routes/booksRoute");
// const comments = require("./routes/commentsRoute");
// const borrows = require("./routes/borrowsRoute");
// const availableBooks = require("./routes/availableBooksRoute");
// const recommends = require("./routes/recommedBooksRoute");
// const prevBorrows = require("./routes/prevBorrowsRoute");
// const messages = require("./routes/messagesRoute")
// const subscriptionTypes=require('./routes/subscriptionType')
// const homeBooks=require('./routes/homeBooksRoute')
// const signUp=require('./routes/signUpRoute')
// const likes = require("./routes/likesRoute")

// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.urlencoded({ extended: true }));

// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use("/homeBooks",homeBooks);
// app.use("/likes", likes);
// app.use("/login", login);
// app.use("/signUp", signUp);
// app.use("/comments", comments);

// app.use(jwtAuthentication)
// app.use("/books", books);
// app.use("/users", users);
// app.use("/borrows", borrows);
// app.use("/availableBooks", availableBooks);
// app.use("/recommends", recommends);
// app.use("/prevBorrows", prevBorrows);
// app.use("/messages", messages);
// app.use("/subscriptionTypes",subscriptionTypes);


// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// // כך נראה הapp שלנו כאשר ראוטים שצריכים user יהיו מוגנים בפונקציה הזאת שמפכנחת מהקוקיז

// // וראוטים שהם חלק חלק זה נראה כך:
// const express = require('express');
// const commentsRouter = express.Router();
// commentsRouter.use(express.json());
// const jwtAuthentication = require('../middlewares/jwtAuthentication')
// const { getAll, getSingle, create, update, deleteC } = require('../controllers/commentsController');

// commentsRouter.get('/', async (req, res) => {
//     try {
//         const comments = await getAll(req.query.bookId);
//         res.status(200).send(comments);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch comments' });
//     }
// });

// commentsRouter.post('/', jwtAuthentication, async (req, res) => {
//     try {
//         const response = await create(
//             req.body.title,
//             req.body.body,
//             req.body.userId,
//             req.body.bookId
//         );
//         res.status(201).send(await getSingle(response));
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to create comment' });
//     }
// });

// commentsRouter.put('/:commentId', jwtAuthentication, async (req, res) => {
//     try {
//         await update(
//             req.params.commentId,
//             req.body.title,
//             req.body.body,
//             req.body.userId,
//             req.body.bookId
//         );
//         res.status(200).send(await getSingle(req.params.commentId));
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to update comment' });
//     }
// });

// commentsRouter.delete('/:commentId', jwtAuthentication, async (req, res) => {
//     try {
//         await deleteC(req.params.commentId);
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to delete comment' });
//     }
// });

// module.exports = commentsRouter;

// ולסיום בריאקט כך שולחים את הבקשה:
// useEffect(() => {
//     fetch(`http://localhost:3000/messages?userId=${user.id}`, {
//       method: 'GET',
//       credentials: 'include'
//   })
//       .then(response => response.json())
//       .then(data => setMessages(data))
//       .catch(error => console.error("Error fetching messages:", error));
//   }, [user.id]);
// וצריך לוודא שמורידים את הספריה jsonwebtoken וcookie-parser
// בהצלחה

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const jwtAuthentication = (req, res, next) => {
//     const cookieToken = req.cookies.accessToken;
//     if (!cookieToken) return res.status(401).json({ message: "Access token not found" });

//     jwt.verify(
//         cookieToken,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).json({ message: "Invalid token" });
//             req.userId = decoded.userId;
//             req.roleId = decoded.roleId;
//             return next();
//         }
//     );
// };

// module.exports = jwtAuthentication;
// זה הפונקציה שמפענחת את הקוקיז

// const express = require('express');
// const loginRouter = express.Router();
// const jwt = require('jsonwebtoken');
// const { authenticateLogin } = require('../controllers/usersController');
// require('dotenv').config();

// loginRouter.post('/', async (req, res) => {
//     try {
//         const user = await authenticateLogin(req.body.username, req.body.password);

//         if (!user) {
//             res.status(401).send({});
//         } else if (user === 1) {
//             res.status(401).send({});
//         } else {
//             const accessToken = jwt.sign(
//                 {
//                     userId: user.id,
//                     roleId: user.roleId,
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "5m" }
//             );
//             res.cookie("accessToken", accessToken, {
//                 httpOnly: true,
//                 sameSite: "None",
//                 secure: true,
//             });
           
//             res.status(201).send(user);
//         }
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch book' });
//     }
// });

// module.exports = loginRouter;
// וכאן כותבים לקוקיז בלוגין וגם בהרשמה

// const express = require("express");
// const cors = require("cors");
// const path = require('path')
// const cookieParser = require("cookie-parser");
// const app = express();

// const jwtAuthentication = require('./middlewares/jwtAuthentication')
// const users = require("./routes/usersRoute");
// const login = require("./routes/loginRoute");
// const books = require("./routes/booksRoute");
// const comments = require("./routes/commentsRoute");
// const borrows = require("./routes/borrowsRoute");
// const availableBooks = require("./routes/availableBooksRoute");
// const recommends = require("./routes/recommedBooksRoute");
// const prevBorrows = require("./routes/prevBorrowsRoute");
// const messages = require("./routes/messagesRoute")
// const subscriptionTypes=require('./routes/subscriptionType')
// const homeBooks=require('./routes/homeBooksRoute')
// const signUp=require('./routes/signUpRoute')
// const likes = require("./routes/likesRoute")

// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.urlencoded({ extended: true }));

// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use("/homeBooks",homeBooks);
// app.use("/likes", likes);
// app.use("/login", login);
// app.use("/signUp", signUp);
// app.use("/comments", comments);

// app.use(jwtAuthentication)
// app.use("/books", books);
// app.use("/users", users);
// app.use("/borrows", borrows);
// app.use("/availableBooks", availableBooks);
// app.use("/recommends", recommends);
// app.use("/prevBorrows", prevBorrows);
// app.use("/messages", messages);
// app.use("/subscriptionTypes",subscriptionTypes);


// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// //כך נראה הapp שלנו כאשר ראוטים שצריכים user יהיו מוגנים בפונקציה הזאת שמפכנחת מהקוקיז

// ////וראוטים שהם חלק חלק זה נראה כך:
// const express = require('express');
// const commentsRouter = express.Router();
// commentsRouter.use(express.json());
// const jwtAuthentication = require('../middlewares/jwtAuthentication')
// const { getAll, getSingle, create, update, deleteC } = require('../controllers/commentsController');

// commentsRouter.get('/', async (req, res) => {
//     try {
//         const comments = await getAll(req.query.bookId);
//         res.status(200).send(comments);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch comments' });
//     }
// });

// commentsRouter.post('/', jwtAuthentication, async (req, res) => {
//     try {
//         const response = await create(
//             req.body.title,
//             req.body.body,
//             req.body.userId,
//             req.body.bookId
//         );
//         res.status(201).send(await getSingle(response));
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to create comment' });
//     }
// });

// commentsRouter.put('/:commentId', jwtAuthentication, async (req, res) => {
//     try {
//         await update(
//             req.params.commentId,
//             req.body.title,
//             req.body.body,
//             req.body.userId,
//             req.body.bookId
//         );
//         res.status(200).send(await getSingle(req.params.commentId));
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to update comment' });
//     }
// });

// commentsRouter.delete('/:commentId', jwtAuthentication, async (req, res) => {
//     try {
//         await deleteC(req.params.commentId);
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to delete comment' });
//     }
// });

// module.exports = commentsRouter;

// useEffect(() => {
//     fetch(`http://localhost:3000/messages?userId=${user.id}`, {
//       method: 'GET',
//       credentials: 'include'
//   })
//       .then(response => response.json())
//       .then(data => setMessages(data))
//       .catch(error => console.error("Error fetching messages:", error));
//   }, [user.id]);