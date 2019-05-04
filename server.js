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
  axios.get(`http://ec2-18-144-52-71.us-west-1.compute.amazonaws.com/api/earnings/${req.params.query}`)
    .then((response) => {
      // console.log('response: ', response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.log('error: ', error);
      res.sendStatus(404);
    });
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`proxy server is running at: ${port}`);
});
