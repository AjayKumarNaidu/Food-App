import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next)=>{

  const {token} = req.headers;
  
  try {
    
    if(!token){
      return res.json({success:false,message:"not authorized user"})
    }
    const token_decode = jwt.verify(token,'ajaykumar');
    
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export default authMiddleware;