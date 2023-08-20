//setting up the routes
const router=require("express").Router();  
const {check,validationResult}=require("express-validator"); 
const {users}=require("../db"); 
const bcrypt=require('bcrypt'); 
const JWT=require('jsonwebtoken')
//home router  
router.get('/',(req,res)=>{
    res.send("auth route working");
}) 
router.post('/signup',[
    check("email","Please provide a valid email")
    .isEmail(),
    check("password","Password should be between 6 to 12 characters")
    .isLength({
        min:6,
        max:12
    })
],async (req,res)=>{
    const {password,email}=req.body; 
    //return an array of errors if the email is not verified
    const errors=validationResult(req);
    console.log(email); 
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //validate if user exists already (after it passes the legit email and password test)
    let user=users.find((user)=>{
        return user.email===email
    });
    if(user){
        return res.status(400).json({
            "errors": [
                {

                  "msg": "The entered user already exists",
                  "path": "email",
                  "location": "body"
                } 
            ]
        })
    } 
    const hashedPassword=await bcrypt.hash(password,10);   
    console.log(hashedPassword);
    users.push({

        email,
        password:hashedPassword
    })  

    const token=await JWT.sign({
        email  
//this random secret key needs to be stored in a .env folder
    },"ghgvhrfvbhrfbvhrvbhrvufcevhvbgfh",{
        expiresIn:3600000
    }) 
    
res.json({
    token
})
}) 
//get all the email and hashed passwords stored in json format 
router.get("/all",(req,res)=>{
    res.json(users); 
    console.log(users);
   
    res.send("email and password are valid"); 
    
}) 
//loging in credentials 
router.post('/login',async (req,res)=>{
    const {password,email}=req.body; 
    let user=users.find((user)=>{
        return user.email===email
    }) 
    if(!user){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"Invalid Credentials"
                }
            ]
        })
    } 
    //matching the password entered by the user in database 
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"Invalid Credentials"
                }
            ]
        })
    } 
    const token=await JWT.sign({
        email  
//this random secret key needs to be stored in a .env folder
    },"ghgvhrfvbhrfbvhrvbhrvufcevhvbgfh",{
        expiresIn:3600000
    }) 
    
res.json({
    token
})
}) 
    

//exporting the router 
module.exports=router;