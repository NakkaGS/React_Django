//It is to create the component Loader, to 
//show when we cant to show that the page is loading something from the Database

import React from 'react'

//Boostrap Components
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner 
        animation='border'
        role='status' 
        style={{
            height:'100px',
            width:'100px',
            margin:'auto',
            display:'block'
        }}
    >
            <span className='sr-only'>Loading....</span>

    </Spinner>
  )
}

export default Loader