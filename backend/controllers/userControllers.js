import userModel from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";

const createToken = (id)=>{
  return jwt.sign({id},'ajaykumar')
}

export const userRegister = async (req,res)=>{
  const {name,email,password} = req.body
  try {
    const exist = await userModel.findOne({email})
    if(exist){
      return res.json({success:false,message:"email already exist"})
    }

    const validEmail = validator.isEmail(email)
    if(!validEmail){
      return res.json({success:false,message:"email doesn't exist"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = new userModel({name,email,password:hashedPassword})
    await user.save()

    const token = createToken(user._id)

    return res.json({success:true,token})

  } catch (error) { 
    return res.json({success:false,message:error.message})
  }
}

export const userLogin = async (req,res)=>{
  const {email,password} = req.body
  try {
    
    const user = await userModel.findOne({email})

    if(!user){
      return res.json({success:false,message:"email not found"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.json({success:false,message:'invalid password'})
    }

    const token = createToken(user._id)

    return res.json({success:true,token})


  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

