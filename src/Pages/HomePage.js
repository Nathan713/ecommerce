import React from "react";
import Navbar from "../Components/Navbar";
// import "./HomePage.css";
import styles from "./HomePage.module.css";
import hero from "../media/video.mp4";
import hero2 from "../media/hero.webm";
import Item from "../Components/Item";
import { useState, useEffect } from "react";
import commerce from "../lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import { ColorRing } from "react-loader-spinner";

function HomePage() {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.products);

  useEffect(() => {
    // Run the code you want to run when the page is navigated to.
    console.log("render");
    dispatch(getProducts({ searchBy: 1, query: "", slugs: [] }));
  }, []);

  if (loading)
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
  else
    return (
      <>
        {/* navbar */}
        <Navbar></Navbar>
        {/* end navbar */}

        <div className={styles.container}>
          {/* start video */}
          <section className={styles.video_container}>
            <video muted autoPlay loop className={styles.video}>
              <source src={hero} type="video/mp4" />
              Sorry, your browser does not support embedded videos
            </video>
          </section>
          {/* end video */}
          {/* start item container */}

          <section className={styles.item_container}>
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
      </>
    );
}

export default HomePage;
