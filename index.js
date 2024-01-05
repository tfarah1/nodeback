import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import brandRoutes from "./routes/brand.js";
import categoryRoutes from "./routes/category.js";
import fileRoutes from "./routes/file.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import helmet from "helmet";
import debug from "debug";
import cors from "cors";


dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

const Debugger = debug("app:startUp");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  Debugger("morgan enabled!");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(helmet());
app.use(cors());
// app.use(bodyParser.json());
// app.use(express.raw());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/files", fileRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);


app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on Port ${PORT}`
  )
);
