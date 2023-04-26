import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

class Headers extends Component {

    constructor(props) {
        super(props)
    }

    logout = () => {
        localStorage.clear();
        // this.props.history.push('/');
        window.location.href = "/"
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    {/* <Breadcrumb.Item href="/swanbarcode/WRKCTRLISTID">Work Center</Breadcrumb.Item> */}
                    <Breadcrumb.Item>
                        <Link to="/WRKCTRLISTID">Work Center</Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link to="/Home">Home</Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link to="/"> Sign out</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>system ax-application</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}
export default Headers;