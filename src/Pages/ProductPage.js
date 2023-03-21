import React, { useEffect, useState } from "react";
// import "./ProductPage.css";
import styles from "./ProductPage.module.css";
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast, { Toaster } from "react-hot-toast";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, loading } = useSelector(
    (state) => state.cart
  );
  // console.log(totalQuantity);

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
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  const { id } = useParams();
  // console.log(id);

  const location = useLocation();
  // const variantAssets = location.state.variantAssets;
  // console.log(variantAssets);
  useEffect(() => {
    fetchVariants();
    // setVariantsData(variantAssets);
    // setCurrentVariantsData(variantAssets[0].assets);
    // setCurrentVariantId(variantAssets[0].id);
    // console.log(variantsdata);
    fetchProduct();
  }, []);
  const fetchVariants = () => {
    commerce.products
      .getVariants(id)
      .then((variants) => {
        console.log(variants);
        setVariantsData(variants.data);
        setCurrentVariantsData(variants.data[0].assets);
        setCurrentVariantId(variants.data[0].id);
        // setAssets(variants.data[0].assets);
        // setVariantsData(variants.data);
        // console.log(variants.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the variants", error);
      });
  };

  function handleSelectColor(id) {
    setCurrentVariantIndex(id);
    setCurrentVariantsData(variantsdata[id].assets);
    // setCurrentVariantId(variantAssets[id].id);
    setCurrentVariantId(variantsdata[id].id);
    setQuantity(1);
  }

  const onAdd = () => {
    // if (quantity < variantAssets[currentVariantIndex].inventory)
    if (quantity < variantsdata[currentVariantIndex].inventory)
      setQuantity(quantity + 1);
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
    toast.success("Successfully Added Items To Cart");
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
      <div className={styles.navContainer}>
        <Navbar></Navbar>
        <div className={styles.container}>
          <div
            className={styles.left}
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
                {currentvariantsdata.map((asset) => (
                  <div className={styles.carousel_img}>
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
          <div className={styles.right}>
            <div className={styles.product_details_container}>
              <div className={styles.product_name}>{productName}</div>

              <div className={styles.product_price}>
                <span className={styles.price}>{productPrice}</span>
              </div>
              <div className={styles.color_selector}>
                {variantsdata.length > 0 && (
                  <ColorSwatch
                    onSelectColor={handleSelectColor}
                    assets={variantsdata}
                  ></ColorSwatch>
                )}
              </div>
              <div className={styles.product_description}>
                {productDescription}
              </div>
              <div className={styles.quantity_container}>
                <div className={styles.quantity_start}>Quantity</div>
                <div className={styles.quantity_end}>
                  <AddIcon
                    onClick={onAdd}
                    className={styles.add_icon}
                  ></AddIcon>
                  <span className={styles.quantity_number}>{quantity}</span>
                  <RemoveIcon
                    onClick={onRemove}
                    className={styles.remove_icon}
                  ></RemoveIcon>
                </div>
              </div>
              {/* {variantAssets &&
            variantAssets[currentVariantIndex].inventory > 0 ? ( */}
              {variantsdata.length > 0 &&
              variantsdata[currentVariantIndex].inventory > 0 ? (
                <div
                  className={styles.add_to_cart_button}
                  onClick={() => addToCart(id, quantity, currentVariantId)}
                >
                  Add To Cart
                </div>
              ) : (
                <div className={styles.out_of_stock_button}>Out Of Stock</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
