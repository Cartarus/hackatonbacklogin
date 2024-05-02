const { Promise } = require("mongoose");
const Role = require("../models/roleModel")
const asyncHandler = require("express-async-handler");


const createRoles = asyncHandler(async(req, res ) =>{
   try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) {
        return
    }else{
            new Role({name: 'admin'}).save(),
            new Role({name: 'user'}).save()
    }
   } catch (error) {
    console.error(error);
   }
})

module.exports = createRoles;