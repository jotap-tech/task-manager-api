import express from "express"
import healthRoute from "./routes/healthRoutes.js"
import taskRoutes from "./routes/tasksRoutes.js"

const app = express()
app.use(express.json());


app.use(healthRoute)
app.use(taskRoutes)


export default app