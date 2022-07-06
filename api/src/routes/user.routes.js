const { Router } = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    createUsersBulk
} = require('../controllers/userController');

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post("/bulk", createUsersBulk)
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
