// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()





// import express from 'express'
// const app = express()

// // IIFE , creating iife which is immdeatly executed 
// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", ()=>{
//             console.log("Express error", error)
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw err
//     }
// })()


