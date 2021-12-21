const express=require('express')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./route/product'))
app.use('/',require('./route/user'))

const port=process.env.port || 3000

app.listen(port,(err)=>{
    if(err){
        console.log(`error in server creation ${err}`)
    }
    else{
        console.log(`Server is up and ruuning on port ${port}`)
    }
})