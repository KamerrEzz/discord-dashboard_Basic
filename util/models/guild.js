const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const guildConfig = new Schema({
    guildID: {
        type: 'string',
    },
    prefix: {
        type: 'string',
    },
    logs: {
        type: 'string',
    },
});

module.exports = mongoose.model('guildConfig', guildConfig);