import React from "react";
// import "./Item.css";
import styles from "./Item.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import commerce from "../lib/commerce";
import ColorSwatch from "./ColorSwatch";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Item({ product }) {
  const [visible, setVisible] = useState(false);
  const [assets, setAssets] = useState([]);
  const [variantsdata, setVariantsData] = useState([]);
  console.log(product);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
  const handleBoxToggle = () => {
    setVisible(true);
  };
  const handleBoxTog = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchVariants();
    // console.log(assets);
    // console.log(variantsdata);
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

  if (assets.length === 0)
    return (
      <div className={styles.loader_container}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  return (
    <article className={styles.item_container}>
      <div
        className={styles.img_container}
        onMouseEnter={handleBoxToggle}
        onMouseLeave={handleBoxTog}
      >
        <div className={styles.carousel_container}>
          <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={true}
            showStatus={false}
            className={styles.carousel}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev &&
              visible && (
                <button
                  className={styles.arrow_left}
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
                  className={styles.arrow_right}
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
              <div
                className={styles.carousel_img}
                onClick={() => {
                  handleProductClick(product.id);
                }}
              >
                <img
                  alt="bagss"
                  src={asset.url}
                  className={styles.image}
                  key={asset.id}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.item_details_container}>
        <div className={styles.item_name}>{product.name}</div>
        {assets.length > 0 && (
          <ColorSwatch
            onSelectColor={handleSelectColor}
            assets={variantsdata}
          ></ColorSwatch>
        )}

        <div className={styles.item_price}>
          {product.price.formatted_with_symbol}
        </div>
      </div>
    </article>
  );
}
