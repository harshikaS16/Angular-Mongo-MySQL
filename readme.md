# About
  This project is to implement the integration of Angular 2, MongoDB and MySQL DB together. The integration is implemented by leveraging Node JS
  Below are the features:
  1. Page showing the columns 'Name', 'Date Of Birth', 'Email', 'Contact' with an Edit and Delete button for each record.
  2. Data on the front end to be fetched from Mongo DB.
  3. Add button to give the functionality of adding a new record.
  4. Edit and Delete functionalities will update the MySQL DB
  5. Write a CRON to fetch data from MySQL and dump it into Mongo DB after the specified interval of time.
  6. Adding of the new users will also be done to MySQL.

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
