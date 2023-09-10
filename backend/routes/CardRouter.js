import expreess from "express";
import * as CardController from "../Controller/CardController.js";
const CardRouter = expreess.Router();

CardRouter.post("/create", CardController.create);
CardRouter.get("/getCards", CardController.getCards);
CardRouter.delete("/delete/:cardId", CardController.deleteCard);
CardRouter.get("/:cardId", CardController.getcardwithId);

export default CardRouter;
