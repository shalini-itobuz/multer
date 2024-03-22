const express= require('express')
const multer  = require('multer')
const app=express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // console.log("inside storage",file)
      cb(null,Math.floor(Math.random()*100000)+(file.originalname))
    }
  })
  const upload = multer({ storage: storage })
// require("dotenv").config()
app.post('/uploading',upload.single('file1'),(req,res)=>{
    console.log(req.file)
})
let port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server is running on",port)
})