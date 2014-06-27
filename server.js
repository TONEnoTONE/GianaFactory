var express = require('express');
var app = express();

app.use(express.static(process.cwd()));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
