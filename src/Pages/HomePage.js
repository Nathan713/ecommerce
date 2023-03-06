import React from "react";
import Navbar from "../Components/Navbar";
import "./HomePage.css";
import hero from "../media/video.mp4";
import hero2 from "../media/hero.webm";
import Item from "../Components/Item";
import { useState, useEffect } from "react";
import commerce from "../lib/commerce";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        //console.log(products);
      })
      .catch((error) => {
        //console.log("There was an error fetching the products", error);
      });
  };

  return (
    <div className="container">
      {/* navbar */}
      <Navbar></Navbar>
      {/* end navbar */}
      {/* start video */}
      <section className="video-container">
        <video muted autoPlay loop className="video">
          <source src={hero} type="video/mp4" />
          Sorry, your browser does not support embedded videos
        </video>
      </section>
      {/* end video */}
      {/* start item container */}

      <section className="item-section">
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}

        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
        {/* <Item image={products[0].image.url}></Item> */}
        {/* <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item> */}
      </section>
      {/*end item container*/}
    </div>
  );
}

export default HomePage;
