import express from 'express'
import { createTask, deleteTaskById, getTaskById, getTasks, getTasksInBin, moveTaskstoBin, restoreTasks, updateTasks, updateTasksStage } from '../controllers/tasksControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/:id').put(protect, updateTasks).get(protect, getTaskById).delete(protect,admin, deleteTaskById)
router.route('/bin/:id').put(protect, moveTaskstoBin)
router.route('/restore/:id').put(protect, restoreTasks)
router.route('/stage/:id').put(protect, updateTasksStage)
router.route('/bin/list').get(protect, getTasksInBin)


export default router  