import React from 'react';

import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const EHeader = () => {
  return <>
    <Navbar bg="white" expand="lg" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/" title="TLJOB" className="mx-auto order-sm-2">
          <img
            src="/public/TLJOB-Logo.png"
            alt="TL-JOB Logo"
            style={{ maxHeight: '40px' }}
          />
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-sm-1" />
        <Navbar.Collapse id="basic-navbar-nav" className="order-sm-2">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/employers/company">Hồ sơ công ty</Nav.Link>
            <Nav.Link as={Link} to="/employers/post">Quản lý tin tuyển dụng</Nav.Link>
            <Nav.Link as={Link} to="/employers/Feedback">Phản hồi</Nav.Link>
            <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
            <Nav.Link as={Link} to="/public">Đăng ký</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/candidates/Home" className="order-sm-3">
            Dành cho ứng viên
        </Nav.Link>
      </Container>
    </Navbar>
  </>
};

export default EHeader;