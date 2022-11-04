//index.html->index.js->CartScreen.js->InfoModal.js
import React, { useState } from "react";

//Boostrap Components
import { Modal, Button } from "react-bootstrap";

//Redux
import { removeFromCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

function InfoModal({ item }) {

    //It makes the pop up message appear and desappear
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //this is to make the action 
    const dispatch = useDispatch();

    const removefromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
    <>
        <Button variant="primary" onClick={handleShow}>
            <i className="fas fa-trash"></i>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Removing Item</Modal.Title>
            </Modal.Header>
        <Modal.Body>
            <p>Are you sure that do you want to remove this item?</p>
            {item.name}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                I don't want
            </Button>
            <Button
                variant="primary"
                onClick={() => {
                    removefromCartHandler(item.product);
                    setShow(false);
            }}>
                Yes, I want to remove
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
}

export default InfoModal;
