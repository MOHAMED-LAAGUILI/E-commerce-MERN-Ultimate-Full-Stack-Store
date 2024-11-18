import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name:{
    type:String
},
image:{
    type:Array,
    default:[]
},
category:[
    {
        type: mongoose.Schema.ObjectId,
        ref:"category"
    },
],
sub_category:[
    {
        type: mongoose.Schema.ObjectId,
        ref:"sub_category"
    },
],
unit:{
    type:String,
    default:""
},
stock:{
    type:Number,
    default:null
},
price:{
    type:Number,
    default:null
},
discount:{
    type:Number,
    default:null
},
description:{
    type:String,
    default:""
},
more_details:{
    type:Object,
    default:{}
},
public:{
    type:Boolean,
    default:true
},
},{
timestamps:true
});


const ProductModel = mongoose.model("product",productSchema)

export default ProductModel