import  isEmail  from "validator/lib/isEmail.js";
import validator from "validator";
import multer from "multer";
export const registerValidator = (username,email,password,file)=>{
    if(!username && !password && !email) return -1;
    if(!isEmail(email)) return -2
    if(!validator.isStrongPassword(password)) return -3;
    if(!file) return -4
    
   
}