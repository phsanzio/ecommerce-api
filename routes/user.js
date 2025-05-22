import { Router } from 'express';
import verifyJwt from './jwtToken.js';

const router = Router();

router.put("/:id", verifyJwt.AuthandToken, async (req, res) =>{
  if(req.body.password){
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try{
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true});
    res.status(200).json(updateUser);
  } catch(err){
    res.status(500).json(err);
  }

})

export default router;