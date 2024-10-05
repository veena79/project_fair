//1.import express
const express=require('express')
//import usercontrollr file

const userController=require('./controller/userController')

//import projectControlller
const projectController=require('./controller/projectController')

const jwt=require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')
//2.create an object for router class
const router=new express.Router()
//3.set up path for each request from view
//register
router.post('/register',userController.registerController)
//login
router.post('/login',userController.loginController)
//addproject

router.post('/addproject',jwt,multerConfig.single('projImage'),projectController.addProjectController)
//all projects

router.get('/allprojects',jwt,projectController.getAllProjectsController)
//home project

router.get('/homeproject',projectController.homeProjectController)
//userproject
router.get('/userProject',jwt,projectController.userProjectController)
//delete project
router.delete('/delete/:id',projectController.deleteProjectController)
//edit project
router.put('/editproject/:id',jwt,multerConfig.single('projImage'),projectController.editProjectController)
//edit profile
router.put('/editprofile',jwt,multerConfig.single('profile'),userController.editProfileController)
//4.export the router
module.exports= router