import React from "react";
import Navbar from "../Components/Navbar";
import "./HomePage.css";
import hero from "../media/video.mp4";
import hero2 from "../media/hero.webm";
import Item from "../Components/Item";
import { useState, useEffect } from "react";
import commerce from "../lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import { ColorRing } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.products);

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    if (!location.state?.skipEffect) {
      // Run the code you want to run when the page is navigated to.
      console.log("render");
      dispatch(getProducts({ searchBy: 1, query: "", slugs: [] }));
    }
  }, [location.state]);

  if (loading)
    return (
      <div className="loaderContainer">
        <ColorRing
          className="loader"
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
  else
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
          {entities.map((product) => (
            <Item key={product.id} product={product} />
          ))}

          {entities.map((product) => (
            <Item key={product.id} product={product} />
          ))}
          {entities.map((product) => (
            <Item key={product.id} product={product} />
          ))}
          {entities.map((product) => (
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
