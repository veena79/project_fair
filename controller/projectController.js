 const projects=require('../modal/productModel')
 exports.addProjectController=async(req,res)=>{
   console.log('inside addProjectController');
   const userid=req.payload
   console.log(userid);
const {title,language,github,website,overview}=req.body
const projImage=req.file.filename

try{
const existingProject=await projects.findOne({github})
if(existingProject){
    res.status(406).json('project already exist')
}
else{
    const newProject=new projects({
        title,language,github,website,overview,projImage,userid
    })
    await newProject.save()
    res.status(200).json(newProject)
}
}catch(error){
    res.status(401).json(error)
}

  
}
 
exports.getAllProjectsController=async(req,res)=>{
    const searchKey=req.query.search
    console.log(searchKey);
    try{
        const query={
            language:{$regex:searchKey,$options:'i'}
        }
const allProjects=await projects.find(query)
if(allProjects){
    res.status(200).json(allProjects)
}
else{
    res.status(406).json(' no projects')
}
    }catch(error){
        res.status(401).json(error)
    }
}
 exports.homeProjectController=async(req,res)=>{
    try{
const homeProjects=await projects.find().limit(3)
res.status(200).json(homeProjects)
    }catch(error){
res.status(401).json(error)
    }
 }
exports.userProjectController=async(req,res)=>{
    const userid=req.payload
    try{
const userProject=await projects.find({userid})
if(userProject){
res.status(200).json(userProject)
}
else{
    res.status(406).json('no project added yet')
}
    }catch(error){
        res.status(401).json(error)
    }
}
exports.deleteProjectController=async(req,res)=>{
    console.log('inside delete');
    const {id}=req.params
    console.log(id);
    try {
        //deleteOne-return true or false
        //
       const project=await projects.findByIdAndDelete({_id:id}) 
       res.status(200).json(project)
    } catch (error) {
        res.status(401).json(error)
        
    }
}
exports.editProjectController=async(req,res)=>{
    const {id}=req.params
    const userid=req.payload
    const {title,language,github,website,overview,projImage}=req.body
    const uploadedImage=req.file?req.file.filename:projImage
    try {
        const existingProject=await projects.findByIdAndUpdate({_id:id},{
            title,language,github,website,overview,projImage:uploadedImage,userid
        })
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }

}