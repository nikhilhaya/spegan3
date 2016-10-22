# DaymonCDS POC

Project Run:
------------

01. instal latest stable release of Node.js from https://nodejs.org/en/

02. download server side dependencies though node-cli:
	npm install

03. download client side dependencies using Bower:
	bower install

04. install and configure postreGREs database:
	create a new Login Role and database with the below mentioned values or modify the credentials in the file,
	refer to server/config/config.js file to edit username, password and database name used 
	username: admin
	password: admin
	database: daymon

05. to persist the tables, User and Company in the database,
	kindly set force to true 
	sequelize.sync{force: false;}
	when you run the code for the first time, this should persist two tables in the database
	NOTE: change the value of force to false again after tables are persisted else the tables will be truncated, everytime the code is re-run.

06. to run the code, write the below in gitbash-cli or cmd
	npm start
	to run the code without restarting the server after code change, write
	npm install -g nodemon
	nodemon start
	check for relevent messages/error, node.js should 
			- start the server on default port: 3000,
			- authenticate credentials to connect to PostGREs,
			- connect to databases User and Company, 
			- load the website homepage.

	NOTE: kindly choose Google Chrome for best viewing.

	NOTE: kindly Refresh the page if page doesnt load on its own, this is because the browser tries to load the website before the server has fully started. also check for any errors in the cli window.

08. Links currently accessible:
		- login
		- logout
		- business organisations - home page
			- clicking on any business organisation fields would display the details page
		- add business organisation - create page

08. to run server-side test and analyse which use Mocha and Chai
	npm install -g istanbul
	istanbul cover node_modules/mocha/bin/_mocha 

09. to view the test coverage report in browser, kindly open the html file in 
	coverage/lcov-report/spegan/index.html


FAQs:
-------

01. to change the default port on which server runs, kindly refer to server.js file.
	to check what service is using your desired port, kindly do 
	netstat -abn <port-number>

02. if browser doesn't render a page or renders incorrectly, kindly check angular is accessed properly, 
	also if bower_components/angular can't fetch angular.js file, switch to CDN links to access all angular files, also provided in the code itself.

03. always shutdown.bat before you try starting tomcat server again. there is a possibility that a tomcat instance is already 		running if you have tried starting it in near future.
	also change the port to any random port in jenkins.xml file because both tomcat and jenkins are trying to listen to port 8080 by default casuing port binding error.


Issues:
-------

01. conflict running server.js with running gulp file, only one file runs at a time.			
	removed start script from package.json for the time being.
	SOLVED

02. gulp-sass won't compile scss files to css files properly.
	NOTE: gulp-sass uses node-sass which in turn uses libsass. On windows you’ll need to install python 2.7.x and Visual Studio Express 2013 in order to compile libsass. Mac and Linux will use whatever gcc is available.
	An alternative is to use gulp-ruby-sass, which uses ruby and the sass gem instead.
	SOLVED

03. conflict executing nodemon gulp task in browser-sync task, multiple instances wanting port 3000
	Error: listen EADDRINUSE :::3000
	SOLVED


To Do:
------

01. Jasmine Unit tests
02. Login validations
03. CSS to be re-implemented - Vendors page not showing properly			CHECK
04. Write README.md file for explanation									CHECK
05. Reduce Web-API code which is not implemented to increase % in Istanbul
06. Check GULP file
07. Write Search, Update, Delete functionality
08. CICD using Jenkins
09. Login Page shouldnt be accessed once logged in 							CHECK
10. Integration & Sytem Testing
11. Logging throughout code
12. Reporting of Code


Code deviation:
---------------

01. added line 15 in maincontroller whereas AuthInterceptor should be called which is not being called now.

02. changed maincontroller file, added a line to not acccess lagin page after login.

03. changed db config file with db name from daemon3 to daymon.


Other Scripts:
--------------

01. "start": "start http://localhost:3000 & node server"
02. karma start karma.conf.js
03. netstat -anob | findstr "8080"
	taskkill /F /PID 5228
04. npm config set proxy http://10.74.91.103:80
05. npm set registry http://registry.npmjs.org/
06. npm install --save-dev can be abbreviated with npm i -D


Follow Up:
----------

01. https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
02. https://blog.nodejitsu.com/npmawesome-9-gulp-plugins/
03. https://www.smashingmagazine.com/2014/06/building-with-gulp/
04. http://engineroom.teamwork.com/10-things-to-know-about-gulp/
05. https://css-tricks.com/gulp-for-beginners/

06. https://sdarchitect.wordpress.com/2012/09/25/understanding-devops-part-2-continuous-integration-and-continuous-delivery/