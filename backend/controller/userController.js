const User = require('../modals/userSchema')
const RefreshToken = require('../modals/refreshTokenSchema')
const {generateAccessToken, generateRefreshToken} = require('../utils/tokenUtils')
const jwt = require('jsonwebtoken')
const ms = require('ms')

const registerUser = async (req, res)=>{
  /*----1) Get user data (name, email, password) from request body
        2) Check if user already exists
        3) Create a new user in DB
        4) Generate access token and refresh token
        5) Save refresh token in DB
        6) Send refresh token in HTTP-only cookie
        7) Respond with access token and user info---------*/

    try{
        // 1) done
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: "Please provide username, email, and password" 
            });
        }
        const existingUser = await User.findOne({
            $or : [{email}, {username}]
        })
        //2) done
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        //3) DONE   
        const user = await User.create({username, email, password})

        //4) access and refresh token generation
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        //5)saving refresh token in DB
        await RefreshToken.create({user: user._id, token: refreshToken,
                                expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY)) // 7 days
        })

        //6) sending refreshtoken in httpOnly cookie
        res.cookie("refreshToken", refreshToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY), // 7 day
        })

        //7)sending "access token"  and "user"

        return res.status(201).json({
            message: "User Registered successfully",
            tokens:{accessToken},
            user:{
                id: user._id, username: user.username, email: user.email 
            }
        })

    }catch(error){
        console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
    }
}

//-------------LOGIN ---------------------------------------------
// 1) Get email and password from request body and check if they are there.
// 2) Check if user exists
// 3) Compare entered password with hashed password in DB
// 4) If correct, generate access and refresh tokens
// 5) Save refresh token in DB
// 6) Send refresh token in secure HTTP-only cookie
// 7) Send access token and user info in response
const loginUser = async(req,res)=>{
    try {
        //1) getting email and password
        const {username, email, password} = req.body
        console.log(username, email)
        if(!(username || email)){
            return res.status(400).json({ 
                message: "Please provide username, email, and password" 
            });
        }
        //2) checking if user exists?
        const user = await User.findOne({
            $or: [{username}, {email}]
        })

        if(!user){
            return res.status(400).json({ message: "Invalid email or password" })
        }

        //3) compare password
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Password incorrect"})
        }

        //4) generating access and refresh token
        const accessToken = generateAccessToken(user)
        const refreshToken=  generateRefreshToken(user)

        //5) saving refresh token in DB
        await RefreshToken.create({user: user._id, token: refreshToken,
                                expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY)) // 7 days
        })
        //6) sending refresh token in cookie in httpOnly
        res.cookie("refreshToken", refreshToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY), // 7 day
        })
        //7)sending access token and user
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });


        
    } catch (error) {
        console.log("Error in login:", error)
        return res.status(400).json({message:"Login failed"})
    }
}

//---------------LOGOUT-----------------------------
/**
 
 *  POST /api/auth/logout
 */
/*
    1. Grab the refresh token from the HTTP-only cookie
    2. Remove that refresh token from the database (so it can’t be reused)
    3. Clear the cookie from the browser
    4. Respond with a success message
*/
const logoutUser= async(req,res)=>{
    try {
        //1) getting refresh token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
        }
        //2) removing refreshtoken from DB
        await RefreshToken.findOneAndDelete({token: refreshToken})

        //3) removing refreshtoken from cookie
        res.clearCookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        //4) send the response of successful logout.
        return res.status(200).json({message: "Logout Successful"})

        
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Server error during logout" });
        
    }
}

//---------------------refreshtoken---------------------
// 1. Get refreshToken from cookies
// 2. Check if it exists in DB (to ensure it’s valid and not revoked)
// 3. Verify the refresh token using jwt.verify()
// 4. Generate a new access token
// 5. Return it in the response

const refreshAccessToken = async(req,res)=>{
    try {
        //1) get refre token for cookie
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({message: "No refresh token provided."})
        }
        //2)checking it in DB
        const refreshTokeninDB = await RefreshToken.findOne({token: refreshToken})
        if(!refreshTokeninDB){
            return res.status(403).json({message: "Invalid or expired refresh TOKEN"})
        }

        //3)verifying the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)

        //4)generate new access token
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const newAccessToken = generateAccessToken(user)

        //5)sending new access token 
        return res.status(200).json({
            accessToken: newAccessToken
        })
        
    } catch (error) {
        console.log("Refresh Token error", error)
        return res.status(500).json({message: "Error generating token refresh"})
    }
}


module.exports = {registerUser, loginUser, logoutUser,refreshAccessToken}