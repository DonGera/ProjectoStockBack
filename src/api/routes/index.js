import express from 'express';
import productRoutes from './products';
import userRoutes from './users';

/** Express router providing policy related routes
 * @module routes
 * @requires express
 * @requires clientsRoutes
 * @requires policiesRoutes
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;