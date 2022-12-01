import express  from "express";
import bodyParser from "body-parser";
import router from "./Router/index.js";
import multer from 'multer'
const app = express()
const port =  3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api', router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })