const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3003;

// const earningDb  = require('./queries.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.newrelic = newrelic;

app.get('/api/earnings/:query', (req, res) => {
  axios.get(`http://localhost:3002/api/earnings/${req.params.query}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
