import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs";

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
    // const password = ;
    res.status(201).json(savedUser);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

export default router;