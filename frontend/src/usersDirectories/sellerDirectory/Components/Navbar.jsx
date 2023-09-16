import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sellerLogout } from "../../../../Slices/authSlice";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io("http://localhost:5000/seller");
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  useEffect;
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/seller/" style={styles.navbarLink}>
            home
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/seller/myauctions" style={styles.navbarLink}>
            My Auctions
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/seller/orders" style={styles.navbarLink}>
            Orders
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/seller/create" style={styles.navbarLink}>
            Create
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/seller/profile" style={styles.navbarLink}>
            Profile
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <button
            onClick={() => {
              navigate("/index/"),
                dispatch(
                  sellerLogout(),
                  socket.emit("sellerLoggedOut", sellerInfo._id)
                );
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
  },
  navbarList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navbarItem: {
    marginRight: "10px",
  },
  navbarLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    padding: "5px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default Navbar;
