var express = require('express');
var app = express();

console.log('Hello World!')

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// })

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

app.get(
    "/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );
