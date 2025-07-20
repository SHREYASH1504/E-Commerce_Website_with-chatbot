// function for add product 
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req,res) => {
    try {
        const {name,description,price,category,subcategory,sizes,bestseller} = req.body
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        console.log(name,description,price,category,subcategory,sizes,bestseller)
        console.log(image1,image2,image3,image4)
        
        const images = [image1,image2,image3,image4].filter((item) =>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            category,
            subcategory,
            price: Number(price),
            bestseller:bestseller === "true" ? true : false,
            sizes: sizes ? JSON.parse(sizes) : [],
            image:imagesUrl,
            date:Date.now()

        }
        const product = new productModel(productData)
        console.log(productData);
        await product.save()

        res.json({success:true, message:"Product Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
// function for list product
const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({sucess:true,products})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for remove products
const removeProducts = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// function for single product info
const singleProduct = async (req,res) => {
    try {
        const { productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getBestsellers = async (req, res) => {
  try {
    const products = await productModel.find({ bestseller: true });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export {listProducts,addProduct,removeProducts,singleProduct,getBestsellers}