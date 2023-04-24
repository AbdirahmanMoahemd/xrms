import express from 'express'
import { createUser, deletUser, getAllUser, getUserProfileById, login, updateUser } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllUser).post(createUser)
router.route('/:id').put(updateUser).delete(deletUser)
router.route('/login').post(login)
router.route('/profile/:id').post(getUserProfileById)



export default router;