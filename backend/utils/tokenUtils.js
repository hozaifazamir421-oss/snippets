const jwt = require('jsonwebtoken')

const generateAccessToken = (user)=>{
    return jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

const generateRefreshToken = (user)=>{
    return jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

module.exports = {generateAccessToken, generateRefreshToken}