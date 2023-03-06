import React from "react";
import "./Item.css";
import bagExtraSmall from "../media/images/bag-extra-small.jpg";
import bag from "../media/images/bag.jpg";
import bagLarge from "../media/images/bag.jpg";
import bagExtraLarge from "../media/images/bag-extra-large.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import commerce from "../lib/commerce";
import ColorSwatch from "./ColorSwatch";

export default function Item({ product }) {
  const [visible, setVisible] = useState(false);
  const [assets, setAssets] = useState([]);
  const [variantsdata, setVariantsData] = useState([]);

  const handleBoxToggle = () => {
    setVisible(true);
  };
  const handleBoxTog = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = () => {
    commerce.products
      .getVariants(product.id)
      .then((variants) => {
        setAssets(variants.data[0].assets);
        setVariantsData(variants.data);
        // console.log(variants.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the variants", error);
      });
  };

  function handleSelectColor(id) {
    setAssets(variantsdata[id].assets);
  }

  return (
    <article className="item-container">
      <div
        className="img-container"
        onMouseEnter={handleBoxToggle}
        onMouseLeave={handleBoxTog}
      >
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
      <div className="item-details-container">
        <div className="item-name">Luxury Bag</div>
        {assets.length > 0 && (
          <ColorSwatch
            onSelectColor={handleSelectColor}
            assets={variantsdata}
          ></ColorSwatch>
        )}

        <div className="item-price font-face-Lato-Regular">$500</div>
      </div>
    </article>
  );
}
