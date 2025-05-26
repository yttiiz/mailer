import { oak } from "@deps";
import { getMiddleware, postMiddleware } from "@services";

const { Router } = oak;

export const router = new Router();

router.get("/", getMiddleware);
router.post("/api/v1", postMiddleware);
