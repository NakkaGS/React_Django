//It is the show the error on the page

import React from 'react'

//Boostrap Components
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

export default Message