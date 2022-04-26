require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


console.log('Hello World!')

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {

  const data = {
    message: "Hello json"
  }

  if (process.env.MESSAGE_STYLE != 'uppercase') {
    return res.json(data);
  }

  data.message = data.message.toUpperCase();

  res.json(data)
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
},
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const data = {
    echo: req.params.word
  };
  res.send(data);
});

const getName = (req, res) => {
  const data = {
    name: `${req.query.first} ${req.query.last}`
  };
  res.send(data);
}

const postName = (req, res) => {
  const data = {
    name: `${req.body.first} ${req.body.last}`
  };
  res.send(data);
}

app.route('/name')
.get(getName)
.post(postName);

module.exports = app;