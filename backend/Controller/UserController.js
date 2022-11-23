import prisma from "../prisma/index.js"
import bcrypt from 'bcrypt'
import { registerValidator } from "../Validation/UserValidation.js";
import {ErrorResponseJson} from '../Helper/ErrorResponseJson.js'
import {SuccessResponseJson} from '../Helper/SuccessResponse.js'
export const UserRegister  =async (req,res)=>{
    const {username,email,password} = req.body;
    console.log(username,email,password)
    const saltRounds = 10;
    const oldEmail = await prisma.user.findFirst({
        where:{
            email : email
        }
    })
    console.log(oldEmail)
    const hashingPassword = bcrypt.hashSync(password,saltRounds)
     try {
        if(oldEmail){
            return ErrorResponseJson(401,'401',"Email Has Already Data")
        }
        if(registerValidator(username, email, password) === -1){
          return ErrorResponseJson(401, "401", "Invalid Username Or Password")
        }
        if(registerValidator(username, email, password) === -2){
            return ErrorResponseJson(401, "401", "Email Not Valid")
            
          }
          if(registerValidator(username, email, password) === -3){
            return ErrorResponseJson(401,"401","Password Must Be Uppercase Lowercase Number And Symbol")
          }
          if(registerValidator(username, email, password) === -4){
            return ErrorResponseJson(401, "401", "Email Already In Database")
          }
          const user = await prisma.user.create({
            data : {
                username,
                email,
                password : hashingPassword,
            }
          })
          return SuccessResponseJson(201, "201", "Create User SuccessFully", user)
     } catch (error) {
        return ErrorResponseJson(404,'404', error.message)
     }
}
export const userLogin =async (req, res) => {
   const user = await prisma.user.findFirst({
    where:{
        email :req.body.email
    }
   })
   const comparePassword = bcrypt.compareSync(req.body.password,user.password);
   if(!comparePassword) return ErrorResponseJson(404, "404", "Email Or Password Not Valid")
}