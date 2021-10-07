const express = require("express");
const router = express.Router();

const dbCONFIG = require('../config/database');
const dateUtil = require('../utils/dates');
const mongoRouter = require('../routers/mongo');

/**
 * GET API to call Mongo Router and fetch user list
 */
router.get('/getUsersFromMongo', (req, res) => {
    mongoRouter.getData(function (err, result) {
        if (err) {
            console.error(err);            
            res.send(err);
        }
        res.send(result);
    })
})

/**
 * GET API to get users from MySQL DB
 */
router.get('/getUsers', (req, res) => {
    // console.log("In get users");
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM " + dbCONFIG.tableName, (error, results, fields) => {
            if (!error) {
                // console.log("Results:" + JSON.stringify(results));
                var formattedRes = dateUtil.changeDateFormat(results);
                res.status(200).send(formattedRes);
            } else {
                console.error(error);                
                res.send(error);
            }
        });
    });
});

/**
 * POST API to create the user in the MySQL DB
 */
router.post('/updateUser', (req, res) => {
    var body = req.body;
    // console.log("In create user: " + JSON.stringify(req.body));
    req.getConnection((err, connection) => {
        insertUser(connection, body, function(err, data){
            if (!err) {
                res.status(201).send('User created successfully');
            } else {
                res.send(err);
            }
        });
    });

});

/**
 * Internal method to insert the user in MySQL DB
 * @param {Object} connection MySQL DB connection 
 * @param {JSON} body User body 
 * @param {Function} callback callback function 
 */
function insertUser(connection, body, callback) {
    var queryStatement = "INSERT into " + dbCONFIG.tableName + "(name, dob, email, contact) values('" + body.name + "','" + body.dob + "','" + body.email + "'," + body.contact + ")";
    // console.log("QUERY:"+queryStatement);   
    connection.query(queryStatement, function(error, results, fields) {
        if (!error) {
            // console.log("Insert Query Response:" + results);
            return callback(null, true);
        } else {
            console.error("Error for insert:" + error);
            connection.query(dbCONFIG.createTableQuery, function (error, results, fields) {
                if (!error) {
                    //  console.log("Table created:" + results);
                    insertUser(connection, body);
                } else {
                    console.error("Error in creating table:" + error);
                }
            });
        }
    });
}

/**
 * PUT API to update the user in MySQL DB
 */
router.put('/updateUser', (req, res) => {
    // console.log("In update user");
    var body = req.body;
    var queryStatement = "UPDATE " + dbCONFIG.tableName + " SET name='" + body.name + "', dob='" + body.dob + "', email='" + body.email + "', contact='" + body.contact + "' WHERE id='" + body.id + "'";
    // console.log("QUERY:"+ queryStatement);
    
    req.getConnection((err, connection) => {
        connection.query(queryStatement, function(error, results, fields) {
            if (!error) {
                // console.log("Update query response:" + results);
                res.status(200).send('User updated successfully');
            } else {
                console.error("Error in update:" + error);
                res.send(error);
            }
        })

    });
});

/**
 * API to delete the user from MySQL DB
 */
router.delete('/deleteUser/:id', (req, res) => {
    // console.log("In delete user");
    var queryStatement = "DELETE FROM " + dbCONFIG.tableName + " WHERE id='" + req.params.id + "'";
    req.getConnection((err, connection) => {
        connection.query(queryStatement, function(error, results, fields) {
            if (!error) {
                // console.log("Delete query response:" + results);
                mongoRouter.deleteUser(req.params.id);
                res.status(202).send('User has been deleted successfully');
            } else {
                console.error("Error in delete:" + error);
                res.send(error);
            }
        })
    });
});

module.exports = router;