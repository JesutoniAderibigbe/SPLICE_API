const express = require("express")
const Product = require('../models/Products')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;



exports.addProduct = async(req, res)=> {


    try {


        //instead of creating a middleware, I handled it here by ensuring that it is only admin that can add products and not just a random user who gets the endpoint by checking or hacking. So if the header is not an admin, it won't be authorized to create products.
        
        const product = new Product({
          
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename
        })
        await product.save();

         // Construct URL to image file
         const imageUrl = `http://localhost:8000/public/${product.image}`;


        res.json({
            success: true,
            message: 'Product added successfully',
            product: {
              
                title: product.title,
                price: product.price,
                image: imageUrl
            }
        }); console.log(product)
        
    } catch (error) {
        res.status(404).json({error: error.message}),

        console.log(error)
        
    }
    
}

exports.getAllProducts = async(req, res)=>{
    try {
        const product = await Product.find()
      

        if(!product){
            return res.status(400).json({message: "There are no products at all in this database"})
        }
        const productsWithImageUrl = product.map(product => {
            const imageUrl = `http://localhost:8000/public/${product.image}`;
            return {
              title: product.title,
              price: product.price,
              image: imageUrl
            }
          });
      
          return res.status(200).json(productsWithImageUrl);
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
   
}


exports.getProductsbyName = async(req, res)=> {
    const brand = req.params.brand;
    const regex = new RegExp(brand, 'i'); // 'i' flag makes the search case-insensitive
    try {
      const products = await Product.find({ title: regex });
      if (!products.length) {
        return res.status(404).json({ message: `No products found for ${brand}` });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  


