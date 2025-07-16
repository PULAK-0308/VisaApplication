const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save',async function(next){
    const person=this;

    if(!person.isModified('password'))
        return next();
    try{
        
        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(person.password,salt);
        console.log(hashedPassword)
        person.password=hashedPassword;
        console.log(this.password)
        console.log(person.password)
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        console.log(this.password)
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User', userSchema);

module.exports=User;
