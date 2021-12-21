const express=require('express')
const router=express.Router();
const productModel=require('../model/Schema/product')
const upload=require('../utils/multer')
const fs=require('fs')
const path=require('path');

router.post('/Product',upload.single('image'),async(req,res)=>{
    try{
const {title,des,image,slog,selling_Price,purchase_Price}=req.body
if(!title || !des || !slog || !selling_Price || !purchase_Price){
    return res.status(200).json({message:"All fields are required",success:false})
}
if(purchase_Price > selling_Price){
    return res.status(200).json({message:"purchase price can't be greater than selling price",success:false})
}
console.log(req.file)
const product=new productModel({
    title,
    des,
    image:req.file.filename,
    slog,
    selling_Price,
    purchase_Price
})
const data=await product.save();
res.status(201).json({message:"Product added Successfully",success:true,data:data})
    }catch(err){
        res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }
})
router.get('/product',async(req,res)=>{
    try{
const data=await productModel.find();
res.status(200).json({message:"All products",success:true,data:data})
    }catch(err){
        res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }
})

router.delete('/product/:id',async(req,res)=>{
    try{
const id=req.params.id;
const data=await productModel.findByIdAndDelete(id);
res.status(200).json({message:"product deleted",success:true})
    }catch(err){
        res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }

})

router.patch('/product/:id',upload.single('image'),async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        
        if(req.file){
            const pro=await productModel.findById(id);
            const p=path.join(__dirname,`../uploads/${pro.image}`)
            console.log(p)
            fs.unlink(p,(err)=>{
                if(err){
                    console.log(err)
                }
            })
            console.log("file deleted")
            const product=await productModel.findByIdAndUpdate(id,{image:req.file.filename})
        }
        else{
            const d= await productModel.findByIdAndUpdate(id,data)
        }
      res.status(201).json({message:"product updated",success:true,data:d})
    }catch(err){
        res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }
})

module.exports=router