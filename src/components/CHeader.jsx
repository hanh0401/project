import React, { useState } from 'react';

import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const CHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả sử trạng thái đăng nhập
    const navigate = useNavigate();
  
    const handleLogout = () => {
      setIsLoggedIn(false); // Đặt lại trạng thái đăng xuất
      // Xử lý logic đăng xuất (xóa token, session, v.v.)
      navigate('/'); // Điều hướng về trang chủ
    };
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
            <Nav.Link as={Link} to="/candidates/Profile">Quản lý hồ sơ cá nhân</Nav.Link>
            <Nav.Link as={Link} to="/candidates/CV">Quản lý CV</Nav.Link>
            <Nav.Link as={Link} to="/candidates/Feedback">Phản hồi</Nav.Link>
            {!isLoggedIn ? ( 
                <>
                    <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                    <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
                </>
            ) : (
                <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/employers/Home" className="order-sm-3">
            Dành cho nhà tuyển dụng
        </Nav.Link>
      </Container>
    </Navbar>
  </>
};

export default CHeader;
