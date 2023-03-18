import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Item from "../Components/Item";
import { ColorRing } from "react-loader-spinner";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  console.log(search);
  const { entities, loading } = useSelector((state) => state.products);

  useEffect(() => {
    // Run the code you want to run when the page is navigated to.
    console.log("render search");
    dispatch(getProducts({ searchBy: 2, query: search, slugs: [] }));
  }, [dispatch, search]);

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
          <div className={styles.search_container}>
            ({entities.length}) Search Results for "{search}"
          </div>
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
