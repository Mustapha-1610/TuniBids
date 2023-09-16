import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSellersignupMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
const SellerSignup = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [sellerSignup, { isLoading }] = useSellersignupMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    BusinessName: null,
    Email: null,
    Password: null,
    State: null,
    City: null,
    FullLocation: null,
    PhoneNumber: null,
    TaxRegistrationCertificate: null,
    BusinessLicense: null,
    BusinessLogo: null,
  });
  const [imgPerc, setImgPerc] = useState(0);
  const [taximgPrec, setTaxImgPrec] = useState(0);
  const [bisLogoPrec, setBisLogoPrec] = useState(0);
  const [taxRegistrationImg, setTaxImg] = useState(null);
  const [businessLicenseImg, setBusinessLicenseImg] = useState(null);
  const [bisLogo, setBisLogo] = useState(null);
  const [businessLogoUrl, setBusinessLogoUrl] = useState(null);
  const [businessLicenseUrl, setBusinessLicenseUrl] = useState(null);
  const [taxRegistrationUrl, setTaxRegistrationUrl] = useState(null);
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    try {
      const res = await sellerSignup(form);
      console.log(res);
      if (res?.data?.Message) {
        const timer = setTimeout(() => {
          setErrorMessage(res?.data?.Message);
        }, 1500);
      }
      console.log(res?.data?.Message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!taxRegistrationImg || !businessLicenseImg || !bisLogo) {
      console.log(bisLogo);
      setErrorMessage("Upload Required License's");
    } else {
      uploadTaxRegistrationCertificate(taxRegistrationImg, "imgUrl");
      uploadBusinessLicense(businessLicenseImg, "imgUrl");
      uploadBusinessLogo(bisLogo, "imgUrl");
    }
  };
  const uploadTaxRegistrationCertificate = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "images/sellerImages";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === setTaxImgPrec(Math.round(progress));
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
          form.TaxRegistrationCertificate = downloadURL.toString();
          setTaxRegistrationUrl(downloadURL.toString());
        });
      }
    );
  };
  const uploadBusinessLicense = (file, fileType) => {
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
          form.BusinessLicense = downloadURL.toString();
          setBusinessLicenseUrl(downloadURL.toString());
        });
      }
    );
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
        });
      }
    );
  };
  const businessImgChange = (e) => {
    e.preventDefault();
    setBusinessLicenseImg(e.target.files[0]);
  };
  const taxRegImgChange = (e) => {
    e.preventDefault();
    setTaxImg(e.target.files[0]);
  };
  const businessLogoChange = (e) => {
    e.preventDefault();
    setBisLogo(e.target.files[0]);
  };
  useEffect(() => {
    if (
      form.BusinessLicense &&
      form.TaxRegistrationCertificate &&
      form.BusinessLogo
    ) {
      handleFormSubmit();
    }
  }, [businessLicenseUrl, taxRegistrationUrl, businessLogoUrl]);

  return (
    <>
      <h1>Create Seller Account</h1>
      <h3>{errorMessage}</h3>
      <form onSubmit={handleImageUpload}>
        <br />
        <div>
          <label htmlFor="img">Business Logo :</label>{" "}
          {bisLogoPrec > 0 && "Uploading: " + bisLogoPrec + "%"}
          <br />
          <input type="file" accept="image/*" onChange={businessLogoChange} />
        </div>
        <br />
        BusinessName :{" "}
        <input
          type="text"
          name="BusinessName"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        Email :
        <input
          type="email"
          name="Email"
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
        State :{" "}
        <input type="text" name="State" onChange={(e) => handleFormChange(e)} />
        <br />
        City :{" "}
        <input type="text" name="City" onChange={(e) => handleFormChange(e)} />
        <br />
        FullLocation :{" "}
        <textarea
          type="text"
          name="FullLocation"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        PhoneNumber :{" "}
        <input
          type="number"
          name="PhoneNumber"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <div>
          <label htmlFor="img">Business License :</label>{" "}
          {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
          <br />
          <input type="file" accept="image/*" onChange={businessImgChange} />
        </div>
        <br />
        <div>
          <label htmlFor="img">Tax Registration License :</label>{" "}
          {taximgPrec > 0 && "Uploading: " + taximgPrec + "%"}
          <br />
          <input type="file" accept="image/*" onChange={taxRegImgChange} />
        </div>
        <br />
        <button type="submit">Signup</button>
      </form>
      <h5>
        Allready Have An Account ?{" "}
        <button onClick={() => navigate("/index/seller/login")}>Login</button>
      </h5>
    </>
  );
};
export default SellerSignup;
