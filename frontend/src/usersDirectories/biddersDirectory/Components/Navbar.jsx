import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bidderLogout } from "../../../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect;
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/bidder/" style={styles.navbarLink}>
            Home
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/bidder/ongoingauctions" style={styles.navbarLink}>
            Ongoing
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/bidder/completedauctions" style={styles.navbarLink}>
            Completed
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/bidder/howitworks" style={styles.navbarLink}>
            How it Works
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/bidder/profile" style={styles.navbarLink}>
            Profile
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <button
            onClick={() => {
              dispatch(bidderLogout()), navigate("/index/");
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
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 0",
  },
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "auto",
    margin: "0 auto",
    padding: "0 20px",
  },
  navbarLogo: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  },
  navbarList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  navbarItem: {
    marginLeft: "20px",
  },
  navbarLink: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  mobileMenu: {
    display: "block",
  },
  desktopMenu: {
    display: "flex",
  },
  mobileMenuToggle: {
    display: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default Navbar;
