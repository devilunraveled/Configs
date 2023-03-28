import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/users.js";
import { postRoutes } from "./routes/posts.js";
import { subGreddiitRoutes } from "./routes/subGreddiits.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

/* Configs __*/
const __fileName = fileURLToPath( import.meta.url);
const __dirName = path.dirname(__fileName);
dotenv.config();

/*Invoking express */
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use("/assets", express.static(path.join(__dirName, "public/assets")));

/*File Storage Config */
const storage = multer.diskStorage({
    destination: function( req, res, cb ){
        cb(null, "public/assets");
    }, 
    fileName: function (req, file, cb){
        cb(null, file.originalname );
    }
}) // As found on the multer github repo.

const upload = multer({storage});
// This is the variable that will be used any time any upload
// is performed.

/*Routes For Local Storage*/
// ? We need the upload variable here, that's why it's handled here itself.
// !In this case, picture is not uploaded with registration, would need to handle it differently.
app.post("/auth/register", register);

/*Other Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/subGreddiits", subGreddiitRoutes);

/*Setting Up MongoDB */
const PORT = process.env.PORT || 6969; // *This sets up the port used for connection to MongoDB
mongoose.set('strictQuery', true); // !This version will be deprecated soon
mongoose.connect(process.env.MONGODB_URL, {
    useNewURLParser : true,
    useUnifiedTopology : true,
}).then( () => {
    app.listen( PORT, () => console.log(`Server Port : ${PORT}`));
}).catch(( error ) => console.log(`${error}, could not establish connection.`));