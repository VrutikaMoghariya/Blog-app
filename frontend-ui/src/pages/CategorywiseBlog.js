// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from './Header';
// import { Container, Row, Card } from 'react-bootstrap';

// function CategorywiseBlog() {

//   let { _id } = useParams();
//   const [blogData, setBlogdata] = useState([]);
//   const [byCategory, setBycategory] = useState([]);

//   useEffect(() => {
//     axios     // get Blog-data from API
//       .get("http://localhost:3001/get-blog")
//       .then(data => setBlogdata(data.data.data))
//       .catch(error => console.log(error));

//   }, []);



//   return (
//     <>
//       <Header />
//       <Container>
//         <Row>
//           {
//             byCategory.map((item) => {
//               return (
//                 <>
//                   <Card style={{ width: '18rem' }}>
//                     <Card.Img variant="top" src="holder.js/100px180" />
//                     <Card.Body>
//                       <Card.Title>{item.title}</Card.Title>
//                       <Card.Title>{item.category.name}</Card.Title>
//                       <Card.Text>
//                         {item.description}
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </>
//               )
//             })
//           }
//         </Row>
//       </Container>

//       <h1>1234</h1>
//     </>
//   )
// }

// export default CategorywiseBlog;