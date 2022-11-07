import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

function ItemsInCart() {
  /*   let cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []; //it checks if the attribute exist in the local storage */

  let totalItems = 0;

  const [cartItemsFromStorage, setCart] = useState([]);

  useEffect(() => {

    var originalSetItem = localStorage.setItem;

    async function init() {
      const cartItemsFromStorage = localStorage.getItem("cartItems");
      setCart(JSON.parse(cartItemsFromStorage));
    }

    localStorage.setItem = function(){
        originalSetItem.apply(this, arguments);
        //console.log('Listening is working')
        init();
        
    }
   
    init();
  }, []);

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
