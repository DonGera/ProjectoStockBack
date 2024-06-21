/** Users Controller
 * @module controllers
 * @requires utilities
 */

const mockedUsers = [
    {
        id: 1,
        username: 'lionel'
    },
    {
        id: 2,
        username: 'carlos'
    },
];

/**
   * Gets users from Mongo DB
   * @function
   * @async
   * @returns {Object} - Object with users
   * @throws {Error} - If something happens during fetching
 */
const getUsers = async () => {
    try {
      // Read users from DB
      const users = mockedUsers;
      
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export default { getUsers };