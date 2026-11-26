import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = 3000;
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(error)
  }
}

startServer();
