import mongoose from "mongoose";

import { Article } from "../models/article.js";

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    // return res.send({
    //   success: true,
    //   articles,
    // });
    return res.render("pages/articles", {
      articles,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting articles" });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(401)
        .send({ success: false, message: "article title is required" });
    }
    const article = new Article({
      title,
      description,
    });
    const newArticle = await article.save();
    getArticles(req, res);
    // res.send({
    //   success: true,
    //   message: `article with the name ${newArticle.title} added to the database`,
    // });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "error in creating new article" });
  }
};

export const getArticle = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res
      .status(401)
      .send({ success: false, message: "valid article id is required" });
  }
  try {
    const article = await Article.findOne({ _id: id });
    if (article) {
      return res.render("pages/blog", {
        article,
      });
      // return res.send({
      //   success: true,
      //   article,
      // });
    }
    return res.send({
      success: false,
      message: "no article found with provided id",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting articles" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res
      .status(401)
      .send({ success: false, message: "valid article id is required" });
  }
  try {
    const article = await Article.findOneAndDelete({ _id: id });
    if (article) {
      return res.send({
        success: true,
        message: `article with the id ${article._id} deleted from database`,
      });
    }
    return res.send({
      success: false,
      message: "no article found with provided id",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting articles" });
  }
};

export const publishArticle = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res
      .status(401)
      .send({ success: false, message: "valid article id is required" });
  }
  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      { status: "published" },
      { new: true }
    );
    if (article) {
      return res.send({
        success: true,
        message: `article with the id ${article._id} published`,
      });
    }
    return res.send({
      success: false,
      message: "no article found with provided id",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting articles" });
  }
};

export const updateArticle = (req, res) => {
  const { id } = req.paramns;

  const { firstName, lastName, age } = req.body;

  const article = articles.find((article) => article.id == id);

  if (firstName) user.firstName = firstName;

  if (lastName) user.lastName = lastName;

  if (age) user.age = age;

  res.send(`Article with the id ${id} has been updated`);
};
