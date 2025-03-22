import userModel from '../model/userModel.js'

export const addToCart  = async (req,res)=>{
  const {foodId} = req.body
  const {userId} = req.body
  try {

    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    if(!cartData[foodId]){
      cartData[foodId] = 1
    }else{
      cartData[foodId] += 1
    }

    await userModel.findByIdAndUpdate(userId,{cartData})

    return res.json({success:true,message:'added to cart'})

  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export const removeFromCart  = async (req,res)=>{
  const {foodId} = req.body
  const {userId} = req.body
  try {
    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    if(cartData[foodId] > 0){
      cartData[foodId] -= 1
    }

    await userModel.findByIdAndUpdate(userId,{cartData})

    return res.json({success:true,message:'remove from cart'})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export const cartItems  = async (req,res)=>{
  const {userId} = req.body
  try {
    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData
    return res.json({success:true,cartData})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}


