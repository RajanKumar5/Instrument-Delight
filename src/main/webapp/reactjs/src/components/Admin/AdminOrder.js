import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import Footer from '../Footer';
import { Col, Row, Table } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

class AdminOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            orders: [],
        };
    }

    // API Call (Get All Products)
    componentDidMount() {
        axios.get("http://localhost:8080/admin/orders")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    orders: data
                });
            });
    }

    render() {

        if (this.state.email !== "admin") {
            this.props.history.push("/login");
        }

        return (
            <div>
                <AdminNavigation history={this.props.history} />
                <div className="container mt-5 mb-5">
                    <Link className="mb-3 btn btn-outline-secondary btn-sm" to={"/admin"}><FontAwesomeIcon icon={faBackward} /><b> BACK</b></Link>
                    <Row>
                        <Col lg={12}>
                            <Table striped hover id="adminOrderBody">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>User ID</th>
                                        <th>Instrument Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.orders.length === 0 ?
                                            <tr align="center">
                                                <td colSpan="5">No Orders Available</td>
                                            </tr> :
                                            this.state.orders.map((product) => (
                                                <tr key={product.orderId}>
                                                    <td>{product.orderId}</td>
                                                    <td>{product.userId}</td>
                                                    <td>{product.productName}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                            ))
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

export default AdminOrder;