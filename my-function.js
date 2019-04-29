function generateRandomEarningsId(userContext, events, done) {
  const companyId = Math.floor(Math.random() * (10000000)+ 1);
  userContext.vars.companyId = companyId;
  return done();
}

module.exports = {
  generateRandomEarningsId
};