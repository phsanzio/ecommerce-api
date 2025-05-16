import { Router } from 'express';

const router = Router();

router.get("/usertest", (req, res) =>{
  res.send("user teste deu bom!");
});

router.post("/userposttest", (req, res) =>{
  const username = req.body.username;
  res.send("your username is: " + username);
});

export default router;