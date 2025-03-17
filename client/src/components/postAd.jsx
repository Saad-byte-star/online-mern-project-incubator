import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAd } from "../slices/postAd.slice";

function PostAd({ show, handleClose }) {
  // State to hold API data
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [types, setTypes] = useState([]);

  const loginState = useSelector((state) => state.Login);
  const userId = loginState?.data?.currentuser?._id || ""; // Safe access to avoid errors

  // State to hold form data
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [startson, setStartsOn] = useState(Date.now());
  const [endson, setEndsOn] = useState();
  const [postedbyid, setPostedById] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [cityareaid, setCityAreaId] = useState("");
  const [typeid, setTypeId] = useState("");
  const [image, setImage] = useState();

  // Update postedbyid when userId becomes available
  useEffect(() => {
    if (userId) {
      setPostedById(userId);
    }
  }, [userId]); // Runs when userId updates

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

  let dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("startson", startson);
    formData.append("endson", endson);
    formData.append("postedbyid", postedbyid);
    formData.append("typeid", typeid);
    formData.append("categoryid", categoryid);
    formData.append("cityid", cityareaid);
    formData.append("image", image); // Must be a File object

    // 🔥 Log before dispatching
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Check if all values are added correctly
    }
    // console.log("Sending data:", formData);
    dispatch(postAd(formData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-success fw-bold">Post Advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="scrollable-form">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" rows={3} name="features" onChange={(e) => setFeatures(e.target.value)} placeholder="Enter features" />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Starts On</Form.Label>
                <Form.Control type="date" name="startson" onChange={(e) => setStartsOn(e.target.value)} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Ends On</Form.Label>
                <Form.Control type="date" name="endson" onChange={(e) => setEndsOn(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="categoryid" className="bg-success text-white" onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City Area</Form.Label>
                <Form.Select name="cityareaid" className="bg-success text-white" onChange={(e) => setCityAreaId(e.target.value)}>
                  <option value="">Select City Area</option>
                  {cityAreas.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="typeid" className="bg-success text-white" onChange={(e) => setTypeId(e.target.value)}>
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type._id} value={type._id}>{type.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Post Advertisement
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PostAd;





