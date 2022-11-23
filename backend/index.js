import Express  from "express";

const app = Express()
const port =  4000

app.listen (()=>{
    console.log(`server berjalan di http://localhost:${port}`)
})