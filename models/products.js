import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  reviews: Array,
});

const products = mongoose.model('products', productSchema);

export default products;
