var http = require('http');
var app = require('./index')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log("\nServer Listening on Port: ", app.get('port'), "\n");
});