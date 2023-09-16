import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEditSellerMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setSellerCredentials } from "../../../../Slices/authSlice";
import app from "../../../firebase";
const SellerEditInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editSeller, { isLoading }] = useEditSellerMutation();
  const [prevImg, setPrevImg] = useState(null);
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const [launchUpload, setLaunchUpload] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [img, setImg] = useState(sellerInfo.BusinessLogo);
  const [form, setForm] = useState({
    BusinessName: null,
    Email: null,
    Password: null,
    State: null,
    City: null,
    FullLocation: null,
    PhoneNumber: null,
    BusinessLogo: null,
    ConfirmPassword: null,
  });
  const [bisLogo, setBisLogo] = useState(null);
  const [businessLogoUrl, setBusinessLogoUrl] = useState(null);
  const [bisLogoPrec, setBisLogoPrec] = useState(0);
  const [updatedImg, setUpdatedimg] = useState(null);
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.trim() || null,
    });
  };
  const uploadBusinessLogo = (file, fileType) => {
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
        fileType === setBisLogoPrec(Math.round(progress));
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
          form.BusinessLogo = downloadURL.toString();
          setBusinessLogoUrl(downloadURL.toString());
          setUpdatedimg(prevImg);
        });
      }
    );
  };
  const HandlebusinessLogoChange = (e) => {
    e.preventDefault();

    const filePicker = document.createElement("input");
    filePicker.type = "file";
    filePicker.accept = "image/*";
    filePicker.onchange = () => {
      const file = filePicker.files[0];
      setPrevImg(bisLogo);
      setBisLogo(file);
      const imagePath = window.webkitURL.createObjectURL(file);
      setImg(imagePath);
    };
    filePicker.click();
  };
  const handleImageUpload = (e) => {
    if (!bisLogo) {
      e.preventDefault();
      handleFormSubmit();
    } else if (bisLogo?.name == updatedImg?.name) {
      e.preventDefault();
      handleFormSubmit();
    } else if (form.BusinessLogo == sellerInfo.BusinessLogo) {
      e.preventDefault();
      handleFormSubmit();
    } else {
      e.preventDefault();
      uploadBusinessLogo(bisLogo, "imgUrl");
    }
  };
  const handleFormSubmit = async (e) => {
    try {
      setErrMessage("");
      const res = await editSeller(form);
      console.log(res);
      if (res?.data?.Message) {
        setErrMessage(res?.data?.Message);
      }
      if (res?.data?.seller) {
        dispatch(setSellerCredentials(res.data.seller));
        navigate("/seller/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (launchUpload === true) {
      handleFormSubmit();
    } else if (form.BusinessLogo) {
      handleFormSubmit();
    }
  }, [businessLogoUrl, launchUpload]);
  useEffect(() => {
    console.log(prevImg, bisLogo);
  }, [prevImg, bisLogo, updatedImg]);
  return (
    <>
      <form onSubmit={handleImageUpload}>
        <br />
        <img
          src={img}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            display: "block",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={HandlebusinessLogoChange}
        />
        {bisLogoPrec > 0 && "Uploading: " + bisLogoPrec + "%"}
        <br />
        <h3>{errMessage}</h3>
        <br />
        BusinessName :{" "}
        <input
          type="text"
          name="BusinessName"
          placeholder={sellerInfo.BusinessName}
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        Email :
        <input
          type="email"
          name="Email"
          placeholder={sellerInfo.Email}
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        Password :{" "}
        <input
          type="password"
          name="Password"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        ConfirmPassword :{" "}
        <input
          type="password"
          name="ConfirmPassword"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        State :{" "}
        <input
          type="text"
          name="State"
          placeholder={sellerInfo.State}
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        City :{" "}
        <input
          type="text"
          placeholder={sellerInfo.City}
          name="City"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        FullLocation :{" "}
        <textarea
          type="text"
          name="FullLocation"
          placeholder={sellerInfo.FullLocation}
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        PhoneNumber :{" "}
        <input
          type="number"
          name="PhoneNumber"
          placeholder={sellerInfo.PhoneNumber}
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <button type="submit">Edit Profile</button>
      </form>
    </>
  );
};
export default SellerEditInfoPage;
