import React, { useState } from 'react';
import { Button, Container, Form, FormControl, Modal, ModalBody } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Redirect() {

    // const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [business, setbusiness] = useState({});

    return (
        <>
            <h1>Your Business <span>{business?.business_name}</span></h1>
            <Container>
                <Form>
                    <Modal size='md'
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Business</Modal.Title>
                        </Modal.Header>
                        <ModalBody>
                            <Form.Label>Business</Form.Label>
                            <FormControl type='text' name='category' disabled value={business?.business_name}></FormControl>
                        </ModalBody>
                    </Modal>
                </Form>
            </Container>
            <Button a href='/'>Back</Button>
        </>
    )
}
export default Redirect;