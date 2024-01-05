import express from "express";
const router = express.Router();
import controller from "../controllers/file.js";
import upload from "../middelware/multer.js";

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteFile);
router.post("/", upload.single("file"), controller.post);
router.put("/:id",upload.single("file"), controller.updateFile);
// router.post('/photos', upload.array('photos', 2), controller.postArray );
  

export default router;
