const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Role = require("../models/roleModel")
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { log } = require('grunt');


const regisertUser = asyncHandler(async (req, res) => {
    const { email, password, role, voice } = req.body;

//Por favor cambiar la variable systemLog por el nombre del sistema requerido//-----
    let systemLog = "VoiceAuht"
    if (!email || !password) {
        res.status(400);
        throw new Error("Se necesita llenar los campos")
    }

    const availableUser = await User.findOne({ email });
    if (availableUser) {
        res.status(400);
        throw new Error("Se tiene registrado");

    }

    const hashPassword = await bcrypt.hash(password, 10); 

    const user = new User({
        email, 
        password: hashPassword, 
        systemLog
    })
    if (role) {
        const roles = await Role.find({ name: { $in: role } })
        user.role = roles.map(role => role._id)
    } else {
        const Emptyrole = await Role.findOne({name: "user"})
        console.log(Emptyrole.name);
        user.role = [Emptyrole._id]
    }
    const Saveduser = await user.save()
    console.log("Creado: " + Saveduser);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email, role:user.role, systemLog: user.systemLog })
    } else {
        res.status(400)
        throw new Error("no es valido")
    }
})

const tokenGen = asyncHandler(async(req, res) =>{

    const accesToken = jwt.sign(
        {
            user: {
                email: "test@gse.com.co",
                password: "9=sU-A"
            },
        },
        "" + process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
    );
        
    res.status(200).json({accesToken})
})


const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
        res.status(400);
        throw new Error("Se necesita llenar los campos")
    }
    const user = await User.findOne({ email });
    if (user) {
        const matchPsq = await bcrypt.compare(password, user.password);
        if (matchPsq) {
            const accesToken = jwt.sign(
                {
                    user: {
                        email: user.email,
                        password: user.password
                    },
                },
                "" + process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" },
            );
            res.status(200).json({ accesToken, role: user.role});
           
        } else {
            res.status(401);
            throw new Error("Constraseña incorrecta")
        }

    } else {
        res.status(401);
        throw new Error("Nombre de usuario no encontrado.")
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { regisertUser, LoginUser, currentUser, tokenGen }