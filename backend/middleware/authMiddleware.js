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
        // if(token){
        //     console.log(`the token is recieved from header.`)
        // }

        //2)verifying the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        //when the verification or the expiration time of accesstoken is reached. the jwtverify throws error.
        //now since this error is thrown inside a try block, it directly goes to catch block skippin all the
        //lines below it. the attaching of user to the req. 

        //3)attaching user info
        req.user = await User.findById(decoded.id).select("-password")
        if (!req.user) {
            return res.status(500).json({ message: "Invalid token user" });
        }

        //4)moving to next
        next()

        
    } catch (error) {
        
        console.log("Auth Middleware Error:", error.message)
        return res.status(401).json({message: "Invalid or expired Token"})

    }
}

module.exports = verifyAccessToken