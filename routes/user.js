import { Router } from 'express';

const router = Router();

router.get("/usertest", (req,res) =>{
  res.send("user teste deu bom!")
});

export default router;