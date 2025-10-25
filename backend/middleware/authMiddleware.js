const jwt = require('jsonwebtoken')
const User = require('../modals/userSchema')

//1. Get token from cookie or header
//2. Verify the token
//3. Attach user info to request
//4. Move to next middleware

const verifyAccessToken = async(req, res, next)=>{
    try {

        //1) getting token
        const authHeader = req.headers.authorization
        let token;
        if(authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
        } else if(req.cookies?.accessToken){
            token = req.cookies.accessToken
        }
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }

        //2)verifying the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

        //3)attaching user info
        req.user = await User.findById(decoded.id).select("-password")
        if (!req.user) {
            return res.status(401).json({ message: "Invalid token user" });
        }

        //4)moving to next
        next()

        
    } catch (error) {
        console.log("Auth Middleware Error:", error.message)
        return res.status(401).json({message: "Invalid or expired Token"})

    }
}

module.exports = verifyAccessToken