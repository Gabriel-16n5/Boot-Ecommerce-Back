import express from "express";
import cors from "cors";
import { signIn, signUp } from "./controllers/authController";
// import router from "./routes/index.Router.js";
const app = express();
app.use(cors());
app.use(express.json());
// app.use(router);

app.post('/signIn', signIn);
app.post('/signUp', signUp);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("server running on port 8000 || or who knows"))