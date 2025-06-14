import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Pool } from 'pg'


dotenv.config();

const app = express();
const port = process.env.PPORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Middleware
app.use(express.json())
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});

pool.connect()
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database connection faild", err))


