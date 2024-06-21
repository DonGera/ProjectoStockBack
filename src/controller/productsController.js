import { Product } from "../db/models/Product";

/** Products Controller
 * @module controllers
 * @requires utilities
 */


/**
   * Gets products from Mongo DB
   * @async
   * @returns {Product[]} - Array of Products
   * @throws {Error} - If something happens during fetching
 */
const getProducts = async () => {
  try {
    const getProductsResponse = await Product.find();
    console.log(`products: ${getProductsResponse}`);
    
    return getProductsResponse;
  } catch (error) {
    throw new Error(error);
  }
};


/**
   * Gets product by ID from Mongo DB
   * @async
   * @returns {Product | null} - Product if found, null otherwise
   * @throws {Error} - If something happens during fetching
 */
const getProductById = async (productId) => {
    try {
        const product = await Product.find({id: productId});
        
        console.log(`product: ${product}`);
        return product;
    } catch (error) {
      throw new Error(error);
    }
  };


/**
   * Add new product to database
   * @function
   * @async
   * @param {Product} newProduct- New product info
   * @returns {Product} - Object with product info
   * @throws {Error} - If something happens during fetching
 */
const addProduct = async (newProduct) => {
    try {
      // Insert product to DB

      const newProdWithDate = {
        ...newProduct,
        lastCheckDate: Date.now()
      };

      const addProductResponse = await Product.create(newProdWithDate);

      console.log('addProductesponse: ', addProductResponse);

      return addProductResponse;
    } catch (error) {
      throw new Error(error);
    }
  };
  

  /**
   * Updates an existing product from database
   * @function
   * @async
   * @param {Number} productId- ID of the product to be updated
   * @param {Object} newProductInfo - New info of product
   * @returns {Object} - Object with product info
   * @throws {Error} - If something happens during fetching
 */
const updateProduct = async (productId, newProductInfo) => {
    try {

        const filter = { _id: productId };
        
        const newProdWithDate = {
            ...newProductInfo,
            lastCheckDate: Date.now()
        };

        const updateProductResponse = await Product.findOneAndUpdate(filter, newProdWithDate, {
            new: true
        });

        console.log('updateProductResponse: ', updateProductResponse);
        return updateProductResponse;
    } catch (error) {
      throw new Error(error);
    }
  };
  
   /**
   * Deletes an existing product from database
   * @function
   * @async
   * @param {Number} productId- ID of the product to be updated
   * @returns {Object} - Object with product info
   * @throws {Error} - If something happens during fetching
 */
const deleteProduct = async (productId) => {
  try {
      const filter = { _id: productId };

      const deleteProductResponse = await Product.deleteOne(filter);

      console.log('deleteProductResponse: ', deleteProductResponse);
      return deleteProductResponse;
  } catch (error) {
    throw new Error(error);
  }
};
  
export default { addProduct, getProducts, getProductById, updateProduct, deleteProduct };