import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL
, {tlsAllowInvalidCertificates: true})
.then(() => console.log("Conectado ao MongoDB!"))
.catch((err) => {
  console.log(err);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});