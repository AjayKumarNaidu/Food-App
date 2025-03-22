import foodModel from "../model/foodmodel.js"

export const addFood = async(req,res)=>{
  const {name,price,desc,image,category} = req.body
  try {
    const foodItem = new foodModel({name,price,desc,image,category})
    await foodItem.save()
    return res.json({success:true,message:"Food Added"})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export const list = async(req,res)=>{
  try {
    const items = await foodModel.find({})
    return res.json({success:true,data:items})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export const del = async(req,res)=>{
  const {id} = req.params
  try {
    const foodItems = await foodModel.findByIdAndDelete(id)
    if(!foodItems){
      return res.json({success:false,message:"food item not found"})
    }
    return res.json({success:true,message:"food deleted"})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}