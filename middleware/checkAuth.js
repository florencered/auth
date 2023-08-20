const JWT=require("jsonwebtoken");
module.exports=async (req,res,next)=>{
    const token=req.header('x-auth-header');
    if(!token){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"no token found"
                }
            ]
        })
    } 
    try{
    let user=await JWT.verify(token,"ghgvhrfvbhrfbvhrvbhrvufcevhvbgfh"); 
    req.user=user.email; //extract email from credentials requested from the user since that is the token here
    next();
}
    catch(error){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"token invalid"
                }
            ]
        })
    }
}