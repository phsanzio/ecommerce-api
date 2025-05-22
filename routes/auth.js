import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.post("/login", async (req, res) => {

  try{
    const user = await User.findOne({ username: req.body.username});
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }
    const is_password = await bcrypt.compare(req.body.password, user.password);
    if (!is_password){
      res.status(401).json({ message:"Senha incorreta!" });
    }
    
    const jwt_token = jwt.sign({
      id: user._id, 
      isAdmin: user.isAdmin,
    }, process.env.JWT, {expiresIn:"3d"});

    res.status(200).json({ message:"Login bem-sucedido!" , jwt_token});
  } catch(err) {
    res.status(500).json(err);
  }
  
});

export default router;