import express from "express";

import signUp from "../controllers/user/signUp";
import logIn from "../controllers/user/logIn";
import resetPwd from "../controllers/user/resetPwd";
import deleteUser from "../controllers/user/deleteUser";
import postMood from "../controllers/mood/postMood";
import getMood from "../controllers/mood/getMood";
import putMood from "../controllers/mood/putMood";
import deleteMood from "../controllers/mood/deleteMood";
import getYearlyMoods from "../controllers/mood/getYearlyMoods";
import getMonthlyMoods from "../controllers/mood/getMonthlyMoods";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.put("/reset", resetPwd);

router.delete("/user", deleteUser);

router.post("/mood", postMood);

router.get("/mood", getMood);

router.put("/mood", putMood);

router.delete("/mood", deleteMood);

router.get("/moods/:year", getYearlyMoods);

router.get("/moods", getMonthlyMoods);

export default router;