import AuctionListing from "../../Models/AuctionEntities/AuctionListing.js";
import Bidder from "../../Models/UserEntities/Bidder.js";
import Order from "../../Models/AuctionEntities/Order.js";
import Seller from "../../Models/UserEntities/Seller.js";

//
export const CreateAuctionListing = async (req, res) => {
  try {
    const {
      Title,
      ProductDescription,
      ParticipationFee,
      DataStartAuction,
      MagasinPrice,
      ReservePrice,
      Quantity,
      MinParticipatedUsers,
      ProductImage,
    } = req.body;
    if (
      !Title ||
      !ProductDescription ||
      !ParticipationFee ||
      !DataStartAuction ||
      !MagasinPrice ||
      !ReservePrice ||
      !Quantity ||
      !MinParticipatedUsers ||
      !ProductImage
    ) {
      return res
        .status(400)
        .json({ Message: "One Or More Inputs Are Missing !" });
    }
    const currentDate = new Date();
    if (new Date(DataStartAuction) < currentDate) {
      return res
        .status(400)
        .json({ Message: "Invalid date. Dates cannot be in the past." });
    }
    let newAuctionListing;

    newAuctionListing = await AuctionListing.create({
      Title,
      ProductDescription,
      ParticipationFee,
      Date: {
        DataStartAuction,
      },

      Product: {
        ProductDescription,
        MagasinPrice,
        ReservePrice,
        Quantity,
        ProductImage,
      },
      AuctionHolder: req.seller._id,
      MinParticipatedUsers,
    });
    await newAuctionListing.save();
    let seller = req.seller;
    seller.Listings.Ongoing.push(newAuctionListing._id);
    seller.save();
    return res.status(200).json({ Message: "Listing Created", seller: seller });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
};

//

export const AuctionParticipation = async (req, res) => {
  let ParticipatingBidder, Auction;
  const BidderId = req.params.BidderId;
  const AuctionId = req.params.AuctionId;
  try {
    ParticipatingBidder = await Bidder.findById(BidderId);
    Auction = await AuctionListing.findById(AuctionId);
    if (!ParticipatingBidder && !Auction) {
      return res.status(403).json({ Message: "Invalid Input !" });
    }
    Auction.ParticipatedBidders.push(BidderId);
    ParticipatingBidder.ParticipatedAuction.OnGoing.push(AuctionId);
    ParticipatingBidder = await ParticipatingBidder.save();
    Auction = await Auction.save();
    return res.status(201).json({ Message: "Participation Registerd !" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ Message: "Error !" });
  }
};

//
export const AuctionUnparticipating = async (req, res) => {
  const BidderId = req.params.BidderId;
  const AuctionId = req.params.AuctionId;
  try {
    const bidder = await Bidder.findById(BidderId);
    const auction = await AuctionListing.findById(AuctionId);

    if (!bidder || !auction) {
      return res.status(404).json({ Message: "Bidder or auction not found." });
    }
    const updatedParticipatedAuction =
      bidder.ParticipatedAuction.OnGoing.filter(
        (auction) => auction.toString() !== AuctionId
      );
    bidder.ParticipatedAuction = updatedParticipatedAuction;
    const updatedParticipatedBidders = auction.ParticipatedBidders.filter(
      (bidder) => bidder.toString() !== BidderId
    );
    auction.ParticipatedBidders = updatedParticipatedBidders;
    await bidder.save();
    await auction.save();
    return res.status(200).json({ Message: "Unparticipation successful." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
};

//
export const getAllOngoingAuction = async (req, res) => {
  try {
    let AllAuctionListing = await AuctionListing.find({ OngoinStatus: true });
    if (AllAuctionListing.length == 0) {
      return res.json({ Message: "There Are Currently No Ongoing Auctions !" });
    }
    return res.json({ AllAuctionListing });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Issue !" });
  }
};

//
export const getAllEndedAuctions = async (req, res) => {
  try {
    let completedAuctions = await AuctionListing.find({
      OngoinStatus: false,
    });
    if (completedAuctions.length == 0) {
      return res.status(403).json({ Message: "No Inactive Auctions" });
    }
    return res.status(200).json({ completedAuctions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

//
export const DeleteAuction = async (req, res) => {
  let AuctionId = req.params.AuctionId;
  try {
    let Auction = await AuctionListing.findById(AuctionId);
    if (Auction.ParticipatedBidders.length == 0) {
      await AuctionListing.deleteOne(Auction);
      return res.status(204).json({ Message: "Delete Successfull !" });
    } else {
      let ParticipatingBidder;
      for (let i = 0; i < Auction.ParticipatedBidders.length; i++) {
        ParticipatingBidder = await Bidder.findById(
          Auction.ParticipatedBidders[i]
        );
        const updatedParticipatedAuction =
          ParticipatingBidder.ParticipatedAuction.OnGoing.filter(
            (auction) => auction.toString() !== AuctionId
          );
        ParticipatingBidder.ParticipatedAuction = updatedParticipatedAuction;
        ParticipatingBidder = ParticipatingBidder.save();
        // we should add a function to refund bidders money aswell
      }
    }
    await AuctionListing.deleteOne(Auction);
    return res.status(200).json({ Message: "Done" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

//
export const EditAuction = async (req, res) => {
  const { Title, Description, ParticipationFee, DateStartAuction, Ad } =
    req.body;
  const AuctionId = req.params.AuctionId;
  let Auction;
  try {
    Auction = await AuctionListing.findById(AuctionId);
    if (!Auction) {
      return res.status(403).json({ Message: "Auctionlisting Unexistant !" });
    }
    if (Title) {
      Auction.Title = Title;
    }
    if (Description) {
      Auction.Description = Description;
    }
    if (ParticipationFee) {
      Auction.ParticipationFee = ParticipationFee;
    }
    if (DateStartAuction) {
      const currentDate = new Date();
      if (new Date(DateStartAuction) < currentDate) {
        return res
          .status(400)
          .json({ Message: "Invalid date. Date cannot be in the past." });
      } else {
        Auction.DateStartAuction = new Date(DateStartAuction);
      }
    }
    if (Ad) {
      Auction.Ad = Ad;
    }
    Auction = await Auction.save();
    return res.status(201).json({ Auction });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

//
export const EndAuction = async (req, res) => {
  const BidderId = req.params.BidderId;
  const AuctionId = req.params.AuctionId;
  try {
    let Auction = await AuctionListing.findById(req.params.AuctionId);
    Auction.AuctionWinner = req.params.BidderId;
    Auction.OngoinStatus = false;
    const currentDate = new Date();
    Auction.DateFinichAuction = currentDate;
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 6));
    let newOrder = new Order({
      WinningBidder: req.params.BidderId,
      Product: Auction.Product,
      Date: {
        EstimiatedArrivalDate: futureDate,
      },
    });
    Auction = await Auction.save();
    newOrder = await newOrder.save();
    for (let i = 0; i < Auction.ParticipatedBidders.length; i++) {
      let participatingBidder = await Bidder.findById(
        Auction.ParticipatedBidders[i]
      );
      participatingBidder.ParticipatedAuction.OnGoing =
        participatingBidder.ParticipatedAuction.OnGoing.filter(
          (Auction) => Auction.toString() !== req.params.AuctionId
        );
      participatingBidder.ParticipatedAuction.Finiched.push(
        req.params.AuctionId
      );
      participatingBidder.Notifications.push(
        Auction.Title + " auction has ended at \n" + new Date()
      );
      if (Auction.ParticipatedBidders[i] === req.params.BidderId) {
        participatingBidder.WinningsOrders.push(newOrder._id);
        participatingBidder.Notifications.push(
          "You Won The " +
            Auction.Title +
            "\n Product Should Arrive at " +
            newOrder.Date.EstimiatedArrivalDate
        );
        participatingBidder.ParticipatedAuction.AuctionWon.push(
          req.params.AuctionId
        );
      }
      participatingBidder = await participatingBidder.save();
    }
    return res.status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

export const getLatestAuctions = async (req, res) => {
  try {
    const bidder = req.bidder;
    const auctions = await AuctionListing.find({ OngoinStatus: true })
      .sort({ _id: -1 }) // sort in descending order of creation
      .limit(5); // limit to the last 5 documents
    res.status(200).json(auctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAuction = async (req, res) => {
  try {
    const auctionId = req.body.auctionId;
    let bidder = req.bidder;
    let participating = false;
    let auction = await AuctionListing.findById(auctionId);
    if (!auction) {
      return res.json({ Message: "Error Try Again Later !" });
    } else {
      if (bidder.ParticipatedAuction.OnGoing.includes(auctionId)) {
        participating = true;
      }
      let seller = await Seller.findById(auction.AuctionHolder);
      return res.json({
        participating: participating,
        auction: auction,
        seller: seller,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
