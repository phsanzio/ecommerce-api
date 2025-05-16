import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL
, {tlsAllowInvalidCertificates: true})
.then(() => console.log("Conectado ao MongoDB!"))
.catch((err) => {
  console.log(err);
});

app.use(express.json());
app.use("/api/users", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});