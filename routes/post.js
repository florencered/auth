const router=require("express").Router(); 
const {publicPosts,privatePosts}=require("../db");  
const checkAuth=require('../middleware/checkAuth')
console.log(publicPosts);
router.get('/public',(req,res)=>{
    res.json(publicPosts); 
    console.log(publicPosts);
}) 
router.get('/private',checkAuth,
//     let userValid=false; //by default the user is not verified 
//     if(userValid){
//         next(); //hope onto the next function only if userValid is true
//     } else{  //else return an error message
//         return res.status(400).json({
//             "errors":[
//                 {
//                     "msg":"Access Denied"
//                 }
//             ]
//         })

//     }
//},
(req,res)=>{
    res.json(privatePosts); 
    console.log(privatePosts);
}) 

module.exports=router;
