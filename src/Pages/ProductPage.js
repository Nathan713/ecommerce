import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import Navbar from "../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams, useLocation } from "react-router-dom";
import commerce from "../lib/commerce";
import { stripHtml } from "string-strip-html";
import ColorSwatch from "../Components/ColorSwatch";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, loading } = useSelector(
    (state) => state.cart
  );
  console.log(totalQuantity);

  const [visible, setVisible] = useState(false);
  const [assets, setAssets] = useState([]);
  const [product, setProduct] = useState(null);
  const [variantsdata, setVariantsData] = useState([]);
  const [currentvariantsdata, setCurrentVariantsData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentVariantId, setCurrentVariantId] = useState(null);

  const { id } = useParams();
  console.log(id);

  const location = useLocation();
  const variantAssets = location.state.variantAssets;

  useEffect(() => {
    setVariantsData(variantAssets);
    setCurrentVariantsData(variantAssets[0].assets);
    setCurrentVariantId(variantAssets[0].id);
    console.log(variantAssets);
    fetchProduct();
  }, []);

  function handleSelectColor(id) {
    setCurrentVariantsData(variantsdata[id].assets);
    setCurrentVariantId(variantAssets[id].id);
  }

  const onAdd = () => {
    if (quantity < product.inventory.available) setQuantity(quantity + 1);
  };
  const onRemove = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const fetchProduct = () => {
    commerce.products
      .retrieve(id)
      .then((product) => {
        setProduct(product);
        setAssets(product.assets);
        setProductName(product.name);
        const strippedString = stripHtml(product.description).result;
        setProductDescription(strippedString);
        setProductPrice(product.price.formatted_with_symbol);
        console.log(product);
      })
      .catch((error) => {
        console.log("There was an error fetching the product", error);
      });
  };

  const addToCart = (productId, quantity, variantId) => {
    dispatch(
      addItem({
        productId: productId,
        quantity: quantity,
        variantId: variantId,
      })
    );
  };
  const handleBoxToggle = () => {
    setVisible(true);
  };
  const handleBoxTog = () => {
    setVisible(false);
  };
  if (totalQuantity > 0) console.log(totalQuantity);
  return (
    <>
      <Navbar></Navbar>
      <div className="container2">
        <div
          className="left"
          onMouseEnter={handleBoxToggle}
          onMouseLeave={handleBoxTog}
        >
          <div className="carousel-container">
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
              {currentvariantsdata.map((asset) => (
                <div className="carousel-img" key={asset.id}>
                  <img alt="bagss" src={asset.url} className="image" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="right">
          <div className="productDetailsContainer">
            <div className="productName underline">{productName}</div>
            <div className="productPrice">
              <span className="price">{productPrice}</span>
            </div>
            <div className="colorSelector">
              {variantsdata.length > 0 && (
                <ColorSwatch
                  onSelectColor={handleSelectColor}
                  assets={variantsdata}
                ></ColorSwatch>
              )}
            </div>
            <div className="productDescription">{productDescription}</div>
            <div className="quantityContainer">
              <div className="quantity-start">Quantity</div>
              <div className="quantity-end">
                <AddIcon onClick={onAdd} className="addIcon"></AddIcon>
                <span className="quantityNumber">{quantity}</span>
                <RemoveIcon
                  onClick={onRemove}
                  className="removeIcon"
                ></RemoveIcon>
              </div>
            </div>
            {product && product.inventory.available > 0 ? (
              <div
                className="addToCartButton"
                onClick={() => addToCart(id, quantity, currentVariantId)}
              >
                Add To Cart
              </div>
            ) : (
              <div className="outOfStockButton">Out Of Stock</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
