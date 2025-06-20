const dbcreds = require('./DbConfig');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

function addTransaction(amount, desc, callback) {
    const sql = "INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)";
    con.query(sql, [amount, desc], function(err, result) {
        if (err) {
            console.error("Error inserting transaction:", err);
            return callback(err);
        }
        console.log("Transaction added successfully.");
        return callback(null, result);
    });
}


function getAllTransactions(callback){
    const sql = "SELECT * FROM transactions";
    con.query(sql, function(err,result){
        if (err) throw err;
        console.log("Getting all transactions...");
        return(callback(result));
    });
}

function findTransactionById(id,callback){
       const sql = "SELECT * FROM transactions WHERE id = ?";
       con.query(sql, [id], function(err, result) {
    // var mysql = `SELECT * FROM transactions WHERE id = ${id}`;   #block wit vulnerability spotted by sonarcube
    // con.query(mysql, function(err,result){                       #block wit vulnerability spotted by sonarcube
        if (err) throw err;
        console.log(`retrieving transactions with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllTransactions(callback){
    const sql = "DELETE FROM transactions";
    con.query(sql, function(err,result){
        if (err) throw err;
        console.log("Deleting all transactions...");
        return(callback(result));
    }) 
}

////=============================================================================================================
//  code block was commented out due to vulnerability to mysql injection attack, corrected block code is below
///==============================================================================================================
// function deleteTransactionById(id, callback){
//     var mysql = `DELETE FROM transactions WHERE id = ${id}`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log(`Deleting transactions with id ${id}`);
//         return(callback(result));
//     }) 
// }

////=============================================================================================================
//  corrected code block to protect against vulnerability to mysql injection attack
///===================================================================================================================

function deleteTransactionById(id, callback) {
    const sql = "DELETE FROM transactions WHERE id = ?";
    con.query(sql, [id], function(err, result) {
        if (err) return callback(err);  // Don't throw in async code
        console.log(`Deleted transaction with id ${id}`);
        return callback(null, result);
    });
}



module.exports = {addTransaction ,getAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById};







