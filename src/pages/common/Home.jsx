import React from "react";
import "./Style/Home.css";
import categoryConstants from "./categoryConstants";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-wrapper">
      <div>
        <div>This is Home page managed by Hub Team</div>
        <Link
          to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}`}
          class="home-link"
        >
          Go to kafka
        </Link>
      </div>
    </div>
  );
};
export default Home;
