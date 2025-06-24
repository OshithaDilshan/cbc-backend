import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    productId: {

    },
    description: {
        type: String,
        required: true
    }
})