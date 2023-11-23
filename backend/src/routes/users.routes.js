import { Router } from "express";
import { getUserControler } from "../controllers/users/getUser.controller.js";

const usersRoutes = Router();

usersRoutes.get("/", getUserControler);

export { usersRoutes };