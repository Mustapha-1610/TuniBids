import Tokens from "../../Models/TokenEntities/Tokens";
import Bidder from "../../Models/UserEntities/Bidder";

// function to create a new token
export const CreateToken = async (req, res) => {
  const { Price, Value } = req.body;
  if (!Price && !Value) {
    return res.status(403).json({ Message: "Invalid Input" });
  }
  let newToken = await Tokens.findOne({ Value });
  if (newToken) {
    return res
      .status(200)
      .json({ Message: "Token of the same value allready exists" });
  }
  try {
    newToken = new Tokens({ Price, Value });
    newToken = await newToken.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
  return res.status(201).json({ newToken });
};

//  a function to edit a token value and price
export const EditToken = async (req, res) => {
  const { Price, Value } = req.body;
  const TokenId = req.params.TokenId;
  let exisitingToken = Tokens.findOne({ Value });
  if (exisitingToken) {
    return res
      .status(200)
      .json({ Message: "Token with the same value exists allready" });
  }
  let updatedToken;
  try {
    updatedToken = await Tokens.findById(TokenId);
    if (!updatedToken) {
      return res.status(500).json({ Message: "DataBase Error !" });
    }
    updatedToken.Price = Price;
    updatedToken.Value = Value;
    updatedToken = await updatedToken.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
  return res.status(201).json({ Message: "Token Updated !" });
};

// this function will not be finiched till further studies about deleting a token
export const DeleteToken = async (req, res) => {
  const TokenId = req.params.TokenId;
  let Token;
  try {
    Token = Tokens.findById(TokenId);
    if (!Token) {
      return res.status(503).json({ Message: "Database Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

// functions with buying and transactions will be not be worked on till further advancements into the project and discovering payments methods
