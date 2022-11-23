import  isEmail  from "validator/lib/isEmail.js";
import validator from "validator";
export const registerValidator = (username,email,password)=>{
    if(!username && !password && !email) return -1;
    if(!isEmail(email)) return -2
    if(!validator.isStrongPassword(password)) return -3;
   
}