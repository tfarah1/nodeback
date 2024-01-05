import express from "express";
const router = express.Router();
import controller from "../controllers/user.js";
import authorization from "../middelware/authorization.js";
import admin from "../middelware/authorization.js";
import superAdmin from "../middelware/authorization.js";

router.get("/all",
 authorization, admin, 
controller.getAll);
router.get("/getAllAdmins",
//  authorization, superAdmin,
  controller.getAllAdmins);
router.get("/me", 

// authorization, admin, 
controller.get);
router.get("/:id", 
// authorization, admin,

 controller.getById);
router.post("/", 
// admin,
 controller
.post);
router.delete("/:id", 
// authorization, admin,
 controller.deleteUser);
router.post("/addAdmin", 
// authorization, 
// superAdmin,
 controller.postAdmin);
router.delete("/deleteAdmin/:id", 
// authorization, superAdmin,
 controller.deleteAdmin);
router.post("/login", controller.login);

export default router;
