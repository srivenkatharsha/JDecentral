import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import app from "./routes/operations.route.js"


dotenv.config()

const application = express()

application.use(cors())
application.use(app)

mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin"
    }
).then(() => {
    console.log("CONNECTED TO THE DATABASE.")
})

application.listen(process.env.PORT_NUMBER,() => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}`)
})