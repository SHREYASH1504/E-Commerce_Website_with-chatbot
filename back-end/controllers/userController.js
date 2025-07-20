import isEmail from "validator/lib/isEmail.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
// Route for User Login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({succes:false,message:"User Doesn't Exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createToken(user._id)
            res.json({succes:true,token})

        }
        else{
            res.json({succes:false,message:'Invalid Crenditals'})
        }
    } catch (error) {
        
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user register
const registerUser = async (req,res) => {
    try {
       const{name, email , password} = req.body;

       // check if user already exist
       const exists = await userModel.findOne({email});
       if(exists){
        return res.json({success:false,message:"User already exist"})
       }
       // validating email format and strong password
       if(!isEmail(email)){
        return res.json({success:false,message:"Please Enter a valid Email"})
       }
       if(password.length < 8 ){
        return res.json({success:false,message:"Please Enter a strong Password"})
       }
       //hashing user password
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       const newUser = new userModel({
        name, 
        email,
        password: hashedPassword
       })

       const user = await newUser.save();
       const token = createToken(user._id);

       res.json({success: true,token,});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//Route for admin login
const adminLogin = async (req,res) =>{
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"InValid Credentials"})
        }
            
    } catch (error) {
        
    }
}
export {loginUser,registerUser,adminLogin}