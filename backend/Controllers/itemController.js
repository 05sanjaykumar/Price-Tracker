
const itemModel=require('../Models/Item')
const userModel=require('../Models/User');
const mongoose = require('mongoose');
// const addItem=async (req,res)=>{
//     console.log(req.body);

//     try {
//         let userData=await userModel.findOne({_id:req.body.userId});
//         let cartData=await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId]=1;
//         }else{
//             cartData[req.body.itemId]+=1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Added to Cart"});
//      } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"});
//      }
 
//  }
const addItem = async (req, res) => {
    
    try {
        
      let userData = await userModel.findOne({ _id:'676322fa015586dc65f28ee7'});
      
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {};
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }
  
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error" });
    }
  };
  
 
const listItem=async (req,res)=>{
    console.log(req.body)
    try {
        
        let userData=await userModel.findOne({_id:'676322fa015586dc65f28ee7'});
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"});
    }
}

const removeItem=async(req,res)=>{
    try {
        let userData=await userModel.findById({_id:'676322fa015586dc65f28ee7'});
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
          cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    };
    }
 module.exports={addItem,listItem,removeItem};