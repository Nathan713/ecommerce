import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "../fonts/Lato/Lato-Thin.ttf";
import commerce from "../lib/commerce";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import { retrieveCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [text, setText] = useState("Menu");
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const onCartClick = () => {
    console.log("cart");
    navigate("/cart");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchEnter = () => {
    // dispatch(getProducts({ searchBy: 2, query: searchTerm, slugs: [] }));
    const savedSearch = searchTerm;
    setSearchTerm("");
    setSearchOn(false);
    navigate(`/search/${savedSearch}`);
  };
  const logoClick = () => {
    navigate("/");
  };
  const handleCategoryClick = (categoryName) => {
    // let arr = [];
    // arr.push(categoryName);
    // dispatch(getProducts({ searchBy: 3, query: searchTerm, slugs: arr }));
    // navigate("/", { state: { skipEffect: true } });
    navigate(`/category/${categoryName}`);
  };

  const handleTextChange = () => {
    setText(text === "Menu" ? "Close" : "Menu");
  };

  useEffect(() => {
    fetchCategories();
    dispatch(retrieveCart());
  }, []);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      setIsVisible(true);
      console.log(window.scrollY);

      if (window.scrollY >= 500 && !searchOn && !dropdown) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 2000); // adjust this value to set the duration of inactivity required to show the navbar again
      }
      if (window.scrollY < 500) {
        clearTimeout(timeoutId);
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchOn, dropdown]);

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
      // console.log(category.data);
      // console.log(categories);
    });
  };
  return (
    <>
      <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
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
              className=" flex-item font-face-Lato-Bold"
              key={text}
              initial={{ opacity: 0, rotateX: -180 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ opacity: 0, rotateX: 0 }}
            >
              <p>{text}</p>
            </motion.div>
          </div>
          <div
            className="flex-item font-face-Lato-Bold"
            onClick={() => {
              setSearchOn(!searchOn);
            }}
          >
            <SearchIcon fontSize="large"></SearchIcon>
            <p>Search</p>
          </div>
          <h1 onClick={() => logoClick()} className="logo font-face-Lato-Thin">
            My Store
          </h1>
          <div className="flex-item disappearing-link font-face-Lato-Bold">
            <p>Wishlist</p>
          </div>
          <div className="flex-item disappearing-link font-face-Lato-Bold">
            <p>Sign In</p>
          </div>
          <div
            className="flex-item font-face-Lato-Bold cart"
            onClick={() => onCartClick()}
          >
            <ShoppingBagIcon fontSize="large"></ShoppingBagIcon>
            <p>Cart</p>
            <span className="cart-items">{totalQuantity}</span>
          </div>
        </div>
      </nav>
      {/* start of menu dropdown */}

      <motion.div
        ref={dropdownRef}
        className="dropdown-container"
        animate={{ x: dropdown ? 0 : -500 }}
      >
        <div className="drop-down-list">
          {dropdown &&
            categories.map((category) => (
              <div
                className="drop-down-item"
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </div>
            ))}
        </div>
      </motion.div>
      {/* start searchbar dropdown */}

      <motion.div
        style={{
          zIndex: 20,
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
        <div className="searchIcon" onClick={() => handleSearchEnter()}>
          <SearchIcon fontSize="large"></SearchIcon>
        </div>
        <div className="searchCloseIcon" onClick={() => setSearchOn(false)}>
          <CloseIcon fontSize="large"></CloseIcon>
        </div>
      </motion.div>
    </>
  );
}
