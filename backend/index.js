import Express  from "express";
import router from "./Router/index.js";
const app = Express()
const port =  3000
app.use('/', router)
app.use(Express.json())
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })