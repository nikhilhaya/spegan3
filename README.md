# daemoncds1

netstat -anob | findstr "8080"
taskkill /F /PID 5228

scripts:

 "start": "start http://localhost:3000 & node server",
 karma start karma.conf.js


To Do:
------
01. Jasmine Unit tests
02. Login validations
03. CSS to be re-implemented - Vendors page not showing properly			CHECK
04. Write README.md file for explanation
05. Reduce Web-API code which is not implemented to increase % in Istanbul
06. Check GULP file
07. Write Search, Update, Delete functionality
08. CICD using Jenkins
09. Login Page shouldnt be accessed once logged in 							CHECK
10. Integration Testing
11. Logging throughout code
12. Reporting of Code
13. Broccoli for asset compilation
14. Yeoman 
15. Use sourcemaps using gulp-sourcemaps. they map processed, minified , or other modified files to their original sources.

Issues:
-------

01. conflict running server.js with running gulp file, only one file runs at a time.			SOLVED
	removed start script from package.json for the time being.

02. gulp-sass won't compile scss files to css files properly.
	NOTE: gulp-sass uses node-sass which in turn uses libsass. On windows you’ll need to install python 2.7.x and Visual Studio Express 2013 in order to compile libsass. Mac and Linux will use whatever gcc is available.
	An alternative is to use gulp-ruby-sass, which uses ruby and the sass gem instead.

03. conflict executing nodemon gulp task in browser-sync task, multiple instances wanting port 3000
	Error: listen EADDRINUSE :::3000

Follow Up:
----------

01. https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
02. https://blog.nodejitsu.com/npmawesome-9-gulp-plugins/
03. https://www.smashingmagazine.com/2014/06/building-with-gulp/
04. http://engineroom.teamwork.com/10-things-to-know-about-gulp/
05. https://css-tricks.com/gulp-for-beginners/

Code deviation:
---------------

01. added line 15 in maincontroller whereas AuthInterceptor should be called which is not being called now.