import express from "express";
const router = express.Router();
import controller from "../controllers/product.js";
import authorization from "../middelware/authorization.js";
import admin from "../middelware/authorization.js";
import upload from "../middelware/multer.js";

router.get("/all", controller.getAvailable);
router.get("/", controller.getHidden);
router.get("/:id", controller.getById);
router.get("/av/:id", controller.getAvailableById);
router.put("/:id", authorization, admin, controller.put);
router.put("/soft/:id", authorization, admin, controller.softDelete);
router.delete("/:id", authorization, admin, controller.deleteProduct);
router.post("/", authorization, admin, 
// upload.single("image"), 
controller.post);

export default router;
