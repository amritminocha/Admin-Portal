import React, { Component } from 'react';
import Sidebar from '../../components/SideBar/SideBar';
import './Upload.css';
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titleCourse: ""
        }
    }

    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div className="rowfluid">
                <div className="columns">
                    <Sidebar className="sidebar" />
                </div>
                <div className="rightDiv">
                    <div className="formGroup">
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Tile of the Course</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titleCourse"
                                    value={this.state.titleCourse}
                                    onChange={(e) => this.inputHandler(e)}
                                    placeholder="Eg. FIRST STEPS TOWARDS PYTHON" />
                                <Form.Text className="text-muted">
                                    MAIN title TO ATTRACT AUDIENCE.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Example file input" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload;