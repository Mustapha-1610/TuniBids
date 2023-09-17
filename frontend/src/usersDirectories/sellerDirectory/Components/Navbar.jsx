import React, { useEffect, useState } from "react";
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

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const closeMobileMenu = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener("resize", closeMobileMenu);
    return () => {
      window.removeEventListener("resize", closeMobileMenu);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <div className={`${isMobileMenuOpen ? "mobile-menu" : "desktop-menu"}`}>
          <ul style={styles.navbarList}>
            <li style={styles.navbarItem}>
              <Link to="/seller/" style={styles.navbarLink}>
                Home
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
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`} />
        </div>
      </div>
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
