import mongoose from 'mongoose'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import tasks from './data/tasks.js'
import Tasks from './models/tasksModel.js'

dotenv.config()

connectDB()


const importData = async () => {
    try {
        await Tasks.deleteMany()

        const sampleProducts = tasks.map(product => {
            return {...product}
        })

        await Tasks.insertMany(sampleProducts)


        console.log('Data Imported! '.green.inverse)
        process.exit()
 
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
       
        
        console.log('Data Destroyed! '.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
}
else {
    importData()
}