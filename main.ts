import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import studentRouter from "./router/student.routes.js"
import botRouter from "./router/bot.routes.js"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

//router
app.use(studentRouter)
app.use(botRouter)

app.listen(PORT, () => {
    console.log(`server is running at: ${PORT}`)
})
