import React, { useState, useEffect } from "react";
import "./CartCard.css";
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
      <div className="cart-card-container">
        <div className="image-container">
          <div className="image-wrapper">
            <img alt={productName} src={imageUrl} className="cart-image" />
          </div>
        </div>
        <div className="name-container Lato-Bold">{productName}</div>
        <div className="price-container Lato-Bold">
          <div>{itemPrice}</div>
        </div>
        <div className="selected-options-container">
          {selectedOption.map((option) => (
            <>
              <div>{option.group_name}: </div>
              <div className="position-left Lato-Light">
                {option.option_name}
              </div>
            </>
          ))}
        </div>
        <div className="quantity-container">Qty: {quantity}</div>
        <div className="delete-container" onClick={() => onDeleteItem(item.id)}>
          <HighlightOffIcon></HighlightOffIcon>
          <span className="remove-text">Remove</span>
        </div>
        <div
          className="view-product-container"
          onClick={() => onViewItem(item.product_id)}
        >
          <VisibilityIcon></VisibilityIcon>
          <span className="remove-text">Details</span>
        </div>
      </div>
    </>
  );
}
