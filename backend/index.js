import express from 'express'
import path from "path";
import morgan from "morgan";
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from '../backend/routes/userRoutes.js'
import tasksRoutes from '../backend/routes/tasksRoutes.js'
import storeRoutes from '../backend/routes/storeRoutes.js'
import incomeRoutes from '../backend/routes/incomeRoutes.js'
import expenseRoutes from '../backend/routes/expenseRoutes.js'
import customerRoutes from '../backend/routes/customerRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMidlleware.js';




dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/expense', expenseRoutes)
app.use('/api/customers', customerRoutes)
// app.use('/api/upload', uploadRoutes)






const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/admindash/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "admindash", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnin...");
  });
}




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
