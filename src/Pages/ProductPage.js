import React, { useState } from "react";
import "./ProductPage.css";
import Navbar from "../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductPage() {
  const [visible, setVisible] = useState(false);
  const [assets, setAssets] = useState([]);
  const handleBoxToggle = () => {
    setVisible(true);
  };
  const handleBoxTog = () => {
    setVisible(false);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container2">
        <div className="left">
          <Carousel
            emulateTouch={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            className="carousel"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev &&
              visible && (
                <button
                  className="arrow-left"
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                >
                  <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext &&
              visible && (
                <button
                  className="arrow-right"
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                >
                  <ArrowForwardIosIcon fontSize="large"></ArrowForwardIosIcon>
                </button>
              )
            }
          >
            {assets.map((asset) => (
              <div className="carousel-img" key={asset.id}>
                <img alt="bagss" src={asset.url} className="image" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}
