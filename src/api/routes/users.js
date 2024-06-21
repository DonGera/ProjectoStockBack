import express from 'express';
import usersController from '../../controller/usersController';


/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Route: Get list of users.
 * @name get/users
 * @method
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/', async (req, res) => {
  try {
    const users = await usersController.getUsers();
    
    console.info('Number of users retrieved: ', users.length);

    res.status(200).send(users);
    
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});

/**
 * Route: Get User data by its ID.
 * @name get/users/:id
 * @method
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', async (req, res) => {
  try {
    if (req.params.id) {
        const users = await usersController.getUsers();
        const userFound = users.find((user) => user.id.toLowerCase() === req.params.id.toLowerCase());
        if (user) {
            res.status(200).send(userFound);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(422).send('No user ID has been provided'); // Or could use 400
    }
      
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});

export default router;