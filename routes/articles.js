import express from "express";

import {
  getArticles,
  createArticle,
  getArticle,
  deleteArticle,
  publishArticle,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/", getArticles);

router.post("/", createArticle);

router.get("/:id", getArticle);

router.delete("/:id", deleteArticle);

router.patch("/:id", publishArticle);

export default router;
