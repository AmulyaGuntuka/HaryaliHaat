import React, { useState, useEffect } from "react";
import Navbar from "../../NavbarRegistered/NavbarRegistered";
import "./ConsumerHomePage.css";
import { useNavigate } from "react-router-dom";
import Categories from "../../Catoegories/Categories";
import Video from "../../ProcessLine/Video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import KeyFeatures from "../../KeyFeatures/KeyFeatures";
import FooterNew from "../../Footer/FooterNew";

function ConsumerHomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch("http://localhost:8070/seller/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (result.status === "ok") {
          setUserName(result.data.fname); // Set the first name
        } else {
          console.error(result.error);
          navigate("/login"); // Redirect to login if there's an error
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login"); // Redirect to login in case of error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleNextPage = () => {
    navigate("/productpage");
  };

  return (
    <div>
      <Navbar />
      <div className="image-container">
      <img
        src="https://plantura.garden/uk/wp-content/uploads/sites/2/2022/04/corn-cob.jpg"
        alt=""
        className="crop"
      />
      <div className="salutation-container">
        <h2>Hello {userName || "Guest"}, </h2>
      </div>
      </div>
      <div className="profile-container">
        <button className="big-button" onClick={handleNextPage}>
          Order Now!!!
        </button>
      </div>
      <div className="welcome-text">
        <span className="welcome">Welcome to</span>{" "}
        <span className="cropxchange">CropXchange!</span>
      </div>
      <div className="main-paragraph">
        <p>
          Welcome to CropXchange, your digital marketplace for a bounty of
          fresh, locally-sourced fruits and vegetables. Our user-friendly
          platform ensures a hassle-free experience, allowing you to explore,
          connect, and purchase with confidence. From farm to table, CropXchange
          is committed to fostering community, supporting local agriculture, and
          delivering a harvest of quality right to your doorstep.
        </p>
      </div>

      <Categories />

      <div className="how-it-works">
        <span className="welcome">How It</span>{" "}
        <span className="cropxchange">Works</span>
      </div>
      <div className="how-it-works-paragraph">
        <p>
          Welcome to CropXchange, your digital marketplace for a bounty of
          fresh, locally-sourced fruits and vegetables. Our user-friendly
          platform ensures a hassle-free experience, allowing you to explore,
          connect, and purchase with confidence. From farm to table, CropXchange
          is committed to fostering community, supporting local agriculture, and
          delivering a harvest of quality right to your doorstep.
        </p>
      </div>

      <div className="video-container">
        <Video />
      </div>

      <div className="our-solution">
        <span className="welcome">Our</span>{" "}
        <span className="cropxchange">Solution</span>
      </div>
      <div className="how-it-works-paragraph">
        <p>
          CropXchange is a digital B2B market solution that brings together
          Farmers and Industrial Buyers. Agri Marketplace does not buy or sell
          crops and is not a broker. Instead, we offer you the ability to
          effortlessly market your crop via our platform.
        </p>
      </div>

      <div className="all">
        <img
          src={process.env.PUBLIC_URL + "/Homepage/all.png"}
          alt=""
          className="all-image"
        />
      </div>

      <div className="our-solution">
        <span className="welcome">Our</span>{" "}
        <span className="cropxchange">Pricing</span>
      </div>
      <div className="how-it-works-paragraph">
        <ul className="list-content">
          <li>
            <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> All
            users who prefer to post orders, have to pay a small fee to
            CropXchange.
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> The
            first order is free of charge for all users and charges will be done
            after the first bid.
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> For
            Deliverymen can post their details and if they update the bid, there
            is a small charge.
          </li>
        </ul>
      </div>

      <div className="all">
        <img
          src="https://agrimp.com/assets/icons/grain_bag_en-35a97c53a2457418423528885a62a4c2d52f0427241fa798c2f80432caf10b99.png"
          alt=""
          className="price-image"
        />
      </div>

      <div className="our-solution">
        <span className="welcome">Key</span>{" "}
        <span className="cropxchange">Features</span>
      </div>
      <div className="how-it-works-paragraph">
        <p>
          Discover how CropXchange Marketplace can benefit you and all other
          food supply chain actors.
        </p>
      </div>

      <KeyFeatures />

      <div className="our-solution">
        <span className="welcome">Get</span>{" "}
        <span className="cropxchange">Started</span>
      </div>
      <div className="how-it-works-paragraph">
        <p>
          We open the door to thousands of approved buyers and sellers. Post
          your crop bid as a registered buyer, or create your crop offer as a
          platform verified seller. Through our rigorous customer compliance we
          make sure that only reliable users gain access to our digital
          marketplace. There are two ways to get started:
        </p>
      </div>
      <FooterNew />
    </div>
  );
}

export default ConsumerHomePage;