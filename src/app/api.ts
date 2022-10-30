import axios from "axios";
import { GameData } from "@/types/api-response";

export const getQuizes = () =>
  axios
    .get("/api/game/quizes")
    .then((result) => result.data)
    .catch((err) => err);

export const getQuizHistory = (userId: string) =>
  axios
    .get(`/api/game/history/${userId}`)
    .then((result) => result.data)
    .catch((err) => err);

export const getQuiz = (quizId: string): Promise<GameData> =>
  axios
    .get(`/api/game/${quizId}`)
    .then((result) => result.data)
    .catch((err) => err);

export const saveHistory = (
  startDate: Date,
  gameId: string,
  totalPoint: number,
  userId: string
) =>
  axios.post("/api/game/history", {
    startDate,
    gameId,
    totalPoint,
  });
