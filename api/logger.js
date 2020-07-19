const express = require('express');
const uuid = require('uuid');
const validator = require('validator');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const msgFormat = require('./processor/formatter');
const Logger = require('./processor/saver');
const loggerSchema = require('./json_schema/schema')

const router = express.Router();

var validate = ajv.compile(loggerSchema);

router.get('/', (req, res, next) => {

    res.json({
        message: 'Welcome to the NodeLogger logging endpoint',
        endpoint_version: 'v1.0'
    });

});

router.post('/', (req, res, next) => {
    // validate request body against schema checked by AJV
    var isValidInput = validate(req.body);

    // VALIDATE user is using JSON format with API request
    if(req.get("Content-Type")!="application/json") { 
        const error = new Error('Invalid header format, requires json');
        error.status = 400;
        return next(error);
    }

    // if client input does not match schema throw error and return response code 400
    if (!isValidInput) {
        const error = new Error('Invalid JSON format ' + ajv.errorsText(validate.errors));
        error.status = 400;
        return next(error);
   
    }

    // check for empty fields in client request
    if (validator.isEmpty(req.body.title)){
        // respond with STATUS 400 code 
        const error = new Error('Missing Title in Log');
        error.input = req.body;
        error.status = 400;
        return next(error);
    }

    if (validator.isEmpty(req.body.msg)){
        // respond with STATUS 400 code 
        const error = new Error('Missing Msg in Log');
        error.input = req.body;
        error.status = 400;
        return next(error);
    }


    const loggerInput = {
        id: uuid.v4(),
        title: req.body.title,
        msg: req.body.msg,
        flag: req.body.flag
    };
    // get new formatted log object based on client body request
    const newMsg = new msgFormat(loggerInput.id, loggerInput.title, loggerInput.msg, loggerInput.flag);
    const newLog = new Logger();

    newLog.on('exportLog', () => {
        // respond with STATUS 201 code 
        res.status(201).json({
            message: 'Log Saved Sucessfully',
            logInfo: loggerInput,
            res_code: '201'
        });
    });
    // send event to exportLog emmiter to styartt process of saving log to /nodelogger/api/logs/log.txt file
    newLog.exportLog(newMsg.formatMsg());

});

// error respose to client default to 500 if unknown
router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error:{
        message: error.message,
        input: error.input
      }
    });
  });

module.exports = router;