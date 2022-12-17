import React, { Fragment, useState } from "react";
import Navbar from "./Navbar";
import Product from "./ProductData";

function Products() {
  let user = localStorage.getItem('user');
  return (
    <>
 
       {user?(
        <>
        < Navbar/>           
      <div className="container mt-5">
        <div className="fs-2  ">
          <span>All Products</span>
        </div>
        <Product />
      </div>
      </>
      )
      :(
        <p>Page Not Found</p>
      )}
      
    </>
  );
}
export default Products;
