const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3003;

// const earningDb  = require('./queries.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use('/earnings/:query', express.static(path.join(__dirname, 'public')));
app.locals.newrelic = newrelic;

app.get('/api/earnings/:query', (req, res) => {
  // console.log('request made on: ', req.params.query);
  axios.get(`http://ec2-18-144-31-133.us-west-1.compute.amazonaws.com:3002/api/earnings/${req.params.query}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
     res.sendStatus(500);
    });
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`proxy server is running at: ${port}`);
});
