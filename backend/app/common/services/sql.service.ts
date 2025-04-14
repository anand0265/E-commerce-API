// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();
// console.log(process.env.DB_HOST);
// // Create a pool to the MySQL database
// export const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   multipleStatements: true,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
// });



// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_DATABASE:", process.env.DB_DATABASE);

// // Create a pool to the MySQL database
// export const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE, // fixed typo
//   waitForConnections: true,
//   multipleStatements: true,
// });


import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

// Create a pool to the MySQL database
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  multipleStatements: true,
});
