// Export the correct config file depending on the environment
module.exports = require(`./${(process.env.NODE_ENV || 'development')}.json`);
