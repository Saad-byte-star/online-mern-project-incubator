import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditUserModal from "./editModals/EditUserModal";
import EditAdModal from "./editModals/EditAdModal";

function UserDashboard() {
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // Stores selected ad for editing
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);

  const { data } = useSelector((state) => state.Login);
  const postState = useSelector((state)=>state.PostAd);
  const userId = data?.currentuser?._id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) return;
        const response = await fetch(`http://localhost:5000/api/v1/users/uid/${userId}`);
        const data = await response.json();
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
        const response = await fetch(`http://localhost:5000/api/v1/advertisement`);
        const adsData = await response.json();
        const filteredAds = adsData.filter((ad) => ad.postedbyid._id === user._id);
        setAds(filteredAds);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, [user , postState]);

  const handleEditClick = (ad) => {
    setSelectedAd(ad);
    setEditForm(true);
  };

  return (
    <>
      <div className="image-container">
        <img className="d-block w-100 m-3" src="./images/image1.png" alt="First slide" style={{ height: "200px", objectFit: "cover" }} />
        <div className="text-overlay">
          <div className="green-bracket"></div>
          <h1>User Dashboard</h1>
        </div>
      </div>

      <Row className="m-2">
        <Col md={3}>
          <Card className="p-3">
            {user ? (
              <>
                <Card.Img variant="top" src={`http://localhost:5000/public/images/${user.image}`} className="mx-auto" style={{ width: "120px", height: "120px", objectFit: "cover" }} alt="Profile" />
              </>
            ) : (
              <p>Loading...</p>
            )}

            <Card.Body>
              <h3 className="text-success">{user ? user.name : "Loading..."}</h3>
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
            ads.map((ad) => (
              <Card key={ad._id} className="m-2">
                <Row className="m-1 d-flex align-items-center">
                  <Col md={3} className="text-center">
                    <Card.Img src={`http://localhost:5000/public/images/${ad.image}`} className="img-fluid" />
                  </Col>
                  <Col md={9}>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>{ad.description}</Card.Text>
                    <Button variant="danger">Delete</Button>
                    <Button onClick={() => handleEditClick(ad)}>Edit</Button>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <p>No advertisements found.</p>
          )}
        </Col>
      </Row>

      <EditUserModal show={form} handleClose={() => setForm(false)} />
      <EditAdModal show={editForm} handleClose={() => setEditForm(false)} adId={selectedAd?._id} adData={selectedAd} />
    </>
  );
}

export default UserDashboard;
