import express from "express";
const router = express.Router();
// import controller from '../controllers/category.js';
import {
  getAll,
  getById,
  post,
  put,
  deleteCategory,
} from "../controllers/category.js";
import authorization from "../middelware/authorization.js";
import admin from "../middelware/authorization.js";

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/", authorization, admin, post);
router.put("/:id", authorization, admin, put);
router.delete("/:id", authorization, admin, deleteCategory);

export default router;
