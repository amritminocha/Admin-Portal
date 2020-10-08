import React from 'react';
import { Nav } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    return (
        <div>
            <Nav 
               activeKey="/home"
               className="sidebar"
            >
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default withRouter(SideBar);
