const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;

const earningDb  = require('./queries.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/earnings/:query', earningDb.getEarningsById);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
