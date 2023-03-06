import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "../fonts/Lato/Lato-Thin.ttf";
import commerce from "../lib/commerce";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOn, setSearchOn] = useState(false);

  const [text, setText] = useState("Menu");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTextChange = () => {
    setText(text === "Menu" ? "Close" : "Menu");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.querySelector(".menu");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !container.contains(event.target)
      ) {
        setDropdown(false);
        setText("Menu");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const fetchCategories = () => {
    commerce.categories.list().then((category) => {
      setCategories(category.data);
      console.log(category.data);
      console.log(categories);
    });
  };
  return (
    <>
      <nav>
        <div className="flex-container">
          <div
            // ref={dropdownRef}
            className="flex-item font-face-Lato-Bold menu"
            onClick={() => {
              setDropdown(!dropdown);
              handleTextChange();
            }}
          >
            {text === "Menu" ? (
              <MenuIcon fontSize="large"></MenuIcon>
            ) : (
              <CloseIcon fontSize="large"></CloseIcon>
            )}

            <motion.div
              className="font-face-Lato-Bold"
              key={text}
              initial={{ opacity: 0, rotateX: -180 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ opacity: 0, rotateX: 0 }}
            >
              {text}
            </motion.div>
          </div>
          <div
            className="flex-item font-face-Lato-Bold"
            onClick={() => {
              setSearchOn(!searchOn);
            }}
          >
            <SearchIcon fontSize="large"></SearchIcon>
            Search
          </div>
          <h1 className="logo font-face-Lato-Thin">My Store</h1>
          <div className="flex-item disappearing-link font-face-Lato-Bold">
            Wishlist
          </div>
          <div className="flex-item disappearing-link font-face-Lato-Bold">
            Sign in
          </div>
          <div className="flex-item font-face-Lato-Bold">
            <ShoppingBagIcon fontSize="large"></ShoppingBagIcon>
            Cart
          </div>
        </div>
      </nav>
      {/* start of dropdown */}

      {/* start dropdown  */}
      <motion.div
        ref={dropdownRef}
        className="dropdown-container"
        animate={{ x: dropdown ? 0 : -500 }}
      >
        <div className="drop-down-list">
          {dropdown &&
            categories.map((category) => (
              <div className="drop-down-item" key={category.id}>
                {category.name}
              </div>
            ))}
        </div>
      </motion.div>
      {/* start searchbar dropdown */}

      <motion.div
        style={{
          zIndex: 1,
          transform: "translateZ(0)",
        }}
        className="searchbar-container"
        animate={{ y: searchOn ? [0, 0] : [-1000, -1000] }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <input
          className="searchbar"
          autoFocus={true}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <div className="searchCloseIcon" onClick={() => setSearchOn(false)}>
          <CloseIcon fontSize="large"></CloseIcon>
        </div>
      </motion.div>
    </>
  );
}
