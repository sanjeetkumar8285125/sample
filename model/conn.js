const mongoose=require('mongoose')
const  config=require('./config');
mongoose.connect(config.dbURI,(err)=>{
    if(err){
console.log(`error in db ${err}`)
    }
    else{
        console.log('Database connected')
    }
})
module.exports=mongoose;