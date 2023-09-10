import CardInfo from "../Models/CardInfo.js";

export const create = async (req, res) => {
  try {
    const { Weight, Douche, Food, Oil, TeethBrushing } = req.body;
    if (!Weight && !Douche && !Food && !Oil && !TeethBrushing) {
      return res.status(400).json({ Message: "Input Error" });
    }
    let Card = await CardInfo.create({
      Weight,
      Douche,
      Food,
      Oil,
      TeethBrushing,
      Date: new Date(),
    });
    return res.status(201).json(Card._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
};
export const getCards = async (req, res) => {
  try {
    let cards = await CardInfo.find();
    if (!cards) {
      return res.status(400).json({ Message: "invalid input" });
    }
    return res.status(200).json({ cards });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
};
export const deleteCard = async (req, res) => {
  try {
    await CardInfo.findByIdAndDelete(req.params.cardId);
    return res.status(200).json({ Message: "Delete Successfull!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Server Error" });
  }
};
export const getcardwithId = async (req, res) => {
  const cardId = req.params.cardId;
  let card = await CardInfo.findById(cardId);
  return res.status(200).json({ card });
};
