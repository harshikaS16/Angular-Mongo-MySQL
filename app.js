const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql");
const connection = require("express-myconnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const schedule = require("node-schedule");
const request = require("request");
const socketio = require("socket.io");

const dbConfig = require('./config/database');
const userRouter = require('./routers/user');
const mongoRouter = require('./routers/mongo');

// connecting to Mongo DB
mongoose.connect(dbConfig.mongoUrl);

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo DB ', dbConfig.mongoUrl);
});

mongoose.connection.on('error', (error) => {
    console.error('Mongo DB connection error ', error);
});


//connecting to server
const app = express();

const port = process.env.PORT || 8080;

//connecting to mysql
app.use(
    connection(mysql, {
        host: 'localhost',
        user: dbConfig.mysqlUser,
        password: dbConfig.mysqlPassword,
        database: dbConfig.mysqlDB
    }, 'request')
);

app.use(cors());

app.use(bodyParser.json());

app.use('/users', userRouter);

//Starting the server
var server = app.listen(port, () => {
    console.log('Server started at port ', port);
});

//setting up the socket io connection
var io = socketio(server);

io.on('connection', function (socket) {
    console.log("Socket io connected");
    socket.on('disconnect', function () {
        console.log("Socket io dicsonnected");
    });
})

//scheduling the cron job
var rule = new schedule.RecurrenceRule();
rule.second = [0,30];  //executes on every 0th and 30th second of a minute
var job = schedule.scheduleJob(rule, function () {
    console.log("Scheduled the cron job for every 10 secs");
    request("http://localhost:8080/users/getUsers", { json: true }, (err, res, body) => {
        if (!err) {
            console.log(body);
            if (body.length > 0) {
                mongoRouter.dumpData(body, (err, res) => {
                    if (!err) {
                        console.log("Data has been dumped");
                        io.emit('dataDumped');
                    } else {
                        console.error(err);
                    }
                });
            } else {
                io.emit('dataDumped');
            }
        }
    });
});



