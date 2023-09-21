import AuctionRoom from "../../Models/AuctionEntities/AuctionRoom.js";
import AuctionListing from "../../Models/AuctionEntities/AuctionListing.js";
import Seller from "../../Models/UserEntities/Seller.js";
import Bidder from "../../Models/UserEntities/Bidder.js";

export const startRoom = async (req, res) => {
  try {
    const auctionListingId = req.body.auctionId;
    let auction = await AuctionListing.findById(auctionListingId);
    let newRoom = await AuctionRoom.create({
      AuctionListing: auctionListingId,
    });
    auction.RoomId = newRoom._id;
    auction.ParticipatedBidders.map(async (item) => {
      let bidder = await Bidder.findById(item);
      const notification = {
        NotificationMessage: `${auction.Title} Auction Started`,
        RoomId: newRoom._id,
      };
      bidder.Notifications.push(notification);
      await bidder.save();
    });
    await auction.save();
    return res.json({
      roomId: newRoom._id,
      bidders: auction.ParticipatedBidders,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRoomInfo = async (req, res) => {
  try {
    const roomId = req.body.auctionRoomid;
    if (roomId == "null") {
      return res.json({ Message: "Auction Room Non Existant" });
    }
    const room = await AuctionRoom.findById(roomId);
    if (room.OngoingStatus === false) {
      return res.json({ Message: "Auction Is Over !" });
    }
    const auction = await AuctionListing.findById(room.AuctionListing);
    return res.json({ roomInfo: room, Auction: auction });
  } catch (err) {
    console.log(err);
  }
};

export const bidderJoined = async (req, res) => {
  try {
    const room = await AuctionRoom.findById(req.body.auctionRoomId);
    room.Participants = room.Participants + 1;
    await room.save();
    return res.json({ Participants: room.Participants });
  } catch (err) {
    console.log(err);
  }
};

export const bidderLeft = async (req, res) => {
  try {
    const room = await AuctionRoom.findById(req.body.auctionRoomId);
    room.Participants = room.Participants - 1;
    await room.save();
    return res.json({ Participants: room.Participants });
  } catch (err) {
    console.log(err);
  }
};

export const endRoom = async (req, res) => {
  try {
    const roomId = req.body.roomId;
    const room = await AuctionRoom.findById(roomId);
    const auction = await AuctionListing.findById(room.AuctionListing);
    auction.Winningprice = room.HighestBidder.HighestBid;
    auction.OngoinStatus = false;
    auction.AuctionWinner = room.HighestBidder.BidderId;
    auction.Date.Auctioncompletiondate = new Date();
    room.OngoingStatus = false;
    let seller = await Seller.findById(auction.SellerId);
    const updatedOngoingAuctions = seller.Listings.Ongoing.filter(
      (_id) => _id.toString() !== auction._id.toString()
    );
    seller.Listings.Finiched.push(auction._id);
    seller.Listings.Ongoing = updatedOngoingAuctions;
    room.OngoingStatus = false;
    await auction.save();
    await room.save();
    return res.json({
      Message:
        "Auction Is Over Congratulation To " +
        room.HighestBidder.BidderName +
        " For Winning The " +
        auction.Title +
        " Auction For " +
        room.HighestBidder.HighestBid +
        "$",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const roomId = req.body.roomId;
    const highestBid = req.body.highestBid;
    let bidder = req.bidder;
    let room = await AuctionRoom.findById(roomId);
    room.HighestBidder.HighestBid = highestBid;
    room.HighestBidder.BidderId = bidder._id;
    room.HighestBidder.BidderName = `${bidder.Name}  ${bidder.Surname}`;
    await room.save();
    return res.json({ Message: "Room Updated" });
  } catch (err) {
    console.log(err);
  }
};
