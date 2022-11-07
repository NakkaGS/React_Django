import React from "react";
import { Badge } from "react-bootstrap";

function ItemsInCart() {
  const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []; //it checks if the attribute exist in the local storage

  let totalItems = 0;

  cartItemsFromStorage.forEach(function (e) {
    totalItems += e.qty;
  });

  return (
    <Badge pill bg="light" text="dark">
      {totalItems}
    </Badge>
  );
}

export default ItemsInCart;
