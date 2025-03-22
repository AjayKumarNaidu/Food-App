import orderModel from "../model/orderModel.js";
import userModel from '../model/userModel.js';

//placing order from frontend
export const placeOrder = async (req,res)=>{
  const {userId,items,address,amount} = req.body;
  try {
    const newOrder = new orderModel({userId,items,address,amount})
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    return res.json({success:true,message:"order placed successfully"})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

//fetcing the total orders of that user
export const userOrders = async (req,res) => {
  const {userId} = req.body;
  try {
    const orders = await orderModel.find({userId})
    return res.json({success:true,data:orders})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

//fetch all orders for the admin
export const allOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({})
    return res.json({success:true,data:orders})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

//update delivery options
export const updateOption = async(req,res)=>{
  const {userId,option} = req.body
  try {
    const updateOrder = await orderModel.findByIdAndUpdate(userId,{status:option})
    return res.json({succes:true,message:'status Updated'})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

