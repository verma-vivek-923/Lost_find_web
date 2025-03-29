import express from "express";
import { createItem, getItems } from "../controllers/itemController.js";
const router = express.Router();

router.post("/create",createItem);
router.get("/get-items",getItems);

export default router;
