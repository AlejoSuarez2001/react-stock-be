import { Router } from "express";
import {
  createFollow,
  deleteFollow,
} from "../Controllers/follows.controller.js";

const router = Router();

router.post("/follow", createFollow);
router.post("/unfollow", deleteFollow);

export default router;
