import React, { useEffect, useState } from "react";
import { useSellerCreateAuctionListingMutation } from "../../../../Slices/usersApiSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase.js";
import { useDispatch } from "react-redux";
import { setSellerCredentials } from "../../../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
const SellerCreateAuctionPage = () => {
  const [form, setForm] = useState({
    Title: null,
    ProductDescription: null,
    ParticipationFee: null,
    DataStartAuction: null,
    MagasinPrice: null,
    ReservePrice: null,
    Quantity: null,
    MinParticipatedUsers: null,
    ProductImage: null,
  });
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [MinParticipatedUsers, setMinParticipatedUsers] = useState("0");
  const [errorMessage, setErrorMessage] = useState(null);
  const [create, { isLoading }] = useSellerCreateAuctionListingMutation();
  const CreateAuctionListing = async (e) => {
    try {
      form.MinParticipatedUsers = MinParticipatedUsers;

      const res = await create(form);
      console.log(form);
      if (res?.error?.data?.Message) {
        setErrorMessage(res.error.data.Message);
      }
      if (res?.data?.seller) {
        dispatch(setSellerCredentials({ ...res.data.seller }));
        const timeoutId = setTimeout(() => {
          navigate("/seller/myauctions"); // Replace "/another-page" with your desired URL
        }, 2700);
      }
    } catch (err) {
      console.log("hello");
      console.log(err);
    }
  };
  useEffect(() => {
    if (form.ProductImage) {
      CreateAuctionListing();
      setErrorMessage(form.Title + " Auction Listing Created Successfully !");
    }
  }, [form.ProductImage]);
  useEffect(() => {
    if (form.ReservePrice && form.ParticipationFee) {
      const minParticipatedUsers = Math.ceil(
        form.ReservePrice / form.ParticipationFee
      );
      setMinParticipatedUsers(minParticipatedUsers);
    }
  }, [form.ReservePrice, form.ParticipationFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      {
        if (!img) {
          setErrorMessage(
            "Select a Picture For The Product Before Submitting !"
          );
        } else {
          setErrorMessage(null);
          uploadFile(img, "imgurl");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };
  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "images/sellerImages";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log(error);
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL - ", downloadURL);
          form.ProductImage = downloadURL.toString();
          setInputs((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };
  const formStyle = {
    width: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    textAlign: "center",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    width: "80%",
    padding: "9px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "15 px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  };
  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: "#007bff" }}>Create Auction</h2>
        <label style={labelStyle}>{errorMessage}</label>
        <br />
        <label style={labelStyle}>Title : </label>
        <input
          type="text"
          name="Title"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />
        <label style={labelStyle}> ProductDescription : </label>
        <input
          type="text"
          name="ProductDescription"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />

        <label style={labelStyle}> ParticipationFee : </label>
        <input
          type="number"
          name="ParticipationFee"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />
        <label style={labelStyle}> DataStartAuction : </label>
        <input
          type="date"
          name="DataStartAuction"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />
        <label style={labelStyle}> MagasinPrice : </label>
        <input
          type="number"
          name="MagasinPrice"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />
        <label style={labelStyle}> ReservePrice : </label>
        <input
          type="number"
          name="ReservePrice"
          style={inputStyle}
          onChange={(e) => handleFormChange(e)}
        />
        <label style={labelStyle}>
          MinParticipated Users = {MinParticipatedUsers}{" "}
        </label>
        <label style={labelStyle}> Quantity : </label>
        <input
          type="number"
          style={inputStyle}
          name="Quantity"
          onChange={(e) => handleFormChange(e)}
        />
        <div>
          <label htmlFor="img" style={labelStyle}>
            Product Image :{" "}
          </label>
          {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={handleImageChange}
          />
        </div>

        <button style={buttonStyle} type="submit">
          Create
        </button>
      </form>
    </>
  );
};
export default SellerCreateAuctionPage;
