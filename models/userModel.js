const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            
        },
        password:{
            type: String
        },
        systemLog:{
            type: String
        },
        role:{
            type: [{
                ref: "Role", 
                type: mongoose.Schema.Types.ObjectId
            }]
        }, 
        
    }
  );

const modelUser = mongoose.model('User', UserSchema);

module.exports = modelUser