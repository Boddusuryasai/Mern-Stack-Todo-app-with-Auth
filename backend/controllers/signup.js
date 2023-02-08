const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const account= require("../models/account")
const { validationResult } = require('express-validator');

    
const signup=async (req,res)=>{
    //validation of body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
       //validate the data, if exists
        //check if email is in correct format
    try {
         //collect all information
        const { username , email, password} = req.body;
        console.log(username)
        //check if user exists or not in db
        console.log(account)
        const checkuser =await account.findOne({ email });
        if(checkuser){
            res.status(400).json({ success:false, msg:"email already registered"})
        } 
              //encrpyt the password and 
               //create a new entry in database
               else{
               const encrpyted = await bcrypt.hash(password, 10)
         
           //create a token and send it to user
             //don't want to send the password
         const newuser=  await account.create({
            username, 
            email,
            password: encrpyted
         }) 
          const payload = {id:newuser._id}
           const token = jwt.sign(payload,process.env.SECRET)
           res.status(200).json({ success:true, token})
        }
         
        
        }

        
     catch (error) {
        console.log(error)
        res.status(400).send("internal server error")
    }
}
module.exports=signup