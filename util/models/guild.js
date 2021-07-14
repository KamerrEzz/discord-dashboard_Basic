const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const guildConfig = new Schema({
    prefix: {
        type: 'string',
    }
});

module.exports = mongoose.model('guildConfig', guildConfig);