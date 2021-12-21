const mongoose=require('../conn');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:3
    },
    des:{
        type:String,
        required:true,
        minlength:3
    },
    image:{
        type:String,
        required:true,
       
    },
    slog:{
        type:String,
        required:true,
       
    },
    selling_Price:{
        type:Number,
        required:true,
    },
    purchase_Price:{
        type:Number,
        required:true
    }
},{timestamps:true})
const productModel=mongoose.model('product',productSchema)
module.exports=productModel;