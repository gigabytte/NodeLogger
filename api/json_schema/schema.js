var loggerSchema = {
	"type": "object",
	"properties": {
		"title": { "type": "string" },
		"msg": { "type": "string" },
		"flag": { "type": "string" }
	},
	"required": [ "title", "msg", "flag" ]

};
module.exports = loggerSchema;