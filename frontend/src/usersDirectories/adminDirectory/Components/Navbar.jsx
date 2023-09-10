import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../../Slices/authSlice.js";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/admin" style={styles.navbarLink}>
            Dashboard
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/admin/bidders/dashboard" style={styles.navbarLink}>
            bidders
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/admin/sellers/dashboard" style={styles.navbarLink}>
            Sellers
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/admin/auctionlistings/dashboard" style={styles.navbarLink}>
            Auction Listings
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <button
            onClick={(e) => {
              clickHandler();
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
