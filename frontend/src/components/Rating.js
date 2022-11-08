//App.js->HomeScreen.js->Product.js->Rating.js
//It shows the Product Rating in Stars

import React from "react";

function Rating({ value, text, color }) {
  //This is the data from product.js
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            /* color is the attribute set on Product.js / value is product.rating / text ist set on the Product.js*/
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-halt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-halt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-halt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-halt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-halt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        {text && text}{" "}
        {/* //if text in Product.js exist (<Rating value={product.rating} text={`${product.numReviews} reviews`}), then show the text */}
      </span>
    </div>
  );
}

export default Rating;
