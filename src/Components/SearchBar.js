import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="searchbar-container">
      <motion.form
        className="searchbar"
        initial={{ y: "-100%" }}
        animate={{ y: showSearch ? "0%" : "-100%" }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSearch}
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </motion.form>

      <div className="nav">
        <div className="flex-container">
          <div className="logo flex-item">
            <h1>Logo</h1>
          </div>
          <div className="flex-item" onClick={handleToggleSearch}>
            <motion.div
              className="icons"
              animate={{ scale: showSearch ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fas fa-search"></i>
            </motion.div>
          </div>
          <div className="flex-item disappearing-link">
            <a href="#">Link</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
