import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bidderLogout } from "../../../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/bidder/" style={styles.navbarLink}>
            home
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/bidder/profile" style={styles.navbarLink}>
            profile
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
