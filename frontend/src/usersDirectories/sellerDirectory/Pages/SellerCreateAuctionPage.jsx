import React, { useEffect, useState } from "react";
import { useSellerCreateAuctionListingMutation } from "../../../../Slices/usersApiSlice";
const SellerCreateAuctionPage = () => {
  const [MinParticipatedUsers, setMinParticipatedUsers] = useState(null);
  const [create, { isLoading }] = useSellerCreateAuctionListingMutation();
  const [form, setForm] = useState({
    Title: null,
    ProductDescription: null,
    ParticipationFee: null,
    DataStartAuction: null,
    MagasinPrice: null,
    ReservePrice: null,
    Quantity: null,
    MinParticipatedUsers: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      form.MinParticipatedUsers = MinParticipatedUsers;
      const res = await create(form);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };
  return (
    <>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        Title :{" "}
        <input type="text" name="Title" onChange={(e) => handleFormChange(e)} />
        <br />
        ProductDescription :{" "}
        <input
          type="text"
          name="ProductDescription"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        ParticipationFee :{" "}
        <input
          type="number"
          name="ParticipationFee"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        DataStartAuction :{" "}
        <input
          type="date"
          name="DataStartAuction"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        MagasinPrice :{" "}
        <input
          type="number"
          name="MagasinPrice"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        ReservePrice :{" "}
        <input
          type="number"
          name="ReservePrice"
          onChange={(e) => handleFormChange(e)}
        />
        <h4>
          MinParticipated Users = {MinParticipatedUsers}{" "}
          <button
            type="button"
            onClick={(e) =>
              setMinParticipatedUsers(form.ReservePrice / form.ParticipationFee)
            }
          >
            Click
          </button>
        </h4>
        Quantity :{" "}
        <input
          type="number"
          name="Quantity"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        ProductImage :{" "}
        <input
          type="file"
          name="ProductImage"
          onChange={(e) => handleImageChange(e)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
};
export default SellerCreateAuctionPage;
