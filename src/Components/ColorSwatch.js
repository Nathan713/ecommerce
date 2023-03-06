import React, { useState, useEffect } from "react";
import "./ColorSwatch.css";

export default function ColorSwatch({ onSelectColor, assets }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // console.log(assets);
    extractColors();
  }, []);

  const extractColors = () => {
    let arr = [];
    for (let i = 0; i < assets.length; i++) {
      let str = assets[i].description;
      let firstWord = str.split(" ")[0];
      arr.push({ id: i, color: firstWord });
      //   console.log(assets[i].description);
    }
    setColors(arr);
    console.log(arr);
  };

  return (
    <div className="color-container">
      {colors.map((color) => (
        <div
          onClick={() => onSelectColor(color.id)}
          className="circle"
          style={{ backgroundColor: color.color }}
          key={color.id}
        ></div>
      ))}
    </div>
  );
}
