import express from 'express'
import { UserRegister,userLogin} from '../Controller/UserController.js'
const router = express.Router();
router.post('/register',UserRegister)
router.post('/login',userLogin)

export default router;