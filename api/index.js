const express = require('express');

const logger = require('./logger');

const router = express.Router();

// default welcome message when presented with simple GET
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NodeLogger',
    running_version: 'v1.0'
  });
});
// initialize single logger route
router.use('/logger', logger);

// export router
module.exports = router;