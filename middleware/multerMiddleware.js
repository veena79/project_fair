//multer
//import multer
const multer=require('multer')
//store file
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')

    },
    filename:(req,file,callback)=>{
const filename=`image-${Date.now()}-${file.originalname}` //format for storing file
callback(null,filename)
    }
})
const fileFilter=(req,file,callback)=>{
if(file.mimetype=='image/png'||file.mimetype=='image/jpeg'||file.mimetype=='image/jpg'){
    callback(null,true)
}
else{
    callback(null,false)
    return callback(new Error('only png,jpg,jpeg files are accepted'))
}
}
const multerConfig=multer({
    storage,
    fileFilter
})
module.exports=multerConfig