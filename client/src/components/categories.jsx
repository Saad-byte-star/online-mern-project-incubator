import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Categories(){
    let navigate = useNavigate();
    let [data,setData] = useState([])
     useEffect(()=>{
         const fetchData = async ()=>{
             try{
                 const response = await fetch("http://localhost:5000/api/v1/categories")
                 const result = await response.json()
                 setData(result)  
             }
             catch(err){
             console.log(err)
             }
         }
         fetchData();
     }
     )
    return(
        <>
        {/* <Row> */}
        <div className="image-container">
  <img
    className="d-block w-100"
    src="./images/image1.png"
    alt="First slide"
    style={{ height: "200px", objectFit: "cover" }}
  />
  <div className="text-overlay">
    <div className="green-bracket"></div>
    <h1>Car Details</h1>
  </div>
</div>
        {/* </Row> */}
        <h1 className="text-success text-center">Hatchback</h1>
           {
      data.map((category) => (
        
         <Card className="m-3">
            <Row className=" m-3">
            <Col md={3}>
            <Card.Img src={category.image} />
            </Col>
            <Col md={9}>
            <Card.Body>
              
              <Card.Title className="text-success fw-bold">{category.name}</Card.Title>
              <Card.Text>{category.p}</Card.Text>
              <Card.Text>{category.description}</Card.Text>
              <Button variant="success" onClick={() => { navigate(`/detail`); }}>More Detail</Button>
            </Card.Body>
            </Col>
            </Row>
       </Card>
        
           
    )
    )}
        </>
    )
}
export default Categories;