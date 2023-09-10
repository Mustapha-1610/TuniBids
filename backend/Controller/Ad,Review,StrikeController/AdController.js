import Ad from "../../Models/Ad,Review,Strike Entities/Ad";

//
export const createAd = async (req, res) => {
  try {
    const { AdPrice, AdImage, AdDescription } = req.body;
    let newAd = new Ad({
      AdHolder: req.params.SellerId,
      AdPrice,
      AdImage,
      AdDescription,
    });
    if (!newAd) {
      return res.status(401).json({ Message: "Input or DataBase Error !" });
    }
    newAd = await newAd.save();
    return res.status(201).json({ Message: "Ad created successfully !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};
