import express from "express";
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";
import { verifyToken, verifyRole } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/admin", verifyToken, verifyRole, getUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;