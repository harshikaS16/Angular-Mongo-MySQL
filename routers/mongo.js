const mongoose = require("mongoose");
const _ = require("underscore");

//Defining the user schema
const UserSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    dob: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    }
});

const mongoRouter = module.exports = mongoose.model('User', UserSchema);

/**
 * Get data from Mongo DB
 * @param {Function} callback callback function
 */
module.exports.getData = function(callback){
    // console.log("Getting data from mongo..");    
    mongoRouter.find(function(err, res){
        return callback(null,res);
    });
}

/**
 * Dump MySQL data to Mongo DB
 * @param {Array} data Array of Users
 * @param {Function} callback callback function
 */
module.exports.dumpData = function(data, callback){
    // console.log("MONGO: Dumping data..");
    var lastIndex = data.length - 1;
    _.each(data, function(user){
        mongoRouter.findOne({id: user.id}, function(err, found){
            if(found){
                updateUser(user, callback, data.indexOf(user) === lastIndex ? true : false);
            }else{
                addUser(user, callback, data.indexOf(user) === lastIndex ? true : false);
            }
        });
    });
}

/**
 * Add user to the mongo DB
 * @param {JSON} user User object 
 * @param {Function} callback callback function 
 * @param {Boolean} lastUser boolean to check if its the last user to be added
 */
function addUser(user, callback, lastUser){
    // console.log("Adding user:"+user.name);  
    mongoRouter.create(user, function(err, res){
        // console.log("MONGO: user is added"+res);
        if(lastUser){
            callback(null, true);
        }
    });
}

/**
 * Updatte existing user in the Mongo DB 
 * @param {JSON} user User object 
 * @param {Function} callback  callback function
 * @param {Boolean} lastUser boolean to check if its the last user to be updated
 */
function updateUser(user, callback, lastUser){
    // console.log("Updating user:"+user.name);  
    mongoRouter.findOneAndUpdate({id: user.id}, {$set: user}, function(err, res){
        // console.log("MONGO: user is updated"+res);
        if(lastUser){
            callback(null, true);
        } 
    });
}

/**
 * Deleting user from Mongo DB
 * @param {Number} userid User ID
 */
module.exports.deleteUser = function(userid){
    // console.log("Deleting user:"+userid);
    mongoRouter.findOneAndRemove({id: userid}, function(err, res){
        // console.log("Deleted!");
    });
}