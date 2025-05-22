import jwt from "jsonwebtoken";

const verification = (req, res, next) => {
  const authToken = req.headers.token;
  if (authToken){
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if(err){
        return res.status(401).json({ message: "Token não encontrado" });
      }
      req.user = user;
      next();
    })
  } else{
    return res.status(401).json({ message: "Não autenticado" });
  }
};

const AuthandToken = (req, res, next) => {
  verification(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin){
      next()
    } else {
      res.status(403).json({ message: "Sem autorização!" })
    }
  })
}

export default { verification, AuthandToken };