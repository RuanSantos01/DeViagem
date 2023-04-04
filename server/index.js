// MIDDLEWARES
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";

// ROUTES
import authRoutes from "./routes/auth.js";

// TESTE
import User from "./models/User.js";
import SentCode from "./models/SentCode.js";
import { users, code } from "./data/index.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE 
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "public/assets")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });

// ROUTES WITH FILES
// app.post("/auth", upload.single("picture"), component)  <- EXEMPLO

// ROUTER WITH TOKEN
// app.post("/teste", verifyToken, component) <- EXEMPLO

// ROUTES
app.use("/auth", authRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
}).catch((err) => {
    console.log(err)
})
