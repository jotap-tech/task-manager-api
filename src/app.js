import express from "express"
import healthRoute from "./routes/healthRoutes.js"

const app = express()

app.use(healthRoute)

export default app