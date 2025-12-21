const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required: [true, "Name is required"],
        minlength: [3, "Name must be atleast 3 characters long"],
    },
    email:{
        type: String,
        trim: true,
        required: [true,"Email is required"],
        match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength: [6, "Password should be atleast 6 character long"]
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER',
    },
}, {timestamps : true});


//hashpassword before save
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();

    }catch(error){
        next(error)
    }
})

//compare password while login
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare( enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)