import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/index" style={styles.navbarLink}>
            Home
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/index/onGoing" style={styles.navbarLink}>
            onGoing Auctions
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/index/finiched" style={styles.navbarLink}>
            Finiched Auctions
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/index/howItWorks" style={styles.navbarLink}>
            How It Works
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/index/login" style={styles.navbarLink}>
            Login
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/index/signup" style={styles.navbarLink}>
            Signup
          </Link>
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
