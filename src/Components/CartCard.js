import React, { useState, useEffect } from "react";
import styles from "./CartCard.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function CartCard({ item }) {
  // item is object in cart array
  const [quantity, setQuantity] = useState(0);
  const [productName, setProductName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [selectedOption, setSelectedOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  //   console.log(item.selected_options);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(item);
    setQuantity(item.quantity);
    setProductName(item.name);
    setItemPrice(item.price.formatted_with_symbol);
    setSelectedOptions(item.selected_options);
    setImageUrl(item.image.url);
  }, []);

  const onDeleteItem = (itemId) => {
    dispatch(deleteItem({ itemId: itemId }));
  };

  const onViewItem = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <>
      <div className={styles.cart_card_container}>
        <div className={styles.image_container}>
          <div className={styles.image_wrapper}>
            <img
              alt={productName}
              src={imageUrl}
              className={styles.cart_image}
            />
          </div>
        </div>
        <div className={styles.name_container}>{productName}</div>
        <div className={styles.price_container}>
          <div>{itemPrice}</div>
        </div>
        <div className={styles.selected_options_container}>
          {selectedOption.map((option) => (
            <>
              <div>{option.group_name}: </div>
              <div className={styles.position_left}>{option.option_name}</div>
            </>
          ))}
        </div>
        <div className={styles.quantity_container}>Qty: {quantity}</div>
        <div
          className={styles.delete_container}
          onClick={() => onDeleteItem(item.id)}
        >
          <HighlightOffIcon></HighlightOffIcon>
          <span className={styles.remove_text}>Remove</span>
        </div>
        <div
          className={styles.view_product_container}
          onClick={() => onViewItem(item.product_id)}
        >
          <VisibilityIcon></VisibilityIcon>
          <span className={styles.remove_text}>Details</span>
        </div>
      </div>
    </>
  );
}
