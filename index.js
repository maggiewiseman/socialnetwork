const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

//use all the rest of the middleware here
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', function(req, res){

    res.sendFile(__dirname + '/index.html');
});

app.post('/register', function(req,res) {
    console.log('made it!', req.body);
    res.json({
        success: true
    });
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
