import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
//  , Card, Form, Button
import Sidebar from '../../components/SideBar/SideBar';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            // <Container fluid>
            //     <Row className="rowfluid">
            //         <div className="columns">
            //             <div className="sidebar">
            //                 <Col lg={2} className="Content">
            //                     <Sidebar />
            //                 </Col>
            //             </div>
            //             <div>
            //                 <Col lg={10} className="page-content-wrapper">
            //                     this is a test
            //         </Col>
            //             </div>
            //         </div>
            //     </Row>
            // </Container>
            <div className="rowfluid">
                <div className="columns">
                    <Sidebar className="sidebar" />
                </div>
                <div className="rightDiv">
                    
                </div>

            </div>

        )
    }
}

export default Home