import { Router } from "express"


const router = Router()


router.get("/health", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "API funcionando",
  });
});


export default router