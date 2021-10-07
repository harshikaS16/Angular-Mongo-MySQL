# Prerequisites for the Application:
1. Node JS and Angular 5 installed
2. Mongo DB and MySQL installed

# Setup of the Application:
1. Run 'npm install' on the root directory of the Application to install the dependencies for Server Side Module of the Project
2. Run 'npm install' on MyGlammProject->angular-src to install the dependencies for the Front-end module of the Project
3. Edit the file 'config->database.js' to provide the configuration for MySQL DB.
    PS: Please do not forget to update the table name in the 'createTableQuery' field in the same file if the table name is changed.
4. Mongo DB name can be changed in the same 'database.js' file if required in the field 'mongoUrl'. 

# Steps to run the application:
1. Start the MySQL Server
2. Start the Mongo DB Server
3. Start the Node JS server using command 'npm start' in the root directory of the Project
4. Serve the Angular Project using the 'ng serve' command at the 'MyGlammProject->angular-src' path.

PS: The cron job has been set to run after every 30 seconds. The time duration can be changed by updating the code in app.js at line number 65.
    The UI refreshes every time the CRON job is executed and the records from MySQL are dumped into Mongo. Socket-io has been incorporated to serve this purpose.
