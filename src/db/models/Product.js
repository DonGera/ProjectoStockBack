import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: String,
    name: String,
    category: String,
    quantity: Number,
    unitPrice: Number,
    description: String,
    lastCheckDate: Date 
    
});

export const Product = mongoose.model('Product', ProductSchema);