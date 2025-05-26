import { oak } from "@deps";
import {
  getMiddleware,
  postBookingMiddleware,
  postRegisterMiddleware,
} from "@services";

const { Router } = oak;

export const router = new Router();

router.get("/", getMiddleware);
router.post("/api/v1/register", postRegisterMiddleware);
router.post("/api/v1/booking", postBookingMiddleware);
