import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Table,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import DeleteData from "../modal/ModalDelete";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../Config/api";

export default function Product() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState({});
  const [vendors, setVendors] = useState({});

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProducts = async () => {
    try {
      const response = await API.get("/get-products");
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/delete-product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    // getCategories();
    // getVendors();
  }, []);

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleAdd = () => {
    navigate("/add-product");
  };

  const handleEdit = (id) => {
    navigate("/edit-product/" + id);
  };

  const [search, setSearch] = useState();

  return (
    <div>
      <NavUser />

      <Container fluid className="mt-5">
        <Row>
          <Col lg={4}>
            <div>
              <Tabs />
            </div>
          </Col>
          <Col>
            <h1 className="text-white">Product</h1>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-1 mt-2 "
              variant="danger"
            >
              Add
            </Button>
            <Form className="d-flex mt-2 mb-2">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-primary active">Search</Button>
            </Form>
            <>
              {products.length !== 0 ? (
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Kategory</th>
                      <th>Vendor</th>
                      <td>Action</td>
                    </tr>
                  </thead>

                  <tbody>
                    {products
                      .filter((item) =>
                        item.name.toLowerCase().includes(search)
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            {" "}
                            <img
                              src={item.image}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                              alt="preview"
                            />
                          </td>
                          <td>{item.price}</td>
                          <td>{item.qty}</td>
                          {/* {cats.map((item, index) => ( */}
                          <td>{item.cat.name}</td>
                          {/* ))} */}
                          {/* {vendors.map((item, index) => ( */}
                          <td>{item.vendor.name}</td>
                          {/* ))} */}
                          <td>
                            <div className="d-grid gap-5 d-md-block ml-3">
                              <Button
                                onClick={() => {
                                  handleEdit(item.id);
                                }}
                                className="btn-succes bg-succes px-2 "
                                variant="outline-success"
                              >
                                Edit
                              </Button>

                              <Button
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                                className="btn-red bg-red px-2 "
                                variant="outline-danger"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center pt-5">
                  <img
                    src="{imgEmpty}"
                    className="img-fluid"
                    style={{ width: "40%" }}
                    alt="empty"
                  />
                  <div className="mt-3">No data product</div>
                </div>
              )}
            </>
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}
