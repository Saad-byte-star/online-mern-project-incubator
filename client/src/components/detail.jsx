import { Card, Col, Row } from "react-bootstrap"
import { FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa"
import { GoCheck } from "react-icons/go"
import { SlArrowRight } from "react-icons/sl";
import { useState , useEffect} from "react";
import { useParams } from "react-router";

function Detail() {

  let { id } = useParams()
  let [post, setPost] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/advertisement`)
        const result = await response.json()
        setPost(result.find(p => p._id === id));
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }
  )

  return (

    <>
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


      <Row className="m-3">
        <Col md={8} >
          <div className="d-flex align-items-center my-2">
            <Card.Img
              src="./images/image2.avif"
              className="img-fluid me-3"
              style={{ width: "80px", height: "60px", objectFit: "cover" }}
            />

            <div>
              <Card.Body>
                <Card.Title className="fw-bold mb-1">{post.name}</Card.Title>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-1" />
                  <span className="me-3">post.cityarea.name TOBEFIXED</span>
                  <FaMoneyBillAlt className="text-success me-1" />
                  <span>{post.price}</span>
                </div>
              </Card.Body>
            </div>
          </div>
          <h3>Car Description</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus distinctio eaque ea minus
            blanditiis non?  id. Suscipit ut porro ab quod sint soluta quo, praesentium tempora
            deserunt consectetur.
            Lorem, ipsum  sit amet consectetur adipisicing elit. Dolor pariatur at iure in nemo architecto
            aliquam adipisci labore alias quia obcaecati quidem, hic expedita? Suscipit earum numquam eum laborum
            sapiente?</p>
          <h3>Features</h3>
          <ul className="ps-0" style={{ listStyle: "none" }}>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> 5.0L V8 engine with 450 horsepower
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> 10-speed automatic transmission
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Rear-wheel drive
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Leather-trimmed seats
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> 12-inch digital instrument cluster
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> SYNC 3 infotainment system with Apple CarPlay and Android Auto
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Bang & Olufsen premium audio system
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Adaptive cruise control
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Lane keep assist
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Blind spot monitoring
            </li>
            <li className="d-flex align-items-center mb-2">
              <GoCheck className="text-success me-2" size={15} /> Rear cross-traffic alert
            </li>
          </ul>

        </Col>
        <Col md={4}>
          <Card className="m-2 p-3" style={{ backgroundColor: "#e6f9e6", borderRadius: "10px" }}>
            <Card.Title className="m-3">Advertisement Summary</Card.Title>
            <ul className="ps-0 m-2" style={{ listStyle: "none" }}>
              <li className="d-flex align-items-center mb-2">
                <SlArrowRight className="text-success me-2" size={15} /> 5.0L V8 engine with 450 horsepower
              </li>
              <li className="d-flex align-items-center mb-2">
                <SlArrowRight className="text-success me-2" size={15} /> 10-speed automatic transmission
              </li>
              <li className="d-flex align-items-center mb-2">
                <SlArrowRight className="text-success me-2" size={15} /> Rear-wheel drive
              </li>
              <li className="d-flex align-items-center mb-2">
                <SlArrowRight className="text-success me-2" size={15} /> Leather-trimmed seats
              </li>
              <li className="d-flex align-items-center mb-2">
                <SlArrowRight className="text-success me-2" size={15} /> 12-inch digital instrument cluster
              </li>
            </ul>
          </Card>
        </Col>
      </Row>



    </>

  )
}
export default Detail