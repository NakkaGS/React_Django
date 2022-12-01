import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import { useLocation, redirect } from "react-router-dom"

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useLocation(); //for V6 it is useNavigate, NOT useHistory

    const submitHandler = (e) => {
        e.presentDefault()

        if(keyword){
            redirect(`/?keyword=${keyword}`)
        } else {
            redirect(history.location.pathname)
        }
    }

    return (
        <Form onSubmit={submitHandler} className="container">
            <Form.Control
                type='text'
                name='keyword'
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