import { useState, useEffect } from "react"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

function Userdashboard() {
  let [form, setForm] = useState(false)
  let [editForm, setEditform] = useState(false)
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([])

  const { data } = useSelector((state) => state.Login)
  const userId = data?.currentuser?._id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) return;
        const response = await fetch(`http://localhost:5000/api/v1/users/uid/${userId}`);
        const data = await response.json();
        console.log("User Data Fetched:", data); // ✅ Debugging
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
  
    fetchUserProfile();
  }, [userId]);
  
  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (!user?._id) return;
        console.log("Fetching ads for user:", user._id); // ✅ Debugging
  
        const response = await fetch(`http://localhost:5000/api/v1/advertisement`);
        const adsData = await response.json();
        console.log("Ads Data Fetched:", adsData); // ✅ Debugging
  
        const filteredAds = adsData.filter(ad => ad.postedbyid._id === user._id);
        console.log("Filtered Ads:", filteredAds); // ✅ Debugging
  
        setAds(filteredAds);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
  
    fetchAds();
  }, [user]); // ✅ Runs only when `user` updates
  
  

  return (

    <>
      <div className="image-container">
        <img
          className="d-block w-100 m-3"
          src="./images/image1.png"
          alt="First slide"
          style={{ height: "200px", objectFit: "cover", }}
        />
        <div className="text-overlay">
          <div className="green-bracket"></div>
          <h1>User Dashboard</h1>
        </div>
      </div>
      <Row className="m-2">
        <Col md={3}>
          {/* Profile  */}
          <Card className="p-3">
            {user ? (
              <>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/public/images/${user.image}`}
                  className="mx-auto"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  alt="Profile"
                />
              </>
            ) : (
              <p>Loading...</p>
            )}

            <Card.Body>
              <h3 className="text-success">{user != null ? user.name : "Loading..."}</h3>
              <hr />
              <Card.Text className="fw-bold">Email:</Card.Text>
              <Card.Text className="fw-bold">Contact Number:</Card.Text>
              <Card.Text className="fw-bold">Birth Date:</Card.Text>
              <Button variant="success" className="me-2" onClick={() => setForm(true)}>Edit Info</Button>
              <Button variant="primary">Logout</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
  <h2 className="text-success">Your Advertisements</h2>
  {ads.length > 0 ? (
    ads.map((a) => (
      <Card key={a._id} className="m-2"> 
        <Row className="m-1 d-flex align-items-center">
          <Col md={3} className="text-center">
            <Card.Img src="./images/image2.avif" className="img-fluid" />
          </Col>
          <Col md={9}>
            <Card.Title>{a.name}</Card.Title>
            <Card.Text>{a.description}</Card.Text>
            <Card.Title>Price: {a.price}</Card.Title>
            <Card.Title>Area: {a.cityid?.name}</Card.Title>
            <Button variant="danger">Delete</Button>
            <Button onClick={() => setEditform(true)}>Edit</Button>
            <Button variant="primary">View More</Button>
          </Col>
        </Row>
      </Card>
    ))
  ) : (
    <p>No advertisements found.</p>
  )}
</Col>

      </Row >
      
      {/* Edit  Form */}
      < Modal show={form} onHide={() => setForm(false)
      } centered >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="password" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control placeholder="Enter Contact number" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birth date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Change
            </Button>
          </Form>
        </Modal.Body>
      </Modal >
      {/* Edit Info Form */}
      < Modal show={editForm} onHide={() => setEditform(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title className="text-success fw-bold">Edit Advertisement</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="scrollable-form">

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Enter Price" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Features</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Features" />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Starts On</Form.Label>
                  <Form.Control type="date" placeholder="Enter birth date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ends On</Form.Label>
                  <Form.Control type="date" placeholder="Enter ends on" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select>
                    <option className="bg-success text-white">Select Category</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City Area</Form.Label>
                  <Form.Select>
                    <option className="bg-success text-white">Select Area</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select>
                    <option>Select Type</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" placeholder="Enter file" />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setEditform(false)} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal >

    </>
  )
}
export default Userdashboard