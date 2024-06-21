import express from 'express';
import productsController from '../../controller/productsController';

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Route: Get list of products
 * @name get/products
 * @method
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async (req, res) => {
  try {
    const products = await productsController.getProducts();
    
    console.info('Number of products retrieved: ', products.length);

    res.status(200).send(products);
    
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});

/**
 * Route: Get Product data by its ID
 * @name get/products/:id
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const productId = req.params.id;
      const productFound = await productsController.getProductById(productId);
      
      if (productFound) {
          res.status(200).send(productFound);
      } else {
          res.status(404).send('Product not found');
      }
    } else {
        res.status(422).send('No product ID has been provided'); // Or could use 400
    }
      
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});


/**
 * Route: Update existing Product data
 * @name put/products/:id
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/:id', async (req, res) => {
  try {        
    if (req.params.id && req.body) {
      const { name, unitPrice, quantity, category, description } = req.body;
      const productId = req.params.id;

      const newProductInfo = {
          name,
          unitPrice,
          quantity,
          category,
          description
      };

      const addNewProductResponse = await productsController.updateProduct(productId, newProductInfo);
      if (addNewProductResponse._id) {
          res.status(200).send(addNewProductResponse);
      } else {
          res.status(404).send('Product failed to be created');
      }
    } else {
        res.status(422).send('No product body has been provided'); // Or could use 400
    }
      
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});

/**
 * Route: Post New Product data
 * @name post/products
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', async (req, res) => {
    try {        
      if (req.body) {
        const { name, unitPrice, quantity, category, description } = req.body;
        const newProduct = {
            name,
            unitPrice,
            quantity,
            category,
            description
        };
        const addNewProductResponse = await productsController.addProduct(newProduct);
        if (addNewProductResponse._id) {
            res.status(200).send(addNewProductResponse);
        } else {
            res.status(404).send('Product failed to be created');
        }
      } else {
          res.status(422).send('No product body has been provided'); // Or could use 400
      }
        
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).send('An error has ocurred');
    }
  });
  
  

/**
 * Route: Delete existing Product data
 * @name put/products/:id
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/:id', async (req, res) => {
  try {        
    if (req.params.id) {
      const productId = req.params.id;

      const deleteProductResponse = await productsController.deleteProduct(productId);
      if (deleteProductResponse.acknowledged) {
          res.status(200).send(deleteProductResponse);
      } else {
          res.status(404).send('Product failed to be deleted');
      }
    } else {
        res.status(422).send('No product body has been provided'); // Or could use 400
    }
      
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});


export default router;