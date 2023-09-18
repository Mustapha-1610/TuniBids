import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSellerWithIdMutation } from "../../../../Slices/usersApiSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAdminUnvalidateSellerMutation } from "../../../../Slices/usersApiSlice";
import { useAdmingValidateSellerMutation } from "../../../../Slices/usersApiSlice";
import { useAdminActuallyValidatingTheSellerAcccountMutation } from "../../../../Slices/usersApiSlice";
const SellerProfilePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [validate, { isValidatingLoading }] = useAdmingValidateSellerMutation();
  const [unvalidate, { isUnvalidatingLoading }] =
    useAdminUnvalidateSellerMutation();
  const [actuallyValidating, { isActuallyValidating }] =
    useAdminActuallyValidatingTheSellerAcccountMutation();
  const params = useParams();
  const validateSeller = async (e) => {
    e.preventDefault();
    try {
      const res = await validate({ sellerId: params.sellerId });
      console.log(res);
      handleClose2();
      navigate("/admin/sellers/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const unvalidateSeller = async () => {
    try {
      const res = await unvalidate({ sellerId: params.sellerId });
      console.log(res);
      handleClose();
      navigate("/admin/sellers/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const acutallyValidatingSeller = async () => {
    try {
      const res = await actuallyValidating({ sellerId: params.sellerId });
      handleClose3();
      navigate("/admin/sellers/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [getSeller, { isLoading }] = useGetSellerWithIdMutation();
  const getSelledWithId = async () => {
    const res = await getSeller({ sellerId: params.sellerId });
    console.log(res);
    setSellerInfo(res?.data?.seller);
  };
  useEffect(() => {
    if (params.sellerId) {
      getSelledWithId();
    }
  }, [params]);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5>Business License</h5>
        </Modal.Header>
        <Modal.Body>
          <img style={{ width: "770px" }} src={sellerInfo?.BusinessLicense} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5>Tax Registration License</h5>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{ width: "770px" }}
            src={sellerInfo?.TaxRegistrationCertificate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div
      style={{
        width: "150%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        maxWidth: "900px",
        marginTop: "20px",
      }}
    >
      <img
        src={sellerInfo?.BusinessLogo}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          display: "block",
          margin: "auto",
        }}
      />
      <br />
      <h2 style={{ color: "#444", marginBottom: "20px" }}>
        {sellerInfo?.BusinessName}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>Email : </strong>
          {sellerInfo?.Email}
        </p>
        <p style={{ width: "50%" }}>
          <strong>Phone Number : </strong>
          {sellerInfo?.PhoneNumber}
        </p>
      </div>
      <p style={{ width: "50%" }}>
        <strong>Earnings : </strong>
        {sellerInfo?.Earnings} $
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>City : </strong>
          {sellerInfo?.City}
        </p>
        <p style={{ width: "50%" }}>
          <strong>State : </strong>
          {sellerInfo?.State}
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}></div>
      <p style={{ width: "50%" }}>
        <strong>Full Location : </strong>
        {sellerInfo?.FullLocation}
      </p>
      <div />
      <p style={{ width: "50%" }}>
        <strong>Rating :</strong> {sellerInfo?.Rating}
      </p>
      <div>
        Business License :<br></br> <br />
        <img
          onClick={() => setModalShow(true)}
          src={sellerInfo?.BusinessLicense}
          style={{
            width: "500px",
            height: "400px",
            borderRadius: "0%",
            display: "block",
            margin: "auto",
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <div>
        Business Tax Registration Certificate :<br></br>
        <br />
        <img
          onClick={() => setModalShow2(true)}
          src={sellerInfo?.TaxRegistrationCertificate}
          style={{
            width: "500px",
            height: "400px",
            borderRadius: "0%",
            display: "block",
            margin: "auto",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {sellerInfo?.ValidationStatus === false ? (
          <>
            <button
              onClick={handleShow3}
              style={{
                backgroundColor: "#00A36C",
                color: "#fff",
                cursor: "pointer",
                marginTop: "50px",
              }}
            >
              Validate Account
            </button>
          </>
        ) : (
          <>
            {sellerInfo?.ActiveStatus === false ? (
              <>
                <button
                  onClick={handleShow2}
                  style={{
                    backgroundColor: "#00A36C",
                    color: "#fff",
                    cursor: "pointer",
                    marginTop: "50px",
                  }}
                >
                  Unlock Account
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleShow}
                  style={{
                    backgroundColor: "#00A36C",
                    color: "#fff",
                    cursor: "pointer",
                    marginTop: "50px",
                  }}
                >
                  Disable Account
                </button>
              </>
            )}
          </>
        )}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Disabling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do You Approve The Disabling Of {sellerInfo?.BusinessName} Seller
          Account ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={unvalidateSeller}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Unlocking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do You Approve The Unlocking Of {sellerInfo?.BusinessName} Seller
          Account ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={validateSeller}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Validation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do You Approve The Validation Of {sellerInfo?.BusinessName} Seller
          Account ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={acutallyValidatingSeller}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SellerProfilePage;
