//iimport mangoose
const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log(`mongodb running succesfully`);
}).catch((err)=>{
    console.log(`not connected due to ${err}`);
})