import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardBody, Container, Form, Modal, Row, Table, Col, Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './style.css';

function Businesspage() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [fetchdata, setfetchdata] = useState([]);
    const [addbusiness, setaddbusiness] = useState("");

    useEffect(() => {
        fetchbusinessdata()
    }, [])

    const handlesubmit = async () => {
        debugger
        setShow(false)
        debugger
        var business = {
            business_name: addbusiness
        }
        try {
            var res = await axios.post('http://business-live.vercel.app/insert', business);
            console.log(res)
            fetchbusinessdata("");
            Swal.fire({
                title: "Record Add",
                text: "Record add Successfully",
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (err) {
            console.log(err)
        }

    }
    const fetchbusinessdata = async () => {
        debugger
        try {
            var res = await axios.get('http://business-live.vercel.app/dataget');
            console.log(res.data)
            setfetchdata(res.data);

            setaddbusiness("");

        } catch (err) {
            console.log(err)
        }

    }

    const handledelete = async (id) => {
        try {
            var res = await axios.delete('http://business-live.vercel.app/deletebyid/' + id);
            console.log(res)
            fetchbusinessdata();
            Swal.fire({
                title: "Record Deleted",
                text: "Record Deleted Successfully",
                icon: "success"
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "There was an error deleting the record",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }
    return (
        <>


            <Container>
                <Form>
                    <Button id='buisness_category_button' onClick={handleShow} >
                        Add Business
                    </Button><br></br>
                    <Modal size='md'
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Business</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group>
                                <Form.Label /><b>Business Name</b>
                                <Form.Control type='text' name='name' placeholder='Enter Business' value={addbusiness} onChange={(e) => setaddbusiness(e.target.value)} />
                            </Form.Group>
                            <br></br>
                            <Button onClick={() => handlesubmit()}>Submit</Button>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handlesubmit}>
                                Add Business
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Form>
            </Container>
            <Row>
                {fetchdata.map((item) => (
                    <Col md={4} key={item.business_id}>
                        <Card style={{ width: '20rem', marginTop: '15px' }}>
                            <Card.Body>

                                <Card.Title>Business Id: {item.business_id}</Card.Title>
                                <Card.Text id='card-link' as={Link} to={`/Redirect/${item.business_id}`}>
                                  <b>Business Name</b>  : {item.business_name}
                                </Card.Text>
                                <br></br><br></br>
                                <Button variant="primary" onClick={() => handlesubmit(item.business_id)} >Submit</Button>
                                <Button variant="danger" onClick={() => handledelete(item.business_id)}>Delete</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


            {/* <table>
                <thead>
                    <tr>
                        <th>Business id</th>
                        <th>Business Name</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        fetchdata.map((item) => (
                            <tr key={item.business_id}>
                                <td>{item.business_id}</td>
                                <td>{item.business_name}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
            <button onClick={() => handlesubmit()}>ADD BUSINESS</button> */}
        </>
    )
}
export default Businesspage;