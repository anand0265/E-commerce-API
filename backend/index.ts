// import express, { type Express, type Request, type Response } from "express";
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import http from "http";

// import cors from "cors";
// import path from "path";


// import routes from './app/routes'
// import dotenv from 'dotenv';

// dotenv.config();


// const port = Number(process.env.PORT) || 5000;

// const app: Express = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));

// const initApp = async (): Promise<void> => {

//    app.use('/api',routes);

//   // Serve media files
//   const mediaPath = path.join(__dirname, "uploads");
//   app.use("/uploads", express.static(mediaPath));

//   app.get("/", (req: Request, res: Response) => {
//     res.send({ status: "ok" });
//   });


//   http.createServer(app).listen(port, () => {
//     console.log("Server is runnuing on port", port);
//   });
// }

// void initApp();




import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import routes from './app/routes';
import { pool } from './app/common/services/sql.service'; // assuming your db.ts is in the same root
import { initPassport } from "./app/common/services/passport-jwt.service";
const app: Express = express();
import passport  = require("passport");

dotenv.config();
initPassport();
app.use(passport.initialize());

const port = Number(process.env.PORT) || 5000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Basic route to test DB connection
app.get("/db-test", async (req: Request, res: Response) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT 1");
    conn.release();
    res.send({ status: "connected", rows });
  } catch (err) {
    res.status(500).send({ status: "error", error: err });
  }
});

const initApp = async (): Promise<void> => {
  app.use('/api', routes);

  const mediaPath = path.join(__dirname, "uploads");
  app.use("/uploads", express.static(mediaPath));

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

 // connect db
pool.query('SELECT 1').then(()=>{
  // myusql conn
  console.log("MySql Database Connected")
  //listen
      app.listen(port,()=>{
          console.log(`App listining the ${process.env.PORT}`)
      })
  })
};

void initApp();
