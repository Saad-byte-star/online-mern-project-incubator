import React from 'react';
import { Carousel, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { useState, useEffect } from 'react'



function Carousels() {

  // State to hold API data
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [types, setTypes] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, cityAreasRes, typesRes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/categories"),
          fetch("http://localhost:5000/api/v1/cityarea"),
          fetch("http://localhost:5000/api/v1/types"),
        ]);

        const [categories, cityAreas, types] = await Promise.all([
          categoriesRes.json(),
          cityAreasRes.json(),
          typesRes.json(),
        ]);

        setCategories(categories);
        setCityAreas(cityAreas);
        setTypes(types);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Carousel className="custom-carousel" >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/image.png"
            alt="First slide"
            style={{ width: '1200px', height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ marginBottom: '7rem', marginRight: '24rem' }}>
            <div className="caption-wrapper-custom">
              <h3>Shift Into Gear:<br />Your Destination<br />for Car Excellence</h3>
              <p style={{ marginLeft: '6rem' }}>Drive Your Dream: Find Your Perfect Car Today</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="success">Search A Car</Button>
                <Button variant="primary">Post Advertisement</Button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/image1.png"
            alt="Second slide"
            style={{ width: '1200px', height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ marginBottom: '8.5rem', marginRight: '24rem' }}>
            <h3>Shift Into Gear:<br />Your Destination<br />for Car Excellence</h3>
            <p style={{ marginLeft: '6rem' }}>Drive Your Dream: Find Your Perfect Car Today</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button variant="success" style={{ marginRight: '10px' }}>Search A Car</Button>
              <Button variant="primary" > Post Advertisement</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* Form */}
      <Container fluid >
        <Row className="search-row">
          <Col md={12} >
            <Form className="search-form">
              <Row>
                <Col xs={12} md={3} >
                  <Form.Control type="text" placeholder="Keyword" />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select>
                    <option value="">Select City Area</option>
                    {cityAreas.map((area) => (
                      <option key={area._id} value={area._id}>{area.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md={3} className="d-grid">
                  <Button variant="dark" type="submit"><HiMagnifyingGlassCircle size={25} />Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Carousels;

