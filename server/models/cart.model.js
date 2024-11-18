import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default:1
      },
      user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
},{
timestamps:true
});


const CartModel = mongoose.model("cart",cartSchema)

export default CartModel