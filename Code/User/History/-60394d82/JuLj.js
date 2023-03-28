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
// This is the variable that will be used any time any update 
// is performed.

/*Setting Up MongoDB */
const PORT = process.env.PORT || 6969;
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser : true,
    useUnifiedTopology : true,
}).then( () => {
    app.listen( PORT, () => console.log(`Server Port : ${PORT}`));
}).catch(( error ) => console.log(`${error}, could not establish connection.`));