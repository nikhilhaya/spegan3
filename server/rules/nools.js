module.exports = function(){

	var nools 			= require ('nools');
	var ruleFilePath 	= __dirname + "/rules.nools";
	var flow 			= nools.compile (ruleFilePath);			//compile the .nools file
	var nsession 		= flow.getSession ();
	var moment 			= require('moment');

		// define Payment object, then add a couple of Payment objects to the session 
		// ("asserting facts" in RETE rule engine)
		var Timings = flow.getDefined("LoginLogoutTimings");

				date1 = moment(),
				time1 = moment("2013-02-08 09:30:26", ["MM-DD-YYYY", "DD-MM-YYYY"]);

			var t1 = new Timings(2, 10, "female");
			var t2 = new Timings(7, 10, "male");

			var time = moment();
			var baseTime  = moment('2016-10-26 00:00:01');
			var lateTime = moment('2016-10-26 20:00:00');
			var loginTime = moment('2016-10-26 09:15:30');
			var logoutTime = moment('2016-10-26 21:20:10');
			// time.subtract(4, 'hours');
			// time.add(5, 'hours');

			console.log("current time: " + time.format('DD-MM-YYYY HH:mm:ss'));
			console.log("base time: " + baseTime.format('DD-MM-YYYY HH:mm:ss'));
			console.log("login time: " + loginTime.format('DD-MM-YYYY HH:mm:ss'));
			console.log("logout time: " + logoutTime.format('DD-MM-YYYY HH:mm:ss'));
			console.log("time logged in: " + logoutTime.diff(loginTime, 'hours', true));
			if(logoutTime.isAfter(lateTime)){
				console.log("employee is " + logoutTime.diff(lateTime, 'hours', true) + " late");
			}

			nsession.assert(t1);
			nsession.assert(t2);

		// execute the RETE algorithm against all the facts (Payment objects) in the session
		// this will run in a separate thread, asynchronous to the thread executing this flow
		nsession.match().then(
			function() {
				  console.log(time1 + " ____ " + date1);
				  // promise that is resolved once there are no more rules to execute
				  console.log("Completed matching of facts against our ruleset");
				  console.log("\nt1.loginTime: " + t1.loginTime + ", t1.logoutTime: " + t1.logoutTime);
				  console.log("Fill late stay form: " + t1.lateStayForm);
				  // console.log("Insufficient Hours: " + t1.isInsufHours);
				  console.log("checkedRule ? " + t1.flag);
				  console.log("\nt2.loginTime: " + t2.loginTime + ", t2.logoutTime: " + t2.logoutTime);
				  console.log("Fill late stay form: " + t2.lateStayForm);
				  // console.log("Insufficient Hours: " + t2.isInsufHours);
				  console.log("checkedRule ? " + t2.flag ? "Yes" : "No");

				  //cleanup - purge the current session of all facts (releases memory)
				  nsession.dispose();
		  	},
		  	function(err){
		  		console.error(err.stack);
			}		
		);

		console.log("Initiated Rules execution @ " + ruleFilePath);

	return nools;
};