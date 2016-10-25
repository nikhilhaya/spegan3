module.exports = function(){

	var nools 			= require ('nools');
	var ruleFilePath 	= __dirname + "/rules.nools";
	var flow 			= nools.compile (ruleFilePath);			//compile the .nools file
	var nsession 		= flow.getSession ();
	var moment 			= require('moment');

		// define Payment object, then add a couple of Payment objects to the session 
		// ("asserting facts" in RETE rule engine)
		var Timings = flow.getDefined("LoginLogoutTimings");

				date1 = moment();
				time1 = moment("2013-02-08 09:30:26", ["DD-MM-YYYY"]);

			var t1 = new Timings(2, 10, "female");
			var t2 = new Timings(7, 10, "male");

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


// var t1 = moment();
// var t2 = moment();
// console.log(t1.format());
// // var t3 = t2.hours() - t1.hours();
// var t4 = moment();
// console.log(t4.startOf('day'));
// var a = moment([2007, 0, 28]);
// var b = moment([2007, 0, 29]);
// var c = moment([2013-02-08 09:30:26]);
// console.log(a.from(b)); // "a day ago"
// moment().toNow();
// moment().toNow(Boolean);
// moment([2007, 0, 29]).toNow();     // in 4 years
// moment([2007, 0, 29]).toNow(true);

// var loginTime = moment('2016-10-25 10:15:20:12');
// var logoutTime = moment('2016-10-25 21:20:20:12');
// console.log(logoutTime.from(loginTime));


// var dnow = moment();
// 	console.log(dnow);
// var snow = dnow.minute() % 15;
//     console.log(snow);
// var diffnow = 15 - snow;
// 	console.log(diffnow);
// var tonow = moment(dnow).add(diffnow, 'minute');
// 	console.log(tonow);
// var ahead30now = moment(tonow).add(30, 'minute');
// 	console.log(ahead30now);

// if (d > ahead30now) {
//     // allow input time
//     console.log('UTC TIME DB', d.format());
// } else {

// }

// var now  = "04-09-2013 15:00:00Z";
// var then = "02/09/2013 14:20:30";

// var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
// 	console.log(ms);
// var d = moment.duration(ms);
// 	console.log(d);
// var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
// 	console.log(s);