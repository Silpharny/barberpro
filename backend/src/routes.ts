import { Router } from "express"

import { AuthUserController } from "./controllers/user/AuthUserController"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"
import { UpdateUserController } from "./controllers/user/UpdateUserController"

import { isAuthenticated } from "./middlewares/isAuthenticated"

import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController"
import { CountHaircutController } from "./controllers/haircut/CountHaircoutController"
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController"
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController"
import { ListHaircutController } from "./controllers/haircut/ListHaircutController"
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController"

import { FinishScheduleController } from "./controllers/schedule/FinishScheduleService"
import { ListScheduleController } from "./controllers/schedule/ListScheduleController"
import { NewScheduleController } from "./controllers/schedule/NewScheduleController"

const router = Router()

// User router
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)
router.put("/users", isAuthenticated, new UpdateUserController().handle)

// Haircut router
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle)
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle)
router.put("/haircut/", isAuthenticated, new UpdateHaircutController().handle)
router.get(
  "/haircuts/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
)
router.get(
  "/haircut/count",
  isAuthenticated,
  new CountHaircutController().handle
)
router.get(
  "/haircut/detail",
  isAuthenticated,
  new DetailHaircutController().handle
)

// Schedule router
router.post("/schedule", isAuthenticated, new NewScheduleController().handle)
router.get("/schedule", isAuthenticated, new ListScheduleController().handle)
router.delete(
  "/schedule",
  isAuthenticated,
  new FinishScheduleController().handle
)

export { router }
