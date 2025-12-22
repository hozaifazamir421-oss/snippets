const jwt = require('jsonwebtoken')

const optionalAuth= (req,res,next)=>{
    
    const authHeader = req.headers.authorization
    if(!authHeader){  
        return next()
    }

    let token ;
    if(authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        return next()
    }
    try {
        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.user = decoded
    } catch (err) {
        console.log("Token verification failed in optionalAuth:", err.message);
        return res.status(401).json({message:"optionalAuth: accesstoken expire."})
    }
    next()
}

module.exports = optionalAuth