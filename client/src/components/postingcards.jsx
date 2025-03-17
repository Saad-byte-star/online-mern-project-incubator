import { useEffect, useState } from 'react';
import { Col, Row,Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Posting() {
  let [data,setData] = useState([])
  const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(" http://localhost:5000/api/v1/advertisement")
                const result = await response.json()
                result.reverse()
                setData(result.slice(0,4))  
            }
            catch(err){
            console.log(err)
            }
        }
        fetchData();
    }
    )
return (
  <>
    <h1 className='text-success fw-bold  text-center my-3'>Latest Posting</h1>
    <Row className="my-4 mx-1 d-flex flex-wrap">
      {data.map((post) => (
        <Col key={post._id} className="col-md-6 col-sm-6">
          <Card className='mt-3'>
            <Card.Img style={{ height: "500px", objectFit: "cover" }} variant="top" src={`http://localhost:5000/public/images/${post.image}`} />
            <Card.Title className='ms-3 mt-3'>{post.name}</Card.Title>
            <Card.Body>
              <Card.Text>{post.description}</Card.Text>
              <Button variant="success" onClick={()=>{navigate(`/posting/${post._id}`)}}>More Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);
}
export default Posting;
