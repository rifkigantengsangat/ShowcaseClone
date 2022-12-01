import prisma from "../prisma/index.js"
import bcrypt from 'bcrypt'
import multer from "multer";
import { registerValidator } from "../Validation/UserValidation.js";
import {ErrorResponseJson} from '../Helper/ErrorResponseJson.js'
import {SuccessResponseJson} from '../Helper/SuccessResponse.js'
import jwt from 'jsonwebtoken'
const DIR = "../public/"
const storage = multer.diskStorage({
  destination : ( req,res,cb)=>{
    cb(null,DIR)  
  },
  filename : (req,res,file)=>{
    const filename = file.originalname.toLowerCase().split(' ').join('-')
  }
})
export  const upload = multer({
  storage : storage,
  fileFilter : (req,file,cb)=>{
if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype ==="image/jpeg"){
  cb(null,true)
}else{
  cb(null,false)
  return cb(null,(new Error("only Image png,jpg,png")))
}
  }
})
export const UserRegister  =async (req,res)=>{

  

    const {username,email,password,profileUser} = req.body;
    const saltRounds = 10;
    const oldEmail = await prisma.user.findFirst({
        where:{
            email : email
        }
    })
    const hashingPassword =bcrypt.hashSync(password,saltRounds)
     try {
        if(oldEmail){
            return ErrorResponseJson(res,401,"Email Has Already Data")
        }
        if(registerValidator(username, email, password) === -1){
          return ErrorResponseJson(res, 401, "Invalid Username Or Password")
        }
        if(registerValidator(username, email, password) === -2){
            return ErrorResponseJson(res, 401, "Email Not Valid")
            
          }
          if(registerValidator(username, email, password) === -3){
            return ErrorResponseJson(res,401,"Password Must Be Uppercase Lowercase Number And Symbol")
          }
          if(registerValidator(username, email, password) === -4){
            return ErrorResponseJson(res, 401, "Email Already In Database")
          }
          const user = await prisma.user.create({
            data : {
                username,
                email,
                password : hashingPassword,
                ProfileUser : profileUser
            }
          })
          return SuccessResponseJson(res, 201, "Create User SuccessFully", user)
     } catch (error) {
      res.status(error)
        return ErrorResponseJson(res,401, error.message)
     }
}
export const userLogin =async (req, res) => {
   const user = await prisma.user.findFirst({
    where:{
        email :req.body.email
    }
   })
   const comparePassword = bcrypt.compareSync(req.body.password,user.password);
   if(!comparePassword) return ErrorResponseJson(res, 401, "Email Or Password Not Valid")
   const Token = jwt.sign({user},"klfmdklsdfkjlj83ri984u983kshdfisuhdf748734yksdhfkusdhf",{
    expiresIn : '1d'
   })
   const users = {...user,"Token" : Token}

   return SuccessResponseJson(res,201,'Login Successfully',users)
    
}