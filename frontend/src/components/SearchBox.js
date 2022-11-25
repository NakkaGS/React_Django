import React, { useState } from "react";


import { Form, Button } from "react-bootstrap";

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.presentDefault()
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'>

            </Form.Control>

            <Button
            type='submit'
            variant='outline-success'
            className='p-2'>
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox;