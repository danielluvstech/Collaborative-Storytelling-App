import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { refreshAccessToken } from "../controllers/token.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

export default router;
