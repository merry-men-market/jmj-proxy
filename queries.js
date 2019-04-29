const Pool = require('pg').Pool
const earnings = new Pool({
  user: 'jeena',
  host: 'localhost',
  database: 'earnings',
  port: 5432,
});


const getEarningsById = (request, response) => {
  const query = request.params.query;
    earnings.query(`SELECT * FROM quarter WHERE company_id = ${query}`, (error, results) => {
      if (error) {
        throw error
      }
      console.log('is working')
      response.status(200).json(results.rows[0])
    })
  }


module.exports.getEarningsById = getEarningsById;