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
  async function getALLRequests() {
    try {
      console.log("getALLRequests model");
      const sql = `
       SELECT * FROM requests;`;
      const [rows,fields] = await pool.query(sql);
      console.log(rows);
      return rows;
    } catch (err) {
      return (err);
    }
  }

module.exports = {createRequest,getALLRequests}  
