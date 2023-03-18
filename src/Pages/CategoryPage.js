import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Item from "../Components/Item";
import { ColorRing } from "react-loader-spinner";
import styles from "./CategoryPage.module.css";

export default function SearchPage() {
  const dispatch = useDispatch();

  const { entities, loading } = useSelector((state) => state.products);
  const { category } = useParams();
  console.log(category);

  useEffect(() => {
    // Run the code you want to run when the page is navigated to.
    const arr = [category];
    console.log("render products by Category");
    dispatch(getProducts({ searchBy: 3, query: "", slugs: arr }));
  }, [dispatch, category]);

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
        <Navbar></Navbar>
        <div className={styles.container}>
          {/* navbar */}

          {/* end navbar */}
          {/* start item container */}
          <div className={styles.category_container}>Category: {category}</div>
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
          </section>
          {/*end item container*/}
        </div>
      </>
    );
}
