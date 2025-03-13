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
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    startson: "",
    endson: "",
    postedbyid: "", // Initialize empty and update when userId is available
    categoryid: "",
    cityareaid: "",
    typeid: "",
    image: null,
  });

  // Update postedbyid when userId becomes available
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, postedbyid: userId }));
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

  // Universal input change handler
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  let dispatch = useDispatch();



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
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
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" rows={3} name="features" value={formData.features} onChange={handleInputChange} placeholder="Enter features" />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Starts On</Form.Label>
                <Form.Control type="date" name="startson" value={formData.startson} onChange={handleInputChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Ends On</Form.Label>
                <Form.Control type="date" name="endson" value={formData.endson} onChange={handleInputChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="categoryid" className="bg-success text-white" value={formData.categoryid} onChange={handleInputChange}>
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
                <Form.Select name="cityareaid" className="bg-success text-white" value={formData.cityareaid} onChange={handleInputChange}>
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
                <Form.Select name="typeid" className="bg-success text-white" value={formData.typeid} onChange={handleInputChange}>
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
            <Form.Control type="file" name="image" onChange={handleInputChange} />
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



// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { postAd } from "../slices/postAd.slice";


// function PostAd({ show, handleClose }) {
//   // State to hold API data
//   const [categories, setCategories] = useState([]);
//   const [cityAreas, setCityAreas] = useState([]);
//   const [types, setTypes] = useState([]);
//   // State to hold form data
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     features: "",
//     startson: "",
//     // postedbyid : data.currentuser._id, 
//     endson: "",
//     categoryid: "",
//     cityareaid: "",
//     typeid: "",
//     image: null,
//   });

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, cityAreasRes, typesRes] = await Promise.all([
//           fetch("http://localhost:5000/api/v1/categories"),
//           fetch("http://localhost:5000/api/v1/cityarea"),
//           fetch("http://localhost:5000/api/v1/types"),
//         ]);

//         const [categories, cityAreas, types] = await Promise.all([
//           categoriesRes.json(),
//           cityAreasRes.json(),
//           typesRes.json(),
//         ]);

//         setCategories(categories);
//         setCityAreas(cityAreas);
//         setTypes(types);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle input change for text fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle dropdown selection
//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };


//   let dispatch = useDispatch()
//   const { data } = useSelector((state) => state.PostAd);

//   // console.log(data);
//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("Sending data:", formData);
//     dispatch(postAd(formData));
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title className="text-success fw-bold">Post Advertisement</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit} className="scrollable-form">
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Features</Form.Label>
//             <Form.Control as="textarea" rows={3} name="features" value={formData.features} onChange={handleChange} placeholder="Enter features" />
//           </Form.Group>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Starts On</Form.Label>
//                 <Form.Control type="date" name="startsOn" value={formData.startsOn} onChange={handleChange} />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Ends On</Form.Label>
//                 <Form.Control type="date" name="endsOn" value={formData.endsOn} onChange={handleChange} />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select name="categoryid" className="bg-success text-white" value={formData.category} onChange={handleSelectChange}>
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>City Area</Form.Label>
//                 <Form.Select name="cityareaid" className="bg-success text-white" value={formData.cityArea} onChange={handleSelectChange}>
//                   <option value="">Select City Area</option>
//                   {cityAreas.map((area) => (
//                     <option key={area._id} value={area._id}>
//                       {area.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Type</Form.Label>
//                 <Form.Select name="typeid" className="bg-success text-white" value={formData.type} onChange={handleSelectChange}>
//                   <option value="">Select Type</option>
//                   {types.map((type) => (
//                     <option key={type._id} value={type._id}>
//                       {type.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Post Advertisement
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default PostAd;



