const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// נתיב חדש לאימות ה-token והחזרת פרטי המשתמש
router.get('/', authenticateToken, (req, res) => {
  console.log("authenticate");
  res.json({ user: req.user });
});

module.exports = router;
