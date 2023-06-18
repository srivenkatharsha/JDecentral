import mongoose from "mongoose"
import bcrypt from "bcrypt"

const details = new mongoose.Schema({
    userName : {
        type : String,
        required : false,
        default : "Anonymous"
    },
    password : {
        type : String,
        required : true
    },
    isJournalist : {
        type : Boolean,
        required : true
    }
});

details.pre("save",async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,6);
    }
    next()
})

const User = mongoose.model("profiles",details)

export default User