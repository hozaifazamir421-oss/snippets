// const {ROLES} = require('./roles')
const ROLES = require('./roles')


function authorize(requiredPermissions){
    return(req,res,next) =>{
        try {
            const userRole = req.user?.role
            if(!userRole){
                return res.status(403).json({message: "Unauthorized"});
            }
    
            const rolePermissions = ROLES[userRole];
            //to check if the role is not defined. probably will not happen.just a chekc
            if(!rolePermissions){
                return res.status(403).json({message:"Role not defined"})
            }
    
            if(!rolePermissions.includes(requiredPermissions)){
                return res.status(403).json({message: "Access Denied!"})
            }
            next()
        } catch (error) {
            console.log("authorize Error:", error.message)
            return res.status(401).json({message: "something went wrong in authorize"})

        }
    }
}

module.exports = {authorize}