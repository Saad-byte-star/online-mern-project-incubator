import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/categories");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-success fw-bold text-center my-3">Explore By Categories</h1>
      <Row className="my-4 mx-1 d-flex flex-wrap">
        {data.map((card) => (
          <Col key={card._id} className=" col-md col-sm-6">
            <Card onClick={() => { navigate(`/category/${card._id}/posts`); }} className='mt-3'>
              <Card.Img style={{ height: "200px", objectFit: "cover" }} variant="top" src={`/images/${card.image}`} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text className="text-success fw-bold">{card.quantity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cards;

