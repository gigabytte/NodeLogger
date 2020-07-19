const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// class logger extends eventemmioter for asynchronous saving of logs to the log file
class Logger extends EventEmitter{
    
    // basic dirctory and file checking along with applicable generation of suck objects
    exportLog(formatedMsg) {
        if (fs.existsSync(path.join(__dirname, '..', '/logs'))) {
            if (fs.existsSync(path.join(__dirname, '..', '/logs', 'log.txt'))) {
                // formated log string is then appended to the log.txt file
                this.appendLogFile(formatedMsg);
            }else{
                this.mkLogFile();
                this.appendLogFile(formatedMsg);
            }
        }else{
            this.mkLogDir();
            this.mkLogFile();
            this.appendLogFile(formatedMsg);
        }
    }

    mkLogDir(){
        fs.mkdir(path.join(__dirname, '..', '/logs'), {}, err => {
            if (err) throw err;
            console.log("Created new Logs Dir...")
        });
    }

    mkLogFile(){
        fs.writeFile(path.join(__dirname, '..', '/logs', 'log.txt'), {}, err => {
            if (err) throw err;
            console.log("Created new Logs File...")
        });
    }

    appendLogFile(msg){
        fs.appendFile(path.join(__dirname, '..', '/logs', 'log.txt'), msg + '\n', err => {
            if (err) throw err;
            this.emit('exportLog', msg)
        });
    }

}

module.exports = Logger;