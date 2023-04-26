import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

class Headerbom extends Component {
    logout = () => {
        localStorage.clear();
        // this.props.history.push('/');
        window.location.href = "/"
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/WRKCTRLISTID"> Work Center</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/Home">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="Boms">Boms</Link>
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
export default Headerbom;