const pool = require('../DB.js');


async function createRequest(photographerID, request,statusID) {
    try {
      const sql = `INSERT INTO requests (photographerID,request,statusID) values(?,?,?)`;
      const [resultRequest] = await pool.query(sql, [photographerID,request,statusID]);
      const requestID = resultRequest.insertId;
      console.log("Request Model requestID "+requestID)
      return requestID;
    }
    catch (err) {
      throw(err);
    }
  }

module.exports = {createRequest}  
