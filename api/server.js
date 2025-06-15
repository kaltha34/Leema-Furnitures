import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from './src/config/database.js'
import furnitureRoutes from './src/routes/customers.js'
import errorHandling from "./src/middlewares/middleware.js"
import createCustomerTable from "./src/data/createCustomerTable.js"

dotenv.config();

const app = express();
const port = process.env.PPORT || 5000;

// Middleware
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/furnitures', furnitureRoutes);

// Error handling middleware
app.use(errorHandling)

// Create table before starting server
createCustomerTable()

// Test pg connection
app.get("/", async(req, res) => {
  const result = await pool.query("SELECT current_database()")
  res.send(`The database name is: ${result.rows[0].current_database}`)
})

// Server running
app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});




