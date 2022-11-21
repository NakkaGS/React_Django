//It is the show the error on the page

import React, { useEffect, useState } from "react";

//Boostrap Components
import { Alert } from 'react-bootstrap'

function MessageTimer({variant, children}) {

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
        
    return () => clearTimeout(timer);
  }, []); 

  return (
    <Alert show={show} variant={variant}>{children}</Alert>
  )
}

export default MessageTimer