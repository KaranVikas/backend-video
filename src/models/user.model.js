import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// jwt - bearable token -- the token who has it can contain the value
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index: true
        },
        avtar:{
            type: String, //cloundinary url
            required: true,
        },
        coverImage:{
            type: String,
        },
        watchHistor:[    
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken:{
            type: String,
        }
    },
    {timestamps:true}
)

userSchema.pre('save', async function (next) {
    // to only do this if password modifies
    
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)    
    next()
    }
)

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User =  mongoose.Model("User",userSchema)