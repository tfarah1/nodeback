import express from "express";
const router = express.Router();
import controller from "../controllers/brand.js";
import authorization from "../middelware/authorization.js";
import admin from "../middelware/authorization.js";

router.get("/all", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", authorization, admin, controller.post);
router.put("/:id", authorization, admin, controller.put);
router.delete("/:id", authorization, admin, controller.remove);

export default router;
