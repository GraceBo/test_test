import express from "express";
import mongoose from "mongoose";

import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.js";
import articlesRoutes from "./routes/articles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(
  "mongodb+srv://akmal:@km@l123@cluster0.gqckr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use("/users", usersRoutes);
app.use("/articles", articlesRoutes);

app.get("/", (req, res) => res.render("pages/home"));

app.get("/create-post", (req, res) => res.render("pages/article"));

app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
