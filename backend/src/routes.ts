import { Router } from "express"

import { AuthUserController } from "./controllers/user/AuthUserController"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"
import { UpdateUserController } from "./controllers/user/UpdateUserController"

import { isAuthenticated } from "./middlewares/isAuthenticated"

import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController"

const router = Router()

// User router
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)
router.put("/users", isAuthenticated, new UpdateUserController().handle)

// Haircut router
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle)

export { router }
