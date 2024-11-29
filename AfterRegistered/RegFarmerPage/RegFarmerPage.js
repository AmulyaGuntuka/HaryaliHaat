import React, { useState, useEffect } from "react";
import "./RegFarmerPage.css";
import NavbarRegistered from "../../NavbarRegistered/NavbarRegistered";
import FooterNew from "../../Footer/FooterNew";
import RegCategories from "../RegCatoegories/RegCategories";
import TypeWriter from "../../AutoWritingText/TypeWriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faShoppingBag, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function RegFarmerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // To hold the user's first name and details

  useEffect(() => {
    // Fetch user data based on token
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8070/farmer/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"), // Token stored in localStorage
          }),
        });

        const data = await response.json();
        if (data.data === "token expired") {
          alert("Session expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          setUserData(data.data); // Store fetched user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch products for the logged-in farmer
    const fetchProducts = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("No email found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8070/product/email/${email}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Store the products
        } else {
          console.error("Failed to fetch products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchUserData();
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarRegistered />
      <div className="nothing"></div>

      {/* Image Section */}
      <div className="crop-container">
        <img
          src="https://organicbiz.ca/wp-content/uploads/2019/05/vegetables-farmers-870915532-alle12-iStock-GettyImages.jpg"
          alt="Farmers"
          className="crop-image"
        />
      </div>

      {/* Welcome Section */}
      <div className="type-writer-container">
        <TypeWriter
          text={`Hello ${userData?.fname || "Farmer"}, Welcome!`} // Dynamically include first name
          loop={false}
          className="writer"
          textStyle={{
            fontFamily: "Gill Sans",
            fontSize: "60px",
          }}
        />
      </div>

      {/* Categories Section */}
      <div className="categories-container">
        <div className="categories-div">
          <RegCategories />
        </div>
      </div>

      {/* Products Section */}
      <div className="nothing2"></div>
      <div className="topic">
        <p>Your Products</p>
      </div>

      <div className="orders-wrapper">
        <div className="orders-container">
          {products.length > 0 ? (
            products.slice(0, 8).map((product, index) => (
              <div key={index} className="order-item">
                <img
                  src={`http://localhost:8070/uploads/${product.productImage}`}
                  alt={product.item || "Product Image"}
                  className="order-image"
                />
                <p>{product.item}</p>
                <p>Quantity: {product.quantity || "N/A"}</p>
                <p>Price: ₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
                <p>Posted Date: {new Date(product.postedDate).toLocaleDateString() || "N/A"}</p>
                <p>Expires Date: {new Date(product.expireDate).toLocaleDateString() || "N/A"}</p>
                <button className="cart-button">
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
                <button className="supply-button">
                  <FontAwesomeIcon icon={faShoppingBag} /> Buy Now
                </button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        {products.length > 8 && (
          <a href="/farmerorder" className="view-all-button1">
            <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
          </a>
        )}
      </div>

      <FooterNew />
    </div>
  );
}

export default RegFarmerPage;
