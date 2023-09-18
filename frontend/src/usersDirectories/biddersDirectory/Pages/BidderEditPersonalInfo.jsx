import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEditBidderInformationsMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setBidderCredentials } from "../../../../Slices/authSlice";
import app from "../../../firebase";
const BidderEditPersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editBidderInformations, { isLoading }] =
    useEditBidderInformationsMutation();
  const [prevImg, setPrevImg] = useState(null);
  const bidder = useSelector((state) => state.bidderData.bidderInfo);
  const [launchUpload, setLaunchUpload] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [img, setImg] = useState(bidder?.ProfilePicture);
  const [form, setForm] = useState({
    Name: null,
    Surname: null,
    Email: null,
    ProfilePicture: null,
    State: null,
    City: null,
    FullAdress: null,
    PhoneNumber: null,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [profilePicturePrec, setProfilePicturePrec] = useState(0);
  const [updatedImg, setUpdatedimg] = useState(null);
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.trim() || null,
    });
  };
  const uploadProfilePicture = (file, fileType) => {
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
        fileType === setProfilePicturePrec(Math.round(progress));
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
          form.ProfilePicture = downloadURL.toString();
          setProfilePictureUrl(downloadURL.toString());
          setUpdatedimg(prevImg);
        });
      }
    );
  };
  const HandleProfilePictureChange = (e) => {
    e.preventDefault();
    const filePicker = document.createElement("input");
    filePicker.type = "file";
    filePicker.accept = "image/*";
    filePicker.onchange = () => {
      const file = filePicker.files[0];
      setPrevImg(profilePicture);
      setProfilePicture(file);
      const imagePath = window.webkitURL.createObjectURL(file);
      setImg(imagePath);
    };
    filePicker.click();
  };
  const handleImageUpload = (e) => {
    if (!profilePicture) {
      e.preventDefault();
      handleFormSubmit();
    } else if (profilePicture?.name == updatedImg?.name) {
      console.log("hello");
      e.preventDefault();
      handleFormSubmit();
    } else if (form.ProfilePicture == bidder.ProfilePicture) {
      e.preventDefault();
      handleFormSubmit();
    } else {
      e.preventDefault();
      uploadProfilePicture(profilePicture, "imgUrl");
    }
  };
  const handleFormSubmit = async (e) => {
    try {
      setUpdatedimg(profilePicture);
      setErrMessage("");
      const res = await editBidderInformations(form);
      console.log(res);
      if (res?.data?.Message) {
        setErrMessage(res?.data?.Message);
      }
      if (res?.data?.bidder) {
        dispatch(setBidderCredentials(res.data.bidder));
        navigate("/bidder/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (launchUpload === true) {
      handleFormSubmit();
    } else if (form.ProfilePicture) {
      handleFormSubmit();
    }
  }, [profilePictureUrl, launchUpload]);
  useEffect(() => {}, [
    prevImg,
    profilePicture,
    updatedImg,
    handleImageUpload,
    handleFormSubmit,
  ]);
  return (
    <>
      <form
        onSubmit={handleImageUpload}
        style={{
          width: "500px",
          margin: "auto",
          border: "1px solid black",
          padding: "20px",
          marginTop: "60px",
        }}
      >
        <br />
        <img
          src={img}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            display: "block",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={HandleProfilePictureChange}
        />
        {profilePicturePrec > 0 && "Uploading: " + profilePicturePrec + "%"}
        <br />
        <h3>{errMessage}</h3>
        <br />
        Name :{" "}
        <input
          type="text"
          name="Name"
          placeholder={bidder.Name}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        Surname :{" "}
        <input
          type="text"
          name="Surname"
          placeholder={bidder.Surname}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        Email :
        <input
          type="email"
          name="Email"
          placeholder={bidder.Email}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        State :{" "}
        <input
          type="text"
          name="State"
          placeholder={bidder.State}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        City :{" "}
        <input
          type="text"
          placeholder={bidder.City}
          name="City"
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        FullAdress :{" "}
        <textarea
          type="text"
          name="FullLocation"
          placeholder={bidder.FullLocation}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        PhoneNumber :{" "}
        <input
          type="number"
          name="PhoneNumber"
          placeholder={bidder.PhoneNumber}
          onChange={(e) => handleFormChange(e)}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <button type="submit" style={{ width: "100%" }}>
          Edit Profile
        </button>
      </form>
    </>
  );
};
export default BidderEditPersonalInfo;
