const mongoose=require("mongoose")
const UserAccountSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email: {
        type: String,
        unique: true,
      },
    password:{
        type:String
      }

})
module.exports=mongoose.model("account",UserAccountSchema)