import Product from "../../Models/AuctionEntities/Product";
import Seller from "../../Models/UserEntities/Seller";

export const createProduct = async (req, res) => {
  try {
    const {
      ProductDescription,
      ProductOwner,
      MagasinPrice,
      ReservePrcice,
      ProductImage,
      Quantity,
    } = req.body;
    let newproduct = new Product({
      ProductDescription,
      ProductOwner,
      MagasinPrice,
      ReservePrcice,
      ProductImage,
      Quantity,
    });
    await Product.save();
    return res.status(201).json({ Message: "Order Created !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error Try Agaian Later !" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const ProductId = req.params.ProductId;
    let Product = await Product.findById(ProductId);
    if (!Product) {
      return res
        .status(500)
        .json({ Message: "Server Error Try Agaian Later !" });
    }
    return res.status(200).json({ Product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error Try Agaian Later !" });
  }
};

export const Product_Seller = async (req, res) => {
  try {
    const SellerId = req.params.SellerId;
    let exisitngProducts = await Product.find({ ProductOwner: SellerId });
    if (!exisitngProducts) {
      return res.status(200).json({ Message: "No Products Created Yet" });
    }
    return res.status(200).json({ exisitngProducts });
    return;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error Try Agaian Later !" });
  }
};
