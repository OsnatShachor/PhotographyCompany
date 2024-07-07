const pool = require('../DB.js');

async function getAllMyOrders(userID, photographerId) {
    try {
        const sql = `
        SELECT *
        FROM orders
        WHERE userID = ? AND photographerID = ?`;
        const [rows] = await pool.query(sql, [userID, photographerId]);
        console.log("Fetched orders:", rows);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function checkPhotographerAvailability(photographerID, photoDate) {
    try {
        const sql = `SELECT * FROM orders WHERE photographerID = ? AND photoDate = DATE(?)`;
        const [availabilityResult] = await pool.query(sql, [photographerID, photoDate]);
        return availabilityResult;
    } catch (err) {
        throw err;
    }
}

async function createOrder(body) {
    try {
        const sql = `INSERT INTO orders (userID, photographerID, confirmed, statusID, categoryID, photoDate, beginningTime, durationTimePhotography, location, payment) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [resultOrderRequest] = await pool.query(sql, [body.userID, body.photographerID, body.confirmed, body.statusID, body.categoryID, body.photoDate, body.beginningTime, body.durationTimePhotography, body.location, body.payment]);
        const orderID = resultOrderRequest.insertId;
        return orderID;
    } catch (err) {
        throw err;
    }
}

async function getUnavailableDates(photographerID) {
    try {
        console.log("Model: Fetching unavailable dates for photographer:", photographerID);
        const sql = `SELECT photoDate FROM orders WHERE photographerID = ?`;
        const [rows] = await pool.query(sql, [photographerID]);
        console.log("Model: Unavailable dates from DB:", rows);
        
        return rows.map(row => {
            // קח את התאריך כמו שהוא מהדאטהבייס, בלי תיקונים
            const date = new Date(row.photoDate);
            // פורמט את התאריך ל-YYYY-MM-DD
            const formattedDate = date.toISOString().split('T')[0];
            console.log(`Model: Formatting ${row.photoDate} to ${formattedDate}`);
            return formattedDate;
        });
    } catch (err) {
        console.error("Model: Error fetching unavailable dates:", err);
        throw err;
    }
}

async function updateOrder(orderId, updatedOrderData) {
    try {
        const sql = `
        UPDATE orders
        SET statusID = ?, beginningTime = ?, durationTimePhotography = ?, location = ?, payment = ?
        WHERE orderID = ?`;
        const { statusID, beginningTime, durationTimePhotography, location, payment } = updatedOrderData;
        const [result] = await pool.query(sql, [statusID, beginningTime, durationTimePhotography, location, payment, orderId]);
        return result.affectedRows > 0 ? { orderID: orderId, ...updatedOrderData } : null;
    } catch (err) {
        throw err;
    }
}

module.exports = { createOrder, getAllMyOrders, checkPhotographerAvailability, getUnavailableDates, updateOrder };
