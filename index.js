// index.js
// where your node app starts
const { JWT_SECRET } = process.env;
// init project
var express = require('express');
var app = express();
const { PORT = 3000 } = process.env
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


let responseOBJECT = {}
app.get('/api/:input', (req, res) => {
  let input = req.params.input;
  let date = new Date(input);
  if (isNaN(date.getTime())) {
    date = new Date(parseInt(input));
  }

  if(isNaN(date.getTime())){
    res.json({ error: 'Invalid Date'});
  }else{
    responseOBJECT['unix'] = date.getTime();
    responseOBJECT['utc'] = date.toUTCString();
    res.json(responseOBJECT);
  }
});

app.get('/api', (req, res) => {
  responseOBJECT['unix'] = new Date().getTime();
  responseOBJECT['utc'] = new Date().toUTCString();
  res.json(responseOBJECT);
});


app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
