const morgan = require('morgan');

// Formato personalizado de los logs
morgan.token('body', (req) => JSON.stringify(req.body));

const requestLogger = morgan(':method :url :status - :response-time ms :body');

module.exports = requestLogger;
