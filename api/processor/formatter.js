// MessageFormat class takes in uuid, title, msg and flag as constructors
class MessageFormat {
    constructor(uuid, title, msg, flag) {
        this.uuid = uuid;
        this.title = title;
        this.msg = msg;
        this.flag = flag;
    }

    // formats constructors into logging format string
    formatMsg() {
        var formattedMsg = `${this.uuid}: ${this.title}, ${this.msg}: Attributes ${this.flag}`;
        return formattedMsg;
    }
}

module.exports = MessageFormat;