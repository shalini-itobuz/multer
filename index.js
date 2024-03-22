import express from 'express';
import multer from 'multer';

const app = express();
const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , 'uploads/')
    },
    filename: function (req , file ,cb){
        cb(null,`${Date.now()}${file.originalname}`)
    },
})
const upload = multer({ storage })

function uploadMiddleware(req, res, next) {
    try {
        upload.single('photos')(req, res, function(err) {
            if(err) res.status(400).json({status: 'error', message: err.message})
            else next()
        })
    } catch (error) {
        console.log('errorrororororororoor');
    }
}

app.post('/file', uploadMiddleware, (req, res) => {
    console.log('my route')
    console.log(req.body , req.file)
    res.end();
})

app.post('/multipleFile', upload.array('photos', 12), (req, res, next) => {
    console.log(req.body , req.files)
    res.end();
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})