import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom"

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useLocation(); //for V6 it is useNavigate, NOT useHistory

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(history.search)
        }
    }

    return (
        <Form onSubmit={submitHandler} className="search-box">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='m-1 p-2'
            >
                Submit
            </Button>
        </Form>

    )
}

export default SearchBox;