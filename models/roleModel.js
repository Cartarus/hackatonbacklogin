const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
    }, { versionKey: false }
);


const modelRole = mongoose.model('Role', RoleSchema);

module.exports = modelRole