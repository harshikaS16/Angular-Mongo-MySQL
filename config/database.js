module.exports = {
    mongoUrl: "mongodb://localhost:27017/myGlammDemo",
    
    //MySQL configuration
    mysqlUser: 'root',
    mysqlPassword: '',
    mysqlDB: 'test',
    tableName: 'UsersDemo',

    createTableQuery: 'CREATE TABLE UsersDemo(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50), dob DATE, email VARCHAR(100), contact BIGINT)'
};